"use client"

import { useRef, useState } from "react"
import { RiCameraLine } from "@remixicon/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface PhotoUploadProps {
  currentUrl: string | null
  initials: string
  onSelect: (file: File) => void
}

export function PhotoUpload({
  currentUrl,
  initials,
  onSelect,
}: PhotoUploadProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    onSelect(file)
    if (fileRef.current) fileRef.current.value = ""
  }

  const src = preview ?? currentUrl

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="group relative"
      >
        <Avatar className="size-24 text-2xl">
          {src ? (
            <AvatarImage src={src} alt="Foto de perfil" />
          ) : null}
          <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
        </Avatar>
        <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100">
          <RiCameraLine className="size-6" />
        </span>
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  )
}
