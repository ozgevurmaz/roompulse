type RoomDBType = {
  _id: ObjectId
  name: string
  slug: string
  target?: number
  showChat?: boolean
  breakDuration?: number
  onFocus?: boolean
  active?: boolean
  creator?: string
  createdAt: Date
}

type RoomType = Omit<RoomDBType, "_id">