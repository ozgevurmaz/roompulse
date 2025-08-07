import mongoose from "mongoose"

export const RoomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    enableChat: { type: Boolean, default: true },
    onFocus: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    activeUsers: { type: Number, default: 0 },
    roomCaptain: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "UserProfile" },
    breakDuration: { type: Number, default: 5 },
    target: { type: Number, default: 4 },
    currentCycle: { type: Number, default: 1 },
    startTime: { type: Date, default: null },
    endTime: { type: Date, default: null },
    creator: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "UserProfile" },
}, { timestamps: true })

delete mongoose.models.Room
export default mongoose.models.Room || mongoose.model("Room", RoomSchema)
