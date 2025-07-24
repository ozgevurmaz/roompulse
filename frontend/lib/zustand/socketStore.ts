import { create } from "zustand"

type SocketStoreType = {
  joinedRoomId: string | null
  setJoinedRoomId: (roomId: string | null) => void

  isConnected: boolean
  setIsConnected: (value: boolean) => void
}

export const useSocketStore = create<SocketStoreType>((set) => ({
  joinedRoomId: null,
  setJoinedRoomId: (roomId) => set({ joinedRoomId: roomId }),

  isConnected: false,
  setIsConnected: (value) => set({ isConnected: value }),
}))