const PRODUCT_IMAGE_POOL = [
  "Q_100.jpg",
  "Q_104.jpg",
  "Q_109.jpg",
  "Q_112.jpg",
  "Q_118.jpg",
  "Q_123.jpg",
  "Q_127.jpg",
  "Q_132.jpg",
  "Q_138.jpg",
  "Q_144.jpg",
  "Q_150.jpg",
  "Q_156.jpg",
  "Q_161.jpg",
  "Q_166.jpg",
  "Q_172.jpg",
  "Q_177.jpg",
  "Q_183.jpg",
  "Q_188.jpg",
  "Q_194.jpg",
  "Q_201.jpg",
  "Q_208.jpg",
  "Q_214.jpg",
  "Q_221.jpg",
  "Q_228.jpg",
  "Q_235.jpg",
  "Q_242.jpg",
  "Q_249.jpg",
  "Q_256.jpg",
  "Q_264.jpg",
  "Q_271.jpg",
  "Q_278.jpg",
  "Q_286.jpg",
  "Q_294.jpg",
  "Q_302.jpg",
  "Q_311.jpg",
  "Q_319.jpg",
] as const

const BANNER_IMAGE_POOL = [
  "z_559.jpg",
  "z_562.jpg",
  "z_568.jpg",
  "z_574.jpg",
  "z_578.jpg",
  "z_586.jpg",
] as const

export const BRAND_LOGO_PRIMARY = "/images/branding/logo_1.jpg"
export const BRAND_LOGO_MARK = "/images/branding/logo_2.jpg"

function hashString(value: string) {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  }
  return hash
}

export function getBannerImage(index = 0) {
  return `/images/banners/${BANNER_IMAGE_POOL[index % BANNER_IMAGE_POOL.length]}`
}

export function getProductFallbackImages(seed: string, count = 3) {
  const base = hashString(seed)
  const urls: string[] = []

  for (let offset = 0; offset < count; offset += 1) {
    const image =
      PRODUCT_IMAGE_POOL[(base + offset * 7) % PRODUCT_IMAGE_POOL.length]
    urls.push(`/images/productos/${image}`)
  }

  return Array.from(new Set(urls))
}

function apiBase() {
  return (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "")
}

/** Rutas /media/... del backend como URL absoluta para <img> en el cliente. */
export function absolutizeBackendMediaUrl(
  url: string | null | undefined,
): string | null {
  if (url == null) return null
  const t = url.trim()
  if (!t) return null
  if (t.startsWith("http://") || t.startsWith("https://")) return t
  const base = apiBase()
  if (base && t.startsWith("/")) return `${base}${t}`
  return t
}

export function resolveProductImages(
  seed: string,
  remoteImages: Array<{ url: string }> = [],
  remoteMain?: string | null,
) {
  const mapped = [
    ...(remoteMain ? [absolutizeBackendMediaUrl(remoteMain)] : []),
    ...remoteImages.map((image) => absolutizeBackendMediaUrl(image.url)),
  ].filter(Boolean) as string[]

  if (mapped.length > 0) return mapped
  return getProductFallbackImages(seed, 3)
}
