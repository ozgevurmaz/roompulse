import mongoose, { Schema, Document } from "mongoose"

export interface IUserSettings extends Document {
  userId: string
  theme: "light" | "dark"
  language?: string
  notificationsEnabled?: boolean
  createdAt: Date
  updatedAt: Date
}

const UserSettingsSchema = new Schema<IUserSettings>(
  {
    userId: { type: String, required: true, unique: true },
    theme: { type: String, enum: ["light", "dark"], default: "light" },
    language: { type: String, default: "en" },
    notificationsEnabled: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.models.UserSettings ||
  mongoose.model<IUserSettings>("UserSettings", UserSettingsSchema)
