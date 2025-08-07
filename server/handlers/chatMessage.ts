import { Server, Socket } from "socket.io"
import { logMessage } from "../lib/logMessages"

export const handleChatMessage = async (
    io: Server,
    socket: Socket,
    { roomId, user, text }: { roomId: string; user: ProfileType, text: string }
) => {

    const createdAt = new Date()
    io.to(roomId).emit("chat-message", { roomId, user, text, createdAt })

    await logMessage({ roomId, user: user.id, text, createdAt })
}