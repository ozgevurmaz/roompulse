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

  type ProfileType = {
    id: string,
    username: string,
    avatar?: string,
    title?: string,
    company?: string
  }
}

export { MessageSocketType, JoinRoomPayload }
