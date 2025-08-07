import { Server, Socket } from "socket.io"
import { handleChatMessage } from "./handlers/chatMessage"
import { handleDisconnect } from "./handlers/disconnect"
import { handleJoinRoom } from "./handlers/joinRoom"
import { handleLeaveRoom } from "./handlers/leaveRoom"

export let totalOnlineUsers = 0;

export const registerSocketHandlers = (io: Server) => {
    io.on("connection", (socket: Socket) => {

        socket.on("join-room", (data) => handleJoinRoom(io, socket, data))
        socket.on("user-left", (data) => handleLeaveRoom(io, socket, data))
        socket.on("chat-message", (data) => handleChatMessage(io, socket, data))

        socket.on("typing", ({ roomId, user }: { user: ProfileType; roomId: string }) => {
            socket.to(roomId).emit("typing", { roomId, user })
        })

        socket.on("stop-typing", ({ roomId, user }: { user: ProfileType; roomId: string }) => {
            socket.to(roomId).emit("stop-typing", { roomId, user })
        })

        socket.on("pomodoro-timer", ({ roomId, isBreak, startTime, endTime, enableChat, currentCycle }: { roomId: string; isBreak: boolean; startTime: number; endTime: number; enableChat: boolean; currentCycle: number }) => {
            socket.to(roomId).emit("pomodoro-timer", { isBreak, startTime, endTime, enableChat, currentCycle })
        })

        socket.on("disconnect", () => handleDisconnect(io, socket))
    })
}
