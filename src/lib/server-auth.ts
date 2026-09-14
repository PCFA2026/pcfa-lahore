import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { isAdminEmail } from "./admin";

/**
 * Verify the current request is from an authenticated admin.
 * Returns the admin email on success, or null if unauthorized.
 */
export async function requireAdmin(): Promise<string | null> {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(items) {
          try {
            items.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // middleware / route handler context — ignore
          }
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) return null;
  if (!isAdminEmail(user.email)) return null;
  return user.email;
}
