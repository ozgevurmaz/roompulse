import mongoose from "mongoose"

export const MessageSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "UserProfile", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  system: { type: Boolean, default: false }
})

MessageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 })
export default mongoose.models.Messages || mongoose.model("Messages", MessageSchema)