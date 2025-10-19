"use client";
import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,       // reads from .env.local
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
 