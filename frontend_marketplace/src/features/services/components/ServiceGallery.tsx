import { useState } from "react"
import { RiImageLine } from "@remixicon/react"

interface ServiceGalleryProps {
  category: string
  title?: string
  images?: string[]
}

export function ServiceGallery({ category, title, images }: ServiceGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const hasImages = images && images.length > 0

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] border border-white/70 bg-muted shadow-xl shadow-slate-950/5">
        {hasImages ? (
          <img
            src={images[selectedIndex]}
            alt={`${title ?? category} - imagen ${selectedIndex + 1}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-primary/5 text-primary/30">
            <RiImageLine className="size-12" />
            <span className="text-sm font-medium">{category}</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/0 to-transparent p-6">
          <div className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
            {category}
          </div>
        </div>
      </div>

      {hasImages && images.length > 1 && (
        <div className="flex flex-wrap gap-3">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className={`aspect-[4/3] w-20 overflow-hidden rounded-2xl border bg-muted transition-all ${
                selectedIndex === i
                  ? "border-emerald-500 ring-2 ring-emerald-300 ring-offset-2"
                  : "border-slate-200 opacity-80 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
