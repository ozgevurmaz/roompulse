"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { useSocketStore } from "@/lib/zustand/socketStore"
import { connectSocket } from "@/lib/socket"
import { useStore } from "@/lib/zustand/store"

const socket = connectSocket()

export function useSocketRoomCleanup() {
  const pathname = usePathname()
  const { joinedRoomId, setIsConnected } = useSocketStore()
  const { username } = useStore()
  const prevRoomRef = useRef<string | null>(null)

  useEffect(() => {
    if (!username) return
    if (prevRoomRef.current === joinedRoomId) return

    if (!joinedRoomId) {
      socket.emit("user-left", {
        roomId: prevRoomRef.current,
        user: username,
      })
      prevRoomRef.current = joinedRoomId
      return
    }
  
    socket.emit("join-room", { roomId: joinedRoomId, user: username })
    prevRoomRef.current = joinedRoomId
    setIsConnected(true)
    return

  }, [pathname, joinedRoomId])
}
