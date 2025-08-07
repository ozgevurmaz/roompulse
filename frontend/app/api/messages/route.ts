import Messages from "@/lib/models/message"
import { connectToDatabase } from "@/lib/mongoDB"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase()

        const roomId = req.nextUrl.searchParams.get("roomId")
        if (!roomId) return new NextResponse("Room ID required", { status: 400 })

        const messages = await Messages.find({ roomId })
            .sort({ createdAt: 1 })
            .populate("user", "_id username avatar title company system")
            .lean()
        console.log("Fetched messages:", messages)
        const normalizedMessages = messages
            .map((msg) => ({
                ...msg,
                user: {
                    ...msg.user,
                    id: msg.user._id.toString(),
                },
            }))
        return NextResponse.json(normalizedMessages)
    } catch (error) {
        console.error("[messages_get]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}