import { ObjectId } from "mongoose"

export type RoomDBType = {
  _id: ObjectId
  name: string
  slug: string
  target?: number
  currentCycle?: number
  enableChat?: boolean
  breakDuration?: number
  onFocus?: boolean
  active?: boolean
  activeUsers?: number
  roomCaptain: ObjectId | null
  creator?: string
  startTime: Date | null
  endTime: Date | null
  createdAt: Date
}

export type RoomType = Omit<RoomDBType, "_id">