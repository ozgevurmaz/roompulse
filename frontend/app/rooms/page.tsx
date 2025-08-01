"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, TimerOff, TimerReset, Users, Clock, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import Loading from "@/components/screens/Loading"
import { useRoomsStore } from "@/lib/zustand/useRooms"
import { CreateRoomModal } from "@/components/room/createRoomModal"
import { useProfileStore } from "@/lib/zustand/useProfileStore"
import { useRooms } from "@/hooks/get/useRooms"
import { useSocketStore } from "@/lib/zustand/socketStore"
import { useEffect, useState } from "react"
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogContent, DialogOverlay, DialogTitle } from "@/components/ui/dialog"

export default function RoomsPage() {
  const router = useRouter()

  const { id } = useProfileStore()
  const { rooms, setRooms } = useRoomsStore()
  const { loading } = useRooms()

  const [warningModal, setWarningModal] = useState<boolean>(false)
  const [currentSlug, setCurrentRoomSlug] = useState<string>("")
  useEffect(() => useSocketStore.getState().setJoinedRoomId(""), [])

  const handleRoomCardClick = (room: RoomType) => {
    if (room.active && room.onFocus) {
      setWarningModal(true)
      setCurrentRoomSlug(room.slug)
    } else {
      handleNavigate(room.slug)
    }
  }

  const handleNavigate = (slug: string) => {
    router.push(`/rooms/${slug}`)
  }

  const getRoomStatusText = (room: any) => {
    if (!room.active) return "Inactive"
    return room.onFocus ? "Focus Time" : "Break Time"
  }

  const getRoomStatusIcon = (room: any) => {
    if (!room.active) return <Clock className="w-4 h-4" />
    return room.onFocus ? <Zap className="w-4 h-4" /> : <TimerOff className="w-4 h-4" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-white dark:to-zinc-900">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-secondary">
              Study Rooms
            </h1>
            <p className="text-lg text-secondary-foreground/80 max-w-2xl">
              Join a productive study session and work together with focused learners from around the world
            </p>
          </div>
          <CreateRoomModal userId={id} />
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center space-y-4">
                <Loading />
                <p className="text-primary-foreground">Loading available rooms...</p>
              </div>
            </div>
          ) : rooms.length > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  Available Rooms ({rooms.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {rooms.map((room, index) => (
                  <Card
                    key={index}
                    className="group relative overflow-hidden border-0 shadow-lg bg-surface backdrop-blur-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-950"
                    onClick={() => handleRoomCardClick(room)}
                  >
                    {/* Status Indicator */}
                    <div className="absolute top-0 left-0 right-0 h-1">
                      <div
                        className={`h-full transition-all duration-500 ${room.active
                          ? room.onFocus
                            ? "bg-error"
                            : "bg-success"
                          : "bg-accent"
                          }`}
                      />
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full shadow-sm ${room.active
                              ? room.onFocus
                                ? "bg-error shadow-error/50"
                                : "bg-success shadow-success/50"
                              : "bg-foreground/50 shadow-foreground/10"
                              }`}
                          />
                          <CardTitle className="text-lg font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
                            {room.name}
                          </CardTitle>
                        </div>
                      </div>
                      <CardDescription className="text-foreground/80">
                        Room #{index + 1}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Room Stats */}
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-foreground/80 ">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span className="font-medium">0</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground/80">
                          <TimerReset className="w-4 h-4 text-purple-500" />
                          <span className="font-medium">{room.target}</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground/80">
                          <TimerOff className="w-4 h-4 text-orange-500" />
                          <span className="font-medium">{room.breakDuration}m</span>
                        </div>
                      </div>

                      {/* Room Status Badge */}
                      {room.active && (
                        <div className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium text-sm transition-all ${room.onFocus
                          ? "bg-error text-error-foreground border border-error"
                          : "bg-success text-success-foreground border border-success"
                          }`}>
                          {getRoomStatusIcon(room)}
                          {getRoomStatusText(room)}
                        </div>
                      )}

                      {!room.active && (
                        <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium text-sm bg-input-bg text-input-placeholder border border-input-border">
                          <Clock className="w-4 h-4" />
                          Waiting to Start
                        </div>
                      )}
                    </CardContent>

                    <CardFooter className="pt-4">
                      <Button
                        color="accent"
                        className="w-full shadow-md hover:shadow-lg transition-all duration-300 group/btn py-2"
                        onClick={() => handleRoomCardClick(room)}
                      >
                        <span>Join Room</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center space-y-4 max-w-md">
                <div className="w-16 h-16 mx-auto  rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 " />
                </div>
                <h3 className="text-xl font-semibold text-error">
                  No Rooms Available
                </h3>
                <p className="">
                  There are currently no study rooms available. Create your own room to get started!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Warning Modal */}
        <Dialog open={warningModal} onOpenChange={setWarningModal}>
          <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <DialogContent className="max-w-md mx-auto bg-surface rounded-xl shadow-2xl border border-t-7 border-secondary" >
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-xl font-semibold text-secondary-foreground">
                Join Active Focus Session?
              </DialogTitle>
              <DialogDescription className="text-secondary-foreground leading-relaxed">
                This room is currently in a focused study session. Joining now means you'll enter during active focus time. Are you ready to concentrate?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-3 pt-6">
              <Button
                color="none"
                className="border border-border flex-1"
                onClick={() => setWarningModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleNavigate(currentSlug)}
                color="secondary"
                className="flex-1"
              >
                Join Session
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}