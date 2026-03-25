import { RiStarFill } from "@remixicon/react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ReviewCardProps {
  name: string
  initials: string
  date: string
  rating: number
  comment: string
}

export function ReviewCard({
  name,
  initials,
  date,
  rating,
  comment,
}: ReviewCardProps) {
  return (
    <div className="space-y-3 rounded-lg border border-border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-foreground">{name}</p>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <RiStarFill
              key={`review-star-${name}-${i}`}
              className={`size-3.5 ${
                i < rating ? "text-yellow-400" : "text-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{comment}</p>
    </div>
  )
}
