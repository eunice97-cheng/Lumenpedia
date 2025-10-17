import { Card } from "@/components/ui/card"
import Image from "next/image"

interface Guide {
  name: string
  letter: string
  category?: string
  image?: string
  popular?: boolean
}

interface GuideCardProps {
  guide: Guide
}

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <Card className="group overflow-hidden border border-border bg-card hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer">
      {guide.image && (
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={guide.image || "/placeholder.svg"}
            alt={guide.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {guide.popular && (
            <div className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-semibold shadow-lg">
              Popular
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}
      <div className="p-5">
        {guide.category && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-primary">{guide.category}</span>
            {guide.popular && !guide.image && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">Popular</span>
            )}
          </div>
        )}
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-balance leading-snug">
          {guide.name}
        </h3>
      </div>
    </Card>
  )
}
