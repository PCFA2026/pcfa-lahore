import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Browser client — used for admin login (auth) only.
 * Stores the session in cookies so server route handlers
 * (@supabase/ssr createServerClient) can read the same session.
 */
export const supabaseBrowser =
  url && anonKey ? createBrowserClient(url, anonKey) : null;

/** Server client with service role — bypasses RLS for trusted server ops. */
export const supabaseService =
  url && serviceKey
    ? createClient(url, serviceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;

