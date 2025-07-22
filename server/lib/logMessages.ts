import Message from "./models/message"
import { connectToDatabase } from "./mongoDB"
import type { MessageSocketType } from "../types/global"
import mongoose from "mongoose"

export async function logMessage({ roomId, user, text, createdAt = new Date(), system = false }: MessageSocketType) {
    try {
        await connectToDatabase()
        const newMessage = await new Message({
            roomId: new mongoose.Types.ObjectId(roomId),
            user,
            text,
            createdAt,
            system
        })
        await newMessage.save()
    } catch (err) {
        console.error("Failed to log message:", err)
    }
}
