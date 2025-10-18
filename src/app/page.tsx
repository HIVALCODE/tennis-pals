import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Calendar, MapPin, Star, Trophy, Users } from "lucide-react";

import { MainNav } from "@/components/main-nav";
import { HeroMatchFinder } from "@/components/hero-match-finder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { createSupabaseServer } from "@/lib/supabase/server";

const testimonials = [
  {
    quote:
      "TennisMatch helped me find regular partners at my level. I’ve improved more in 3 months than the last year!",
    name: "Sarah Martinez",
    role: "Intermediate Player",
  },
  {
    quote:
      "As someone new to the city, this app was perfect for meeting people and getting back into tennis.",
    name: "James Chen",
    role: "Advanced Player",
  },
  {
    quote:
      "The court booking feature is a game changer. No more calling around – it’s instant and reliable.",
    name: "Emily Parker",
    role: "Beginner Player",
  },
];

export default async function Home() {
  const supabase = await createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isSignedIn = Boolean(user);

  const primaryCtaHref = isSignedIn ? "/profile" : "/sign-in?mode=up";
  const primaryCtaLabel = isSignedIn ? "Go to Profile" : "Start Playing Today";
  const secondaryCtaLabel = isSignedIn ? "Explore Features" : "Watch Demo";
  const bottomPrimaryLabel = isSignedIn ? "Manage Profile" : "Create Free Account";
  const bottomPrimaryHref = isSignedIn ? "/profile" : "/sign-in?mode=up";
  const bottomSecondaryLabel = isSignedIn ? "Discover Features" : "Browse Community Events";
  const bottomSecondaryHref = "#features";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MainNav />

      <main className="space-y-24 pb-24 pt-28 md:pt-36 lg:pt-44">
        <section className="container mx-auto px-4">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-12">
            <div className="flex flex-col items-center gap-6 text-center">
              <Badge variant="secondary" className="gap-1">
                <Star className="size-3" />
                Join 10,000+ Tennis Players
              </Badge>
              <h1 className="flex flex-col items-center gap-4 text-center text-4xl font-bold tracking-tight md:flex-row md:flex-nowrap md:justify-center md:text-6xl">
                <span className="whitespace-nowrap">Find Your Perfect</span>
                <ContainerTextFlip
                  words={["Partner", "Match", "Rival", "Champion", "Pro"]}
                  interval={2600}
                  animationDuration={600}
                  className="align-middle border-border/60 bg-transparent font-semibold shadow-none text-inherit dark:border-border"
                  textClassName="tracking-tight"
                />
              </h1>
              <p className="max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
                Connect with local tennis players, book courts, and improve your game. Whether you’re a beginner or a
                seasoned competitor, TennisMatch finds partners that fit your schedule and skill level.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" className="w-full gap-2 sm:w-auto" asChild>
                  <Link href={primaryCtaHref}>
                    {primaryCtaLabel}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full bg-transparent sm:w-auto" asChild>
                  <Link href="#features">{secondaryCtaLabel}</Link>
                </Button>
              </div>
            </div>

            <HeroMatchFinder className="w-full max-w-4xl lg:max-w-5xl" />
          </div>
        </section>

        <section id="features" className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Everything You Need to Play</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                TennisMatch brings partners, courts, and progress tracking into one experience. Plan matches and track
                your improvement with ease.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Users className="size-6 text-primary" />}
                title="Find Partners"
                description="Match with players by skill, location, and availability using our smart pairing algorithm."
              />
              <FeatureCard
                icon={<Calendar className="size-6 text-primary" />}
                title="Schedule Matches"
                description="Coordinate matches instantly with calendar integration and quick invites."
              />
              <FeatureCard
                icon={<MapPin className="size-6 text-primary" />}
                title="Book Courts"
                description="See real-time court availability and secure your booking in a few taps."
              />
              <FeatureCard
                icon={<Trophy className="size-6 text-primary" />}
                title="Track Progress"
                description="Log scores, review match history, and visualize your skill growth over time."
              />
              <FeatureCard
                icon={<Star className="size-6 text-primary" />}
                title="Skill Ratings"
                description="Balanced matches every time thanks to our dynamic rating system."
              />
              <FeatureCard
                icon={<Users className="size-6 text-primary" />}
                title="Community Events"
                description="Join ladders, clinics, and local tournaments to grow your network."
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Getting on court takes just a couple of minutes.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <StepCard
              step="1"
              title="Create your player profile"
              description="Share your level, preferred play times, and favorite courts so we can personalize matches."
            />
            <StepCard
              step="2"
              title="Match instantly"
              description="We recommend nearby players who match your availability—send invites with one tap."
            />
            <StepCard
              step="3"
              title="Play & track progress"
              description="Log match results, see your stats, and keep leveling up with new partners."
            />
          </div>
        </section>

        <section id="testimonials" className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Loved by Local Players</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Players of every level use TennisMatch to keep their game sharp and meet new people.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="h-full border-none bg-card/70 shadow-md">
                  <CardContent className="space-y-4 p-6">
                    <p className="text-sm text-muted-foreground">{testimonial.quote}</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="rounded-3xl border bg-gradient-to-br from-primary/10 via-primary/5 to-primary/20 p-10 text-center shadow-lg">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Ready for Your Next Match?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Create your free profile, match with local players, and start improving today.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="w-full gap-2 sm:w-auto" asChild>
                <Link href={bottomPrimaryHref}>
                  {bottomPrimaryLabel}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="ghost" className="w-full sm:w-auto" asChild>
                <Link href={bottomSecondaryHref}>{bottomSecondaryLabel}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border border-border/70 bg-card/60 shadow-sm">
      <CardHeader>
        <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-none bg-card/70 shadow-md">
      <CardHeader>
        <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {step}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
