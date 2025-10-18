"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInPage() {
    const sb = createSupabaseBrowser();
    const router = useRouter();
    const next = useSearchParams().get("next") || "/onboarding";
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<"in" | "up">("in");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        const fn = mode === "in" ? sb.auth.signInWithPassword : sb.auth.signUp;
        const { error } = await fn({ email, password: pass });
        setLoading(false);
        if (error) return alert(error.message);
        router.push(next);
    }

    return (
        <section className="px-4 py-10">
            <Card className="mx-auto w-full max-w-sm p-6 space-y-4">
                <h1 className="text-2xl font-semibold">
                    {mode === "in" ? "Sign in" : "Create account"}
                </h1>
                <form className="space-y-3" onSubmit={handleSubmit}>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" value={pass} onChange={(e) => setPass(e.target.value)} required />
                    </div>
                    <Button className="w-full" type="submit" disabled={loading}>
                        {loading ? "Please wait…" : mode === "in" ? "Sign in" : "Sign up"}
                    </Button>
                </form>
                <Button variant="link" className="w-full" onClick={() => setMode(mode === "in" ? "up" : "in")}>
                    {mode === "in" ? "Need an account? Sign up" : "Already have an account? Sign in"}
                </Button>
            </Card>
        </section>
    );
}
