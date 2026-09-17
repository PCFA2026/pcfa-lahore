import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnvFile(text) {
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;
    let value = match[2];
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    process.env[match[1]] = value;
  }
}

function parseCsv(input) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    if (quoted) {
      if (char === '"' && input[index + 1] === '"') { cell += '"'; index += 1; }
      else if (char === '"') quoted = false;
      else cell += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") { row.push(cell); cell = ""; }
    else if (char === "\n") { row.push(cell.replace(/\r$/, "")); rows.push(row); row = []; cell = ""; }
    else cell += char;
  }
  if (cell || row.length) { row.push(cell.replace(/\r$/, "")); rows.push(row); }
  const [headers, ...values] = rows;
  return values.filter((value) => value.some((cell) => cell.trim())).map((value) => Object.fromEntries(headers.map((header, index) => [header.replace(/^\uFEFF/, "").trim(), value[index]?.trim() || ""])));
}

function recordFrom(row) {
  const yes = (value) => /^(yes|true|i hereby)/i.test(value || "");
  return {
    full_name: row.Name || "",
    email: (row.Email || "").toLowerCase(),
    phone: row["Cell number"] || null,
    country: null,
    city: null,
    organization: null,
    designation: row["profession/Designiation"] || null,
    education: null,
    reason: null,
    application_type: "honorary",
    father_husband_name: row["Father/Husband Name"] || null,
    residential_address: row["Res. Address"] || null,
    office_address: row["Office Address"] || null,
    chinese_institution_city: null,
    qualification: null,
    qualification_year: null,
    honorary_membership: yes(row["I hereby apply for honorary membership  of the  PCFA, Lahore."]),
  };
}

const source = process.argv[2];
if (!source) {
  console.error('Usage: npm run import:members -- "path-to-google-form.csv"');
  process.exit(1);
}

try { loadEnvFile(await readFile(".env.local", "utf8")); }
catch { /* Credentials may instead be supplied through the shell. */ }

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local.");
  process.exit(1);
}

const rows = parseCsv(await readFile(path.resolve(source), "utf8"));
const candidates = new Map();
let skipped = 0;
for (const row of rows) {
  const record = recordFrom(row);
  if (!record.full_name || !record.email) { skipped += 1; continue; }
  candidates.set(record.email, record);
}

const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const incoming = [...candidates.values()];
const existing = new Set();
for (let index = 0; index < incoming.length; index += 100) {
  const emails = incoming.slice(index, index + 100).map((record) => record.email);
  const { data, error } = await supabase.from("approved_members").select("email").in("email", emails);
  if (error) throw error;
  for (const member of data || []) existing.add(member.email.toLowerCase());
}

const inserts = incoming.filter((record) => !existing.has(record.email));
for (let index = 0; index < inserts.length; index += 100) {
  const { error } = await supabase.from("approved_members").insert(inserts.slice(index, index + 100));
  if (error) throw error;
}

console.log(`Import complete. Added ${inserts.length}; already present ${existing.size}; skipped ${skipped} incomplete row(s).`);
