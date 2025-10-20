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
    display_name: getNullableString(formData, "display_name"),
    bio: getNullableString(formData, "bio"),
    location: getNullableString(formData, "location"),
    skill_level: getNullableString(formData, "skill_level"),
    avatar_url: getNullableString(formData, "avatar_url"),
    updated_at: new Date().toISOString(),
  };

  const {
    data: updatedProfile,
    error: updateError,
  } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id)
    .select("id")
    .maybeSingle();

  if (updateError && updateError.code !== "PGRST116") {
    throw new Error(updateError.message);
  }

  if (!updatedProfile) {
    const insertPayload = {
      id: user.id,
      ...updates,
    };

    const { error: insertError } = await supabase.from("profiles").insert(insertPayload);

    if (insertError) {
      throw new Error(insertError.message);
    }
  }

  revalidatePath("/profile");
  return { success: true } as const;
}
