'use client'

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { fetchRoom } from "@/lib/api/fetchRoom"
import ChatBox from "@/components/chat/chatBox"
import ChatHeader from "@/components/chat/chatHeader"
import PomodoroTimer from "@/components/pomodoro/pomodoroTimer"
import { useStore } from "@/lib/zustand/store"
import { connectSocket } from "@/lib/socket"
import ActiveUserCard from "@/components/users/activeUserCard"
import { useSocketStore } from "@/lib/zustand/socketStore"



export default function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const user = useStore((s) => s.username)
  const { isConnected, setIsConnected, setJoinedRoomId } = useSocketStore()

  const [room, setRoom] = useState<RoomDBType | null>(null)
  const [roomId, setRoomId] = useState<string>("")
  const [enableChat, setEnableChat] = useState<boolean>(true)
  const [isBreak, setIsBreak] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])


  const router = useRouter()

  const { slug } = use(params)

  useEffect(() => { setEnableChat(isConnected) }, [isConnected])

  useEffect(() => {
    const getRoom = async () => {
      const data = await fetchRoom(slug)
      setRoom(data)
      setRoomId(data._id.toString())
      setJoinedRoomId(data._id)
    }
    getRoom()
  }, [slug])


  if (!room) return
  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      <ChatHeader roomName={room.name} goBack={() => router.push("/rooms")} onlineUsers={onlineUsers.length} isConnected={isConnected} />

      <div className="p-3 h-[93vh] grid grid-cols-4 grid-rows-3 gap-1">
        <div className="col-start-1 col-span-1 row-span-2">
          <ActiveUserCard activeUsers={onlineUsers} />
        </div>
        <div className="col-start-1 row-start-3 col-span-1 row-span-1 border border-violet-300">
          chat settings
        </div>
        <div className="col-start-2 row-start-1 col-span-2 row-span-1 ">
          <PomodoroTimer setIsBreak={setIsBreak} isBreak={isBreak} />
        </div>

        <div className="col-start-2 row-start-2 col-span-2 row-span-2 ">
          <ChatBox roomId={roomId} enable={enableChat} isConnected={isConnected} />
        </div>
        <div className="col-span-1 row-span-3 border border-green-300">
          personal things
        </div>


      </div>
    </div>
  )
}
