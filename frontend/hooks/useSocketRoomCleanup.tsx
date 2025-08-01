"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { useSocketStore } from "@/lib/zustand/socketStore"
import { connectSocket } from "@/lib/socket"
import { useProfileStore } from "@/lib/zustand/useProfileStore"

const socket = connectSocket()

export function useSocketRoomCleanup() {
  const pathname = usePathname()
  const { joinedRoomId, setJoinedRoomId, setIsConnected } = useSocketStore()
  const { id, username, title, company, avatar } = useProfileStore()

  const user: ProfileSocketType = { id, username, title, company, avatar }
  const prevRoomRef = useRef<string | null>(null)

  const shouldLeaveRoom = !pathname.startsWith("/rooms/") && prevRoomRef.current

  useEffect(() => {
    if (!username || !id) return
    if (prevRoomRef.current === joinedRoomId) return

    if (shouldLeaveRoom) {
      socket.emit("user-left", {
        roomId: prevRoomRef.current,
        user,
      })

      prevRoomRef.current = null
      setIsConnected(false)
      setJoinedRoomId("")
    }

    if (joinedRoomId) {
      socket.emit("join-room", { roomId: joinedRoomId, user })
      prevRoomRef.current = joinedRoomId
      setIsConnected(true)
    }
    return

  }, [pathname, joinedRoomId])
}
