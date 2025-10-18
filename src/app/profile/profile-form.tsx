"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSupabaseBrowser } from "@/lib/supabase/client";

import { updateProfile } from "./actions";

type ProfileData = {
  display_name: string | null;
  bio: string | null;
  location: string | null;
  skill_level: string | null;
  avatar_url: string | null;
};

type ProfileFormProps = {
  userId: string;
  email: string | null;
  avatarUrl: string | null;
  initialProfile: ProfileData | null;
};

const STORAGE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ?? "avatars";

export function ProfileForm({ userId, email, avatarUrl, initialProfile }: ProfileFormProps) {
  const [avatarPath, setAvatarPath] = useState(initialProfile?.avatar_url ?? null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(avatarUrl ?? null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const supabase = useMemo(() => createSupabaseBrowser(), []);

  useEffect(() => {
    setAvatarPreview(avatarUrl ?? null);
  }, [avatarUrl]);

  async function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    const ext = file.name.split(".").pop();
    // Ensure we have a loaded session so the upload includes the auth token
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      setUploadError("You are not signed in. Please sign in and try again.");
      return;
    }
    // Always use the browser session's user id to avoid mismatches
    const { data: browserUser } = await supabase.auth.getUser();
    const uid = browserUser.user?.id ?? userId;
    const filePath = `${uid}/${Date.now()}.${ext}`;

    const { error: uploadErrorResult } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        upsert: true,
        cacheControl: "3600",
        contentType: file.type || "application/octet-stream",
      });

    if (uploadErrorResult) {
      setUploadError(uploadErrorResult.message);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);

    setAvatarPath(filePath);
    setAvatarPreview(publicUrl);
  }

  async function handleSubmit(formData: FormData) {
    formData.set("avatar_url", avatarPath ?? initialProfile?.avatar_url ?? "");

    startTransition(async () => {
      try {
        setMessage(null);
        setUploadError(null);
        await updateProfile(formData);
        setMessage("Profile updated successfully.");
      } catch (error) {
        if (error instanceof Error) {
          setUploadError(error.message);
        } else {
          setUploadError("Something went wrong. Please try again.");
        }
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="relative size-24 overflow-hidden rounded-full border border-border bg-muted">
          {avatarPreview ? (
            <Image src={avatarPreview} alt="Profile avatar" fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
              No photo
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="avatar">Profile picture</Label>
          <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} />
          <p className="text-xs text-muted-foreground">Upload a square image (JPG, PNG, or GIF).</p>
          {uploadError && <p className="text-sm text-destructive">{uploadError}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="display_name">Name</Label>
          <Input
            id="display_name"
            name="display_name"
            defaultValue={initialProfile?.display_name ?? ""}
            placeholder="Your name"
          />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={email ?? ""} disabled className="bg-muted text-muted-foreground" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            defaultValue={initialProfile?.location ?? ""}
            placeholder="City, Country"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="skill_level">Skill Level</Label>
          <Input
            id="skill_level"
            name="skill_level"
            defaultValue={initialProfile?.skill_level ?? ""}
            placeholder="Beginner, Intermediate, Advanced"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">About you</Label>
        <textarea
          id="bio"
          name="bio"
          defaultValue={initialProfile?.bio ?? ""}
          rows={4}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Tell other players a little about yourself."
        />
      </div>

      <input type="hidden" name="avatar_url" value={avatarPath ?? initialProfile?.avatar_url ?? ""} />

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : "Save profile"}
        </Button>
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
    </form>
  );
}
