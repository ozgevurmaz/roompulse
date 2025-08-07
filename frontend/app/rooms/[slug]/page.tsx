'use client'

import { use, useEffect, useState } from "react"
import ChatBox from "@/components/chat/chatBox"
import PomodoroTimer from "@/components/pomodoro/pomodoroTimer"
import { connectSocket } from "@/lib/socket"
import ActiveUserCard from "@/components/chat/activeUserCard"
import { useSocketStore } from "@/lib/zustand/socketStore"
import ChatSettings from "@/components/chat/chatSettings"
import PersonalPreferences from "@/components/users/personalPreferences"
import { useProfileStore } from "@/lib/zustand/useProfileStore"
import { useRoomDetails } from "@/hooks/get/useRoomDetails"
import LoadingScreen from "@/components/screens/Loading"

const socket = connectSocket()

export default function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { isConnected, setJoinedRoomId } = useSocketStore()

  const [roomId, setRoomId] = useState<string>("")
  const [roomCaptain, setRoomCaptain] = useState<string | null>(null)
  const [enableChat, setEnableChat] = useState<boolean>(true)
  const [isBreak, setIsBreak] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<ProfileSocketType[]>([])
  const { id: userId } = useProfileStore()

  const { slug } = use(params)

  const { loading, error, data: room } = useRoomDetails(slug)

  useEffect(() => {
    if (room?._id) {
      setRoomId(room._id.toString())
      setJoinedRoomId(room._id.toString())
    }
  }, [room])

  useEffect(() => {
    setEnableChat(isConnected)
  }, [isConnected])

  useEffect(() => {
    if (room?._id)
      setRoomId(room?._id.toString())
  }, [room])

  socket.on("online-users", (users: ProfileSocketType[]) => {
    setOnlineUsers(users)
  })

  socket.on("captain-user", (userId: string | null) => {
    setRoomCaptain(userId)
  })
  socket.on("room-updated", (updatedRoom: RoomType) => {
    if (updatedRoom) {
      setEnableChat(updatedRoom.enableChat ?? true)
      setRoomCaptain(updatedRoom.roomCaptain.toString())
    }
  })


  if (loading) return <LoadingScreen />

  if (!room || error || !roomId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Room not found</h1>
      </div>
    )
  }

  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden">
      <div className="p-3 h-[90vh] grid grid-cols-4 grid-rows-3 gap-3">
        <div className="col-start-1 col-span-1 row-span-3">
          <ActiveUserCard captain={roomCaptain} currentUser={userId} activeUsers={onlineUsers} roomName={room.name} isConnected={isConnected} />
        </div>
        <div className="col-start-2 row-start-1 col-span-2 row-span-1 ">
          <PomodoroTimer isRoomCaptain={roomCaptain === userId} setIsBreak={setIsBreak} isBreak={isBreak} />
        </div>
        <div className="col-start-2 row-start-2 col-span-2 row-span-2 ">
          <ChatBox roomId={roomId} enable={enableChat} isConnected={isConnected} />
        </div>
        <div className="col-span-1 row-span-3 grid grid-rows-2 gap-3">
          <PersonalPreferences />
          <ChatSettings slug={slug} room={room} />
        </div>
      </div>
    </div>
  )
}
