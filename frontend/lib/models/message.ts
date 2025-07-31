import mongoose from "mongoose"

export const MessageSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.ChatMessage || mongoose.model("ChatMessage", MessageSchema)