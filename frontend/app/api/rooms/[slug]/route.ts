import { connectToDatabase } from "@/lib/mongoDB"
import Room from "@/lib/models/room"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectToDatabase()
  const { slug } = await params
  const room = await Room.findOne({ slug: slug }).lean()

  if (!room) {
    return new NextResponse("Room not found", { status: 404 })
  }
  return NextResponse.json(room)
}