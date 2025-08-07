import { connectToDatabase } from "@/lib/mongoDB"
import Room from "@/lib/models/room"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectToDatabase()
  const { slug } = await params

  if (!slug) {
    return new NextResponse("Slug is required", { status: 400 })
  }
  const room = await Room.findOne({ slug: slug }).lean()

  if (!room) {
    return new NextResponse("Room not found", { status: 404 })
  }

  return NextResponse.json(room)
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {

  const { slug } = await params

  try {
    await connectToDatabase()

    const updatedRoomData = await req.json()
    const updatedRoom = await Room.findOneAndUpdate({ slug: slug }, updatedRoomData)

    if (!updatedRoom) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 })
    }

    return NextResponse.json(updatedRoom)
  } catch (error) {
    console.error('Room updated error:', error)
    return NextResponse.json({ error: 'Internal Server Error' })
  }
}