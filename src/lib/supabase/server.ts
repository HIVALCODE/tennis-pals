import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function createSupabaseServer() {
  const cookieStore = await cookies(); // Next 15

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,       // now loaded from .env.local
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,  // ^
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
}
