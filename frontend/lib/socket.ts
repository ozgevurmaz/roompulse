import { io, Socket } from "socket.io-client"

let socket: ReturnType<typeof io> | null = null

export const connectSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      transports: ["websocket"],
    })
  }
  return socket
}
