import { RiStarFill } from "@remixicon/react"

interface RatingBreakdown {
  stars: number
  percentage: number
}

interface ReviewsSummaryProps {
  averageRating: number
  totalReviews: number
  breakdown: RatingBreakdown[]
}

export function ReviewsSummary({
  averageRating,
  totalReviews,
  breakdown,
}: ReviewsSummaryProps) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
      {/* Average score */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-5xl font-bold text-foreground">
          {averageRating}
        </span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <RiStarFill
              key={`avg-star-${i}`}
              className={`size-4 ${
                i < Math.round(averageRating)
                  ? "text-yellow-400"
                  : "text-muted-foreground/30"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {totalReviews} reseñas
        </span>
      </div>

      {/* Breakdown bars */}
      <div className="flex-1 space-y-2">
        {breakdown.map((item) => (
          <div key={`breakdown-${item.stars}`} className="flex items-center gap-3">
            <span className="w-8 text-right text-sm font-medium text-muted-foreground">
              {item.stars}★
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-yellow-400 transition-all"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className="w-10 text-right text-xs text-muted-foreground">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
