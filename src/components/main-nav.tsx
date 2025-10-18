import { createSupabaseServer } from "@/lib/supabase/server";

import { MainNavClient } from "./main-nav-client";

export async function MainNav() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <MainNavClient initialUser={user ?? null} />;
}

export default MainNav;
