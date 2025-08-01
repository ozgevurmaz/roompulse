import Room from "@/lib/models/room";
import { connectToDatabase } from "@/lib/mongoDB"
import { nanoid } from "nanoid"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    await connectToDatabase();

    const rooms = await Room.find().sort({ updatedAt: "desc" })

    return NextResponse.json(rooms, { status: 200 });
  } catch (error) {
    console.log("[rooms_get]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {

    await connectToDatabase();

    const body = await req.json();
    const { name, creator, target, breakDuration, showChat } = body;

    const slug = `${name.toLowerCase().replace(/\s+/g, "-")}-${nanoid(5)}`

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    const newRoom = await new Room({
      name,
      slug,
      creator,
      target,
      breakDuration,
      showChat,
      createdAt: new Date(),
    })

    await newRoom.save()

    return NextResponse.json(newRoom, { status: 200 })
  } catch (error) {
    console.log("[rooms_post]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}
