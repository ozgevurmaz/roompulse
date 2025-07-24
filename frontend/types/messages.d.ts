type MessageDBType = {
    _id: ObjectId
    roomId: string
    user: string
    text: string
    createdAt: Date
    system?: boolean
}

type MessageType = Omit<MessageDBType , "_id" | "roomId">

type MessageSocketType  = Omit<MessageDBType , "_id" >