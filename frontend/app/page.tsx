'use client'


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStore } from "@/lib/zustand/store"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Home() {
  const [name, setName] = useState<string>("")
  const setUsername = useStore((s) => s.setUsername)
  const router = useRouter()

  const handleStart = async () => {
    if (name.trim()) {
      setUsername(name)
      router.push("/rooms")
    }
  }


  return (
    <div className="p-10 space-y-4 flex gap-3">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        color="secondary"
      />
      <Button onClick={handleStart} color="primary" className="min-w-max px-2">
        Discover Rooms
      </Button>
    </div>
  )
}
