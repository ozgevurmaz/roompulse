declare global {

  type JoinRoomPayload = {
    roomId: string
    user: string
  }

  type MessageSocketType = {
    roomId: string
    user: string
    text: string
    createdAt?: Date
    system?: boolean
  }
}

export {MessageSocketType,JoinRoomPayload }
