"use client";
// Ensure Netlify/Next does not try to prerender this page at build time
export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInPage() {
  const sb = useMemo(() => createSupabaseBrowser(), []);
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";
  const initialMode = (searchParams.get("mode") as "in" | "up" | null) || "in";
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"in" | "up">(initialMode);

  useEffect(() => {
    const qpMode = (searchParams.get("mode") as "in" | "up" | null) || "in";
    setMode(qpMode);
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } =
      mode === "in"
        ? await sb.auth.signInWithPassword({ email, password: pass })
        : await sb.auth.signUp({
            email,
            password: pass,
            options: {
              emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : undefined,
              data: {},
            },
          });
    setLoading(false);
    if (error) return alert(error.message);
    router.push(next);
  }

  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <Card className="w-full max-w-sm space-y-4 p-6">
        <h1 className="text-2xl font-semibold">
          {mode === "in" ? "Sign in" : "Create account"}
        </h1>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Please wait…" : mode === "in" ? "Sign in" : "Sign up"}
          </Button>
        </form>
        <Button
          variant="link"
          className="w-full"
          onClick={() => setMode(mode === "in" ? "up" : "in")}
        >
          {mode === "in"
            ? "Need an account? Sign up"
            : "Already have an account? Sign in"}
        </Button>
      </Card>
    </section>
  );
}
