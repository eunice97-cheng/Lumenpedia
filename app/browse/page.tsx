"use client"

import { useState, useMemo } from "react"
import { Search, BookOpen, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GuideCard } from "@/components/guide-card"
import { AlphabetNav } from "@/components/alphabet-nav"
import Link from "next/link"

const guides = [
  { name: "About Lumen", letter: "A", category: "Getting Started" },
  { name: "Accessories", letter: "A", category: "Equipment" },
  { name: "Affinity", letter: "A", category: "Character" },
  { name: "Alliance & Clan", letter: "A", category: "Social" },
  { name: "Ascension", letter: "A", category: "Progression", popular: true },
  { name: "Astral Tales", letter: "A", category: "Activities" },
  { name: "Battleground", letter: "B", category: "PvP" },
  { name: "Bloodbonding", letter: "B", category: "Character" },
  { name: "Bloodsmelting", letter: "B", category: "Character" },
  { name: "Bosses", letter: "B", category: "PvE" },
  { name: "Classes & Factions", letter: "C", category: "Getting Started", popular: true },
  { name: "Celestial Mount", letter: "C", category: "Character" },
  { name: "Charity", letter: "C", category: "Activities" },
  { name: "Charm", letter: "C", category: "Character" },
  { name: "Chi", letter: "C", category: "Character" },
  { name: "Chroma", letter: "C", category: "Character" },
  { name: "Class System", letter: "C", category: "Getting Started" },
  { name: "Crafting", letter: "C", category: "Economy" },
  { name: "Crisis Event", letter: "C", category: "Activities" },
  { name: "Daily Quests", letter: "D", category: "Activities", popular: true },
  { name: "Daily Divination", letter: "D", category: "Activities" },
  { name: "Deity in the Wind", letter: "D", category: "Activities" },
  { name: "Dispel the Curse", letter: "D", category: "Activities" },
  { name: "Elysium Proclamation", letter: "E", category: "Activities" },
  { name: "Esper", letter: "E", category: "Character", popular: true },
  { name: "Essence", letter: "E", category: "Character" },
  { name: "Fashions", letter: "F", category: "Equipment" },
  { name: "Fishing Contest", letter: "F", category: "Activities" },
  { name: "Flameagle Order", letter: "F", category: "Activities" },
  { name: "Fort Cloudstorm", letter: "F", category: "PvP" },
  { name: "Friends", letter: "F", category: "Social" },
  { name: "Gears - Upgrade & Refinery", letter: "G", category: "Equipment", popular: true },
  { name: "Getting Home", letter: "G", category: "Getting Started" },
  { name: "Hall of Excellence", letter: "H", category: "Activities" },
  { name: "Hero Scroll", letter: "H", category: "Character" },
  { name: "Induction", letter: "I", category: "Getting Started" },
  { name: "Insignia", letter: "I", category: "Character" },
  { name: "Invigorate System", letter: "I", category: "Character" },
  { name: "Jaden Shop", letter: "J", category: "Economy" },
  { name: "Jadeon Founder", letter: "J", category: "Activities" },
  { name: "JD Mart", letter: "J", category: "Economy" },
  { name: "JD Plot", letter: "J", category: "Activities" },
  { name: "Kunlun Wonderland Fair", letter: "K", category: "Activities" },
  { name: "Leveling", letter: "L", category: "Getting Started", popular: true },
  { name: "Map", letter: "M", category: "Getting Started" },
  { name: "Marriage", letter: "M", category: "Social" },
  { name: "Mounts", letter: "M", category: "Character" },
  { name: "Master and Apprentice", letter: "M", category: "Social" },
  { name: "Mystic Tome", letter: "M", category: "Character" },
  { name: "Necklaces", letter: "N", category: "Equipment" },
  { name: "Noah's Special Skill", letter: "N", category: "Character" },
  { name: "Nura's Gift", letter: "N", category: "Activities" },
  { name: "Party", letter: "P", category: "Social" },
  { name: "Pets", letter: "P", category: "Character", popular: true },
  { name: "Raise Sacred Beast", letter: "R", category: "Character" },
  { name: "Rings", letter: "R", category: "Equipment" },
  { name: "Rock-Paper-Scissors", letter: "R", category: "Activities" },
  { name: "Skills and Tomes", letter: "S", category: "Character", popular: true },
  { name: "Sky Dweller", letter: "S", category: "Activities" },
  { name: "Sky Lotus", letter: "S", category: "Activities" },
  { name: "Skyblades", letter: "S", category: "Character" },
  { name: "Sleepless", letter: "S", category: "Activities" },
  { name: "Stolen Gold", letter: "S", category: "Activities" },
  { name: "Surfing Deity", letter: "S", category: "Activities" },
  { name: "Taichi Pills", letter: "T", category: "Character" },
  { name: "Territory War", letter: "T", category: "PvP", popular: true },
  { name: "The Donation", letter: "T", category: "Activities" },
  { name: "The Precious", letter: "T", category: "Activities" },
  { name: "Tier Advancement", letter: "T", category: "Progression" },
  { name: "Titles", letter: "T", category: "Character" },
  { name: "Trading", letter: "T", category: "Economy" },
  { name: "Transform Gems", letter: "T", category: "Equipment" },
  { name: "Treasure Hunt", letter: "T", category: "Activities" },
  { name: "Trial - Vile Spirits", letter: "T", category: "PvE" },
  { name: "Trinkets", letter: "T", category: "Equipment" },
  { name: "Valuable Pills", letter: "V", category: "Character" },
  { name: "Vending", letter: "V", category: "Economy" },
  { name: "Veteran of War", letter: "V", category: "Activities" },
]

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => guide.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery])

  const groupedGuides = useMemo(() => {
    const grouped: Record<string, typeof guides> = {}
    filteredGuides.forEach((guide) => {
      if (!grouped[guide.letter]) {
        grouped[guide.letter] = []
      }
      grouped[guide.letter].push(guide)
    })
    return grouped
  }, [filteredGuides])

  const availableLetters = Object.keys(groupedGuides).sort()

  const scrollToSection = (letter: string) => {
    const element = document.getElementById(`section-${letter}`)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setActiveSection(letter)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-secondary">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="relative">
          <header className="border-b border-primary-foreground/10 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
                    <BookOpen className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-primary-foreground">Lumenpedia</h1>
                    <p className="text-xs text-primary-foreground/80">Browse All Guides</p>
                  </div>
                </div>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              </div>

              {/* Search */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search guides..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 text-base bg-background/95 backdrop-blur-sm border-primary-foreground/20 shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Alphabet Navigation */}
            <AlphabetNav
              availableLetters={availableLetters}
              activeSection={activeSection}
              onLetterClick={scrollToSection}
            />
          </header>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* Alphabetical Sections */}
        {availableLetters.map((letter) => (
          <section key={letter} id={`section-${letter}`} className="mb-16 scroll-mt-32">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20">
                {letter}
              </div>
              <h2 className="text-3xl font-bold text-foreground">{letter}</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {groupedGuides[letter].map((guide) => (
                <GuideCard key={guide.name} guide={guide} />
              ))}
            </div>
          </section>
        ))}

        {/* No Results */}
        {filteredGuides.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-xl text-muted-foreground">No guides found for "{searchQuery}"</p>
          </div>
        )}
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
