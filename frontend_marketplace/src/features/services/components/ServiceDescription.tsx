interface ServiceDescriptionProps {
  description: string
  sizes: string[]
}

export function ServiceDescription({
  description,
  sizes,
}: ServiceDescriptionProps) {
  return (
    <div className="space-y-8 rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-lg shadow-slate-950/5">
      <div>
        <h3 className="mb-3 text-lg font-semibold text-foreground">
          Descripcion del producto
        </h3>
        <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      </div>

      {sizes.length > 0 && (
        <div>
          <h3 className="mb-3 text-lg font-semibold text-foreground">
            Tallas disponibles
          </h3>
          <ul className="flex flex-wrap gap-2">
            {sizes.map((item) => (
              <li key={item}>
                <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
