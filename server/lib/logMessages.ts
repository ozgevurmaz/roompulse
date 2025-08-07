import Messages from "./models/message"
import type { MessageSocketType } from "../types/global"
import mongoose from "mongoose"

export async function logMessage({ roomId, user, text, createdAt = new Date(), system = false }: MessageSocketType) {
    try {
        if (!roomId) return
        if (!mongoose.Types.ObjectId.isValid(roomId)) {
            throw new Error(`Invalid roomId: ${roomId}`)
        }

        const newMessage = await new Messages({
            roomId: new mongoose.Types.ObjectId(roomId),
            user: new mongoose.Types.ObjectId(user),
            text,
            createdAt,
            system
        })

        await newMessage.save()
    } catch (err) {
        console.error("Failed to log message:", err)
    }
}
