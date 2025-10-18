"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createSupabaseServer } from "@/lib/supabase/server";

function getNullableString(formData: FormData, key: string) {
  const value = formData.get(key);
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export async function updateProfile(formData: FormData) {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/sign-in?mode=in&next=/profile");
  }

  const updates = {
    id: user.id,
    display_name: getNullableString(formData, "display_name"),
    bio: getNullableString(formData, "bio"),
    location: getNullableString(formData, "location"),
    skill_level: getNullableString(formData, "skill_level"),
    avatar_url: getNullableString(formData, "avatar_url"),
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("profiles").upsert(updates, {
    onConflict: "id",
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/profile");
  return { success: true } as const;
}
