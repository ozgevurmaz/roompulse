import mongoose from "mongoose"

export const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    target: { type: Number },
    showChat: { type: Boolean },
    onFocus: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    breakDuration: { type: Number },
    creator: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "UserProfile" },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Room || mongoose.model("Room", RoomSchema)
