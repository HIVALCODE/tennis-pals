import Link from "next/link";
import { redirect } from "next/navigation";

import { createSupabaseServer } from "@/lib/supabase/server";

import { Button } from "@/components/ui/button";

import { ProfileForm } from "./profile-form";

const STORAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ?? "avatars";

export default async function ProfilePage() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/sign-in?mode=in&next=/profile");
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("display_name,bio,location,skill_level,avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError && profileError.code !== "PGRST116") {
    throw new Error(profileError.message);
  }

  let avatarUrl: string | null = null;
  if (profileData?.avatar_url) {
    const {
      data: { publicUrl },
    } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(profileData.avatar_url);
    avatarUrl = publicUrl ?? null;
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <div className="flex flex-col justify-between gap-4 pb-8 sm:flex-row sm:items-center">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">Your Profile</h1>
          <p className="text-muted-foreground">
            Keep your details up to date so other players can learn more about you.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
      <ProfileForm
        userId={user.id}
        email={user.email ?? null}
        avatarUrl={avatarUrl}
        initialProfile={profileData ?? null}
      />
    </div>
  );
}
