"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Rocket, MapPin, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

interface HeroMatchFinderProps {
  className?: string
  showHeader?: boolean
}

const cities = [
  { value: "sofia", label: "Sofia" },
  { value: "plovdiv", label: "Plovdiv" },
  { value: "varna", label: "Varna" },
  { value: "burgas", label: "Burgas" },
  { value: "ruse", label: "Ruse" },
]

export function HeroMatchFinder({ className, showHeader = false }: HeroMatchFinderProps) {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [level, setLevel] = useState("intermediate")
  const [when, setWhen] = useState("this-week")
  const [distance, setDistance] = useState([10])
  const [open, setOpen] = useState(false)

  const selectedCity = cities.find((city) => city.value === location)

  const handleSeePlayersClick = () => {
    const params = new URLSearchParams({
      loc: location || "any",
      level,
      when,
      distance: distance[0].toString(),
    })
    router.push(`/matches?${params.toString()}`)
  }

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const params = new URLSearchParams({
            lat: position.coords.latitude.toString(),
            lng: position.coords.longitude.toString(),
            level,
            when,
            distance: distance[0].toString(),
          })
          router.push(`/matches?${params.toString()}`)
        },
        (error) => {
          console.error("Error getting location:", error)
        }
      )
    }
  }

  const handleScrollToHowItWorks = () => {
    const element = document.getElementById("how-it-works")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className={cn("space-y-4 lg:space-y-6", className)}>
      {showHeader && (
        <>
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
              <Rocket className="size-4" />
              Match in minutes
            </div>
          </div>
          <div className="space-y-3 text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
              Find Tennis Partners Near You
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              Pick your level, set availability, and match within minutes.
            </p>
          </div>
        </>
      )}

      <Card className="p-4 sm:p-6 lg:px-8 lg:py-6">
        <div className="space-y-4 lg:space-y-6">
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="location"
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between bg-transparent font-normal"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="size-4 text-muted-foreground" />
                        <span className={cn(!selectedCity && "text-muted-foreground")}>
                          {selectedCity ? selectedCity.label : "Select city"}
                        </span>
                      </div>
                      <ChevronsUpDown className="size-4 text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search city..." />
                      <CommandList>
                        <CommandEmpty>No city found.</CommandEmpty>
                        <CommandGroup>
                          {cities.map((city) => (
                            <CommandItem
                              key={city.value}
                              value={city.value}
                              onSelect={(currentValue) => {
                                setLocation(currentValue === location ? "" : currentValue)
                                setOpen(false)
                              }}
                            >
                              {city.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUseMyLocation}
                  className="w-full bg-transparent text-xs"
                  aria-label="Use my current location"
                >
                  Use my location
                </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skill-level">Skill Level</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger id="skill-level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 sm:col-span-2 lg:col-span-2">
              <Label htmlFor="availability">Availability</Label>
              <ToggleGroup
                id="availability"
                type="single"
                value={when}
                onValueChange={(value) => value && setWhen(value)}
                className="grid grid-cols-3 gap-2 sm:gap-3"
              >
              <ToggleGroupItem
                value="today"
                className="justify-center whitespace-nowrap rounded-full border border-transparent px-4 py-2 text-xs font-medium transition-colors hover:border-primary hover:bg-transparent sm:text-sm data-[state=on]:border-primary data-[state=on]:bg-primary/10 data-[state=on]:text-foreground [&>span]:rounded-full"
              >
                Today
              </ToggleGroupItem>
              <ToggleGroupItem
                value="this-week"
                className="justify-center whitespace-nowrap rounded-full border border-transparent px-4 py-2 text-xs font-medium transition-colors hover:border-primary hover:bg-transparent sm:text-sm data-[state=on]:border-primary data-[state=on]:bg-primary/10 data-[state=on]:text-foreground [&>span]:rounded-full"
              >
                This week
              </ToggleGroupItem>
              <ToggleGroupItem
                value="weekends"
                className="justify-center whitespace-nowrap rounded-full border border-transparent px-4 py-2 text-xs font-medium transition-colors hover:border-primary hover:bg-transparent sm:text-sm data-[state=on]:border-primary data-[state=on]:bg-primary/10 data-[state=on]:text-foreground [&>span]:rounded-full"
              >
                Weekends
              </ToggleGroupItem>
              </ToggleGroup>
            </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="distance">Distance</Label>
                <span className="text-sm text-muted-foreground">{distance[0]} km</span>
              </div>
              <Slider
                id="distance"
                min={0}
                max={25}
                step={1}
                value={distance}
                onValueChange={setDistance}
                className="w-full"
                aria-label="Maximum distance in kilometers"
              />
            </div>

            <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row">
              <Button
                size="lg"
                onClick={handleSeePlayersClick}
                className="w-full sm:flex-1"
                aria-label="See available players"
              >
                See Players
              </Button>
              <Button
                size="lg"
                variant="link"
                onClick={handleScrollToHowItWorks}
                className="w-full sm:w-auto"
              >
                How it works
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Free to try • Local players • No spam
            </p>
          </div>
        </Card>
    </div>
  )
}
