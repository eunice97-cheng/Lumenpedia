"use client"

import { useState } from "react"
import { Search, BookOpen, Sparkles, ArrowRight, Zap, Users, Swords, TrendingUp } from "@/components/icons"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

const quickStartGuides = [
  { name: "About Lumen", icon: BookOpen, description: "Learn about the Lumen server", category: "Getting Started" },
  { name: "Classes & Factions", icon: Users, description: "Choose your path", category: "Getting Started" },
  { name: "Leveling", icon: TrendingUp, description: "Level up efficiently", category: "Getting Started" },
  { name: "Getting Home", icon: ArrowRight, description: "Navigation basics", category: "Getting Started" },
  { name: "Daily Quests", icon: Sparkles, description: "Daily activities guide", category: "Getting Started" },
  { name: "Map", icon: BookOpen, description: "World navigation", category: "Getting Started" },
]

const popularGuides = [
  { name: "Gears - Upgrade & Refinery", icon: Swords, description: "Equipment enhancement", category: "Equipment" },
  { name: "Skills and Tomes", icon: Zap, description: "Master your abilities", category: "Character" },
  { name: "Pets", icon: Sparkles, description: "Companion system", category: "Character" },
  { name: "Esper", icon: BookOpen, description: "Esper cultivation", category: "Character" },
  { name: "Territory War", icon: Swords, description: "Guild warfare", category: "PvP" },
  { name: "Ascension", icon: TrendingUp, description: "Character advancement", category: "Progression" },
]

const categories = [
  {
    name: "Getting Started",
    icon: BookOpen,
    description: "Essential guides for new players",
    count: 12,
    color: "from-teal-500 to-cyan-500",
  },
  {
    name: "Character Progression",
    icon: TrendingUp,
    description: "Level up and advance your character",
    count: 18,
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "Equipment & Items",
    icon: Swords,
    description: "Gear, accessories, and enhancements",
    count: 15,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Activities & Events",
    icon: Sparkles,
    description: "Daily quests, events, and challenges",
    count: 22,
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Social & Economy",
    icon: Users,
    description: "Trading, clans, and social features",
    count: 14,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Combat & PvP",
    icon: Zap,
    description: "Battlegrounds and territory wars",
    count: 8,
    color: "from-red-500 to-rose-500",
  },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-secondary">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
        <div className="relative">
          <header className="border-b border-primary-foreground/10 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
                    <BookOpen className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-primary-foreground">Lumenpedia</h1>
                    <p className="text-xs text-primary-foreground/80">Jade Dynasty Lumen Guide</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ThemeToggle />
                  <Link href="/browse">
                    <Button
                      variant="outline"
                      className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
                    >
                      Browse All Guides
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </header>

          {/* Hero Content */}
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm font-medium text-primary-foreground">Your Complete Jade Dynasty Resource</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 text-balance">
                Master the Path of Cultivation
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 text-pretty leading-relaxed">
                Comprehensive guides for Jade Dynasty Lumen server. From beginner basics to advanced cultivation
                techniques.
              </p>

              {/* Search */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-base bg-background/95 backdrop-blur-sm border-primary-foreground/20 shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* Quick Start Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground">Quick Start</h2>
              <p className="text-muted-foreground">Essential guides to get you started</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickStartGuides.map((guide) => (
              <Card
                key={guide.name}
                className="group p-6 border border-border bg-card hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <guide.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1 text-balance">
                      {guide.name}
                    </h3>
                    <p className="text-sm text-muted-foreground text-pretty">{guide.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Popular Guides Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground">Popular Guides</h2>
              <p className="text-muted-foreground">Most viewed by the community</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularGuides.map((guide) => (
              <Card
                key={guide.name}
                className="group p-6 border border-border bg-card hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                    <guide.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-primary">{guide.category}</span>
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1 text-balance">
                      {guide.name}
                    </h3>
                    <p className="text-sm text-muted-foreground text-pretty">{guide.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Browse by Category Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">Browse by Category</h2>
                <p className="text-muted-foreground">Explore guides organized by topic</p>
              </div>
            </div>
            <Link href="/browse">
              <Button variant="ghost" className="gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="group relative overflow-hidden p-6 border border-border bg-card hover:border-primary transition-all duration-300 cursor-pointer"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} text-white`}
                    >
                      <category.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">{category.count} guides</span>
                  </div>
                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-2 text-balance">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground text-pretty leading-relaxed">{category.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-accent to-secondary p-12 text-center">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
              Can't find what you're looking for?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 text-pretty max-w-2xl mx-auto">
              Browse our complete A-Z directory with all available guides for Jade Dynasty Lumen
            </p>
            <Link href="/browse">
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-xl">
                Browse All Guides
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-gradient-to-br from-muted/30 to-muted/10 mt-24">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Lumenpedia. Community-driven Jade Dynasty Lumen guides.
          </p>
        </div>
      </footer>
    </div>
  )
}
