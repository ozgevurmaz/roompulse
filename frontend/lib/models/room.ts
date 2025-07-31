import mongoose from "mongoose"

export const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    target: { type: Number, default: 3 },
    showChat: { type: Boolean, default: true },
    breakDuration: { type: Number, default: 5 },
    creator: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Room || mongoose.model("Room", RoomSchema)
