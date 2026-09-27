import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/server-auth";
import { supabaseService } from "@/lib/supabase";

export async function POST(request: Request) {
  if (!supabaseService || !(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File) || !file.type.startsWith("image/")) return NextResponse.json({ error: "Please choose an image file" }, { status: 400 });
  if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "Images must be smaller than 8 MB" }, { status: 400 });
  const extension = file.name.split(".").pop()?.replace(/[^a-z0-9]/gi, "") || "jpg";
  const path = `uploads/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabaseService.storage.from("gallery").upload(path, await file.arrayBuffer(), { contentType: file.type, upsert: false });
  if (error) return NextResponse.json({ error: "Upload failed. Create a public Supabase Storage bucket named gallery first." }, { status: 500 });
  const { data } = supabaseService.storage.from("gallery").getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl }, { status: 201 });
}
