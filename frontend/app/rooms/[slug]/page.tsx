'use client'

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { fetchRoom } from "@/lib/api/fetchRoom"
import ChatBox from "@/components/chat/chatBox"
import PomodoroTimer from "@/components/pomodoro/pomodoroTimer"
import { connectSocket } from "@/lib/socket"
import ActiveUserCard from "@/components/chat/activeUserCard"
import { useSocketStore } from "@/lib/zustand/socketStore"
import ChatSettings from "@/components/chat/chatSettings"
import PersonalPreferences from "@/components/users/personalPreferences"
import { useProfileStore } from "@/lib/zustand/useProfileStore"

const socket = connectSocket()

export default function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { isConnected, setIsConnected, setJoinedRoomId } = useSocketStore()

  const [room, setRoom] = useState<RoomDBType | null>(null)
  const [roomId, setRoomId] = useState<string>("")
  const [enableChat, setEnableChat] = useState<boolean>(true)
  const [isBreak, setIsBreak] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<ProfileSocketType[]>([])
  const { id: userId } = useProfileStore()

  const router = useRouter()

  const { slug } = use(params)

  useEffect(() => {
    setEnableChat(isConnected)
  }, [isConnected])

  useEffect(() => {
    const getRoom = async () => {
      const data = await fetchRoom(slug)
      setRoom(data)
      setRoomId(data._id.toString())
      setJoinedRoomId(data._id)
    }
    getRoom()
  }, [slug])

  socket.on("online-users", (users: ProfileSocketType[]) => {
    setOnlineUsers(users)
  })
  if (!room) return
  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden">
      <div className="p-3 h-[90vh] grid grid-cols-4 grid-rows-3 gap-3">
        <div className="col-start-1 col-span-1 row-span-2">
          <ActiveUserCard currentUser={userId} activeUsers={onlineUsers} roomName={room.name} isConnected={isConnected} />
        </div>
        <div className="col-start-1 row-start-3 col-span-1 row-span-1">
          <ChatSettings />
        </div>
        <div className="col-start-2 row-start-1 col-span-2 row-span-1 ">
          <PomodoroTimer setIsBreak={setIsBreak} isBreak={isBreak} />
        </div>

        <div className="col-start-2 row-start-2 col-span-2 row-span-2 ">
          <ChatBox roomId={roomId} enable={enableChat} isConnected={isConnected} />
        </div>
        <div className="col-span-1 row-span-3 ">
          <PersonalPreferences />
        </div>
      </div>
    </div>
  )
}
