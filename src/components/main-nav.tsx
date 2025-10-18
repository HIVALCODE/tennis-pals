"use client"

import { useEffect, useState } from "react"
import { Menu, Trophy, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

const navItems = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#testimonials", label: "Testimonials" },
]

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.setProperty("overflow", "hidden")
    } else {
      document.body.style.removeProperty("overflow")
    }

    return () => {
      document.body.style.removeProperty("overflow")
    }
  }, [isMenuOpen])

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const closeMenu = () => setIsMenuOpen(false)

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
              <Button variant="ghost" size="sm" className="hidden lg:inline-flex">
                Sign In
              </Button>
              <Button size="sm" className="hidden lg:inline-flex">
                Get Started
              </Button>
              <AnimatedThemeToggler className="hidden size-9 items-center justify-center rounded-full border border-transparent bg-background/40 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 lg:flex" />
              <Button size="sm" className="lg:hidden">
                Get Started
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
                <Button variant="ghost" size="lg" className="w-48" onClick={closeMenu}>
                  Sign In
                </Button>
                <Button size="lg" className="w-48" onClick={closeMenu}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
