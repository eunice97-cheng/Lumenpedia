"use client"

import { Button } from "@/components/ui/button"

interface AlphabetNavProps {
  availableLetters: string[]
  activeSection: string | null
  onLetterClick: (letter: string) => void
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

export function AlphabetNav({ availableLetters, activeSection, onLetterClick }: AlphabetNavProps) {
  return (
    <div className="border-t border-primary-foreground/10 bg-primary-foreground/5 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-1.5 justify-center">
          {alphabet.map((letter) => {
            const isAvailable = availableLetters.includes(letter)
            const isActive = activeSection === letter

            return (
              <Button
                key={letter}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => isAvailable && onLetterClick(letter)}
                disabled={!isAvailable}
                className="w-9 h-9 p-0 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {letter}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
