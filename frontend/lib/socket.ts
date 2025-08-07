"use client"
import { io } from "socket.io-client"
import { useSocketStore } from "./zustand/socketStore"

let socket: ReturnType<typeof io> | null = null

export const connectSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ["websocket"],
    })
    useSocketStore.setState({
      isConnected: true,
      joinedRoomId: "",
    })
  }
  return socket
}
