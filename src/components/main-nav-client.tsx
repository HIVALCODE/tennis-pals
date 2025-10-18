"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { Menu, Trophy, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { createSupabaseBrowser } from "@/lib/supabase/client";

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#testimonials", label: "Testimonials" },
];

type MainNavClientProps = {
  initialUser: User | null;
};

export function MainNavClient({ initialUser }: MainNavClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(initialUser);
  const supabase = useMemo(() => createSupabaseBrowser(), []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.setProperty("overflow", "hidden");
    } else {
      document.body.style.removeProperty("overflow");
    }

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isMenuOpen]);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (isMounted) {
        setUser(user ?? null);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    closeMenu();
  };

  return (
    <>
      <div className="fixed inset-x-0 top-6 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between rounded-full border bg-card/80 px-3 py-3 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-primary">
                <Trophy className="size-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">TennisMatch</span>
            </div>
            <nav className="hidden items-center gap-6 lg:flex">
              {navItems.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <Button variant="secondary" size="sm" asChild className="hidden lg:inline-flex">
                    <Link href="/profile">My Profile</Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="hidden lg:inline-flex" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild className="hidden lg:inline-flex">
                    <Link href="/sign-in?mode=in">Sign In</Link>
                  </Button>
                  <Button size="sm" asChild className="hidden lg:inline-flex">
                    <Link href="/sign-in?mode=up">Get Started</Link>
                  </Button>
                </>
              )}
              <AnimatedThemeToggler className="hidden size-9 items-center justify-center rounded-full border border-transparent bg-background/40 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 lg:flex" />
              <Button size="sm" asChild className="lg:hidden">
                <Link href={user ? "/profile" : "/sign-in?mode=up"}>
                  {user ? "My Profile" : "Get Started"}
                </Link>
              </Button>
              <button
                type="button"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="flex size-9 items-center justify-center rounded-full border border-transparent bg-background/40 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 lg:hidden"
              >
                {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-6 py-6">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-primary">
                  <Trophy className="size-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold">TennisMatch</span>
              </div>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="flex size-10 items-center justify-center rounded-full border border-transparent bg-background/40 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2"
              >
                <X className="size-6" />
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6 pb-16">
              <nav className="flex flex-col items-center gap-8 text-2xl font-medium">
                {navItems.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={closeMenu}
                    className="text-foreground transition-colors hover:text-primary"
                  >
                    {label}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col items-center gap-6">
                <AnimatedThemeToggler className="flex size-14 items-center justify-center rounded-full border border-transparent bg-background/40 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-4" />
                {user ? (
                  <>
                    <Button size="lg" asChild className="w-48">
                      <Link href="/profile" onClick={closeMenu}>
                        My Profile
                      </Link>
                    </Button>
                    <Button variant="ghost" size="lg" className="w-48" onClick={handleSignOut}>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" size="lg" asChild className="w-48">
                      <Link href="/sign-in?mode=in" onClick={closeMenu}>
                        Sign In
                      </Link>
                    </Button>
                    <Button size="lg" asChild className="w-48">
                      <Link href="/sign-in?mode=up" onClick={closeMenu}>
                        Get Started
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
