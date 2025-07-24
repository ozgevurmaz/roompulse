"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, MessageCircleMore, Users } from "lucide-react"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import Navbar from "@/components/Navbar/navbar"
import { useSocketStore } from "@/lib/zustand/socketStore"

type Room = {
  _id: string
  name: string
  slug: string
  createdAt: string
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [newRoomName, setNewRoomName] = useState("")
  const router = useRouter()
  const { setJoinedRoomId } = useSocketStore()

  useEffect(() => {
    setJoinedRoomId(null)
    async function fetchRooms() {
      const res = await fetch("/api/rooms")
      const data = await res.json()
      setRooms(data)
    }
    fetchRooms()
  }, [])

  async function handleCreateRoom() {
    const res = await fetch("/api/rooms", {
      method: "POST",
      body: JSON.stringify({ name: newRoomName }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await res.json()
    router.push(`/rooms/${data.slug}`)
  }

  return (
    <>
      <Navbar />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold mb-4">
            Rooms
          </h1>

          <Button className="px-2 font-semibold" color="secondary">Create a New Room</Button>
        </div>


        <div className="space-y-2">
          {rooms.length > 0
            ?
            <div className="flex flex-wrap gap-3">
              {
                rooms.map((room, index) => (
                  <Card
                    key={room._id}
                    className="group hover:border-border-hover hover:shadow-md hover:-translate-y-[2px]"
                    onClick={() => { router.push(`/rooms/${room.slug}`) }}
                  >
                    <CardHeader>
                      <CardTitle>{room.name}</CardTitle>
                      <CardDescription>Room-{index}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center mx-auto gap-3 text-xs text-foreground/60">
                      <div className="flex gap-1">
                        <Users className="w-4 h-4" /> 0
                      </div>
                      <div className="flex gap-1">
                        <MessageCircleMore className="w-4 h-4" /> 0
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button color="primary" className="px-4">
                        Enter Room <ArrowRight className="w-4 h-4 group-hover:translate-x-2" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
            :
            <div>Room cannot be find</div>
          }
        </div>
      </div>
    </>
  )
}
