type RoomDBType = {
  _id: ObjectId
  name: string
  slug: string
  creator?: string
  createdAt: Date
}

type RoomType = Omit<RoomDBType , "_id">