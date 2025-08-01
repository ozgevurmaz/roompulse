import Messages from "./models/message"
import { connectToDatabase } from "./mongoDB"
import type { MessageSocketType } from "../types/global"
import mongoose from "mongoose"

export async function logMessage({ roomId, user, text, createdAt = new Date(), system = false }: MessageSocketType) {
    try {
        await connectToDatabase()
        if (!roomId) return
        if (!mongoose.Types.ObjectId.isValid(roomId)) {
            throw new Error(`Invalid roomId: ${roomId}`)
        }
console.log(roomId)
console.log(user)
console.log(text)
console.log(system)
        const newMessage = await new Messages({
            roomId: new mongoose.Types.ObjectId(roomId),
            user: new mongoose.Types.ObjectId(user),
            text,
            createdAt,
            system
        })
console.log(newMessage)
        await newMessage.save()
    } catch (err) {
        console.error("Failed to log message:", err)
    }
}
