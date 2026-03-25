"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useAuth } from "@/infrastructure/auth/AuthContext"
import { Sidebar } from "@/shared/components/Sidebar"
import { TopBar } from "@/shared/components/TopBar"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { token, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !token) {
      router.replace("/login")
    }
  }, [token, isLoading, router])

  if (isLoading || !token) return null

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  )
}
