import Message from "@/lib/models/message"
import { connectToDatabase } from "@/lib/mongoDB"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const roomIncoming = searchParams.get("roomId")

        if (!roomIncoming) {
            return NextResponse.json({ error: "Missing roomId" }, { status: 400 })
        }
        await connectToDatabase()

        const messages = await Message.find({ roomId: roomIncoming }).sort({ createdAt: "asc" })

        return NextResponse.json(messages, { status: 200 })
    } catch (error) {
        console.log("[messages_get]", error)
        return new NextResponse("internal server error", { status: 500 });
    }
}