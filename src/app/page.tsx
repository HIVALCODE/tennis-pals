import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ArrowRight,
  Calendar,
  MapPin,
  Star,
  Trophy,
  Users,
} from "lucide-react"

const testimonials = [
  {
    quote:
      "TennisMatch helped me find regular playing partners at my skill level. I've improved so much in just 3 months!",
    initials: "SM",
    name: "Sarah Martinez",
    role: "Intermediate Player",
  },
  {
    quote:
      "As someone new to the area, this app was perfect for meeting people and getting back into tennis. Highly recommend!",
    initials: "JC",
    name: "James Chen",
    role: "Advanced Player",
  },
  {
    quote:
      "The court booking feature is a game changer. No more calling around - I can see availability and book instantly.",
    initials: "EP",
    name: "Emily Parker",
    role: "Beginner Player",
  },
] as const

export default function TennisLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
              <Trophy className="size-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">TennisMatch</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#features"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Testimonials
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          <Badge variant="secondary" className="mb-2 gap-1">
            <Star className="size-3" />
            Join 10,000+ Tennis Players
          </Badge>
          <h1 className="text-balance">Find Your Perfect Tennis Partner</h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Connect with local tennis players, book courts, and improve your game. Whether you&apos;re a beginner or pro,
            find matches that fit your skill level.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row">
            <Button size="lg" className="w-full gap-2 sm:w-auto">
              Start Playing Today
              <ArrowRight className="size-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-full bg-transparent sm:w-auto">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="container mx-auto bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-balance">Everything You Need to Play</h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              Our platform makes it easy to find partners, schedule matches, and track your progress.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="size-6 text-primary" />
                </div>
                <CardTitle>Find Partners</CardTitle>
                <CardDescription>
                  Match with players based on skill level, location, and availability. Our smart algorithm ensures
                  compatible matches.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="size-6 text-primary" />
                </div>
                <CardTitle>Schedule Matches</CardTitle>
                <CardDescription>
                  Easily coordinate game times with built-in calendar integration. Send invites and get instant
                  confirmations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="size-6 text-primary" />
                </div>
                <CardTitle>Book Courts</CardTitle>
                <CardDescription>
                  Find and reserve courts near you. View availability, pricing, and amenities all in one place.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                  <Trophy className="size-6 text-primary" />
                </div>
                <CardTitle>Track Progress</CardTitle>
                <CardDescription>
                  Monitor your improvement with match history, statistics, and performance insights over time.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                  <Star className="size-6 text-primary" />
                </div>
                <CardTitle>Skill Ratings</CardTitle>
                <CardDescription>
                  Get matched with players at your level. Our rating system ensures fair and competitive games.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="size-6 text-primary" />
                </div>
                <CardTitle>Community</CardTitle>
                <CardDescription>
                  Join local tennis groups, participate in tournaments, and connect with the tennis community.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="text-balance">Get Started in Minutes</h2>
            <p className="text-pretty text-lg text-muted-foreground">Three simple steps to your next tennis match</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-4 text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3>Create Profile</h3>
              <p className="text-pretty text-muted-foreground">
                Set up your profile with skill level, location, and playing preferences
              </p>
            </div>

            <div className="space-y-4 text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                2
              </div>
              <h3>Find Matches</h3>
              <p className="text-pretty text-muted-foreground">
                Browse compatible players and send match requests based on your schedule
              </p>
            </div>

            <div className="space-y-4 text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                3
              </div>
              <h3>Start Playing</h3>
              <p className="text-pretty text-muted-foreground">
                Book a court, meet your partner, and enjoy your game
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="container mx-auto bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-balance">Loved by Tennis Players</h2>
            <p className="text-pretty text-lg text-muted-foreground">
              See what our community has to say
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.initials}>
                <CardContent className="pt-6">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} className="size-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mb-4 text-pretty text-sm">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-muted font-semibold">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <Card className="mx-auto max-w-4xl border-0 bg-primary text-primary-foreground">
          <CardContent className="space-y-6 pt-12 text-center pb-12">
            <h2 className="text-balance">Ready to Find Your Match?</h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-primary-foreground/90">
              Join thousands of tennis players already using TennisMatch to improve their game and connect with the
              community.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pt-4 sm:flex-row">
              <Button size="lg" variant="secondary" className="w-full gap-2 sm:w-auto">
                Create Free Account
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full bg-transparent text-primary-foreground sm:w-auto"
              >
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <footer className="bg-muted/30 border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                  <Trophy className="size-5 text-primary-foreground" />
                </div>
                <span className="font-semibold">TennisMatch</span>
              </div>
              <p className="text-pretty text-sm text-muted-foreground">
                Connecting tennis players worldwide for better matches and stronger communities.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-sm text-muted-foreground mt-12">
            <p>© 2025 TennisMatch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
