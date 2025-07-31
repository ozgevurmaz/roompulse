"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageCircleMore, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import Loading from "@/components/screens/Loading"
import { useRoomsStore } from "@/lib/zustand/useRooms"
import { CreateRoomModal } from "@/components/room/createRoomModal"
import { useProfileStore } from "@/lib/zustand/useProfileStore"
import { useRooms } from "@/hooks/get/useRooms"
import { useSocketStore } from "@/lib/zustand/socketStore"
import { useEffect } from "react"


export default function RoomsPage() {
  const router = useRouter()

  const { username } = useProfileStore()
  const { rooms, setRooms } = useRoomsStore()
  const { loading } = useRooms()

  useEffect(() => useSocketStore.getState().setJoinedRoomId(""), [])

  return (
    
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold">
              Rooms
            </h1>
            <p>Find a suitable room and start working together with others</p>
          </div>
          <CreateRoomModal user={username} />
        </div>


        <div className="space-y-2">
          {
            (loading === true)
              ?
              <div>
                <Loading />
              </div>
              :
              rooms.length > 0
                ?
                <div className="flex flex-wrap gap-3">
                  {
                    rooms.map((room, index) => (
                      <Card
                        key={index}
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
    
  )
}
