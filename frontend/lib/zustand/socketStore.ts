import { create } from "zustand"

type SocketStoreType = {
  joinedRoomId: string | null
  setJoinedRoomId: (roomId: string | null) => void

  isConnected: boolean
  setIsConnected: (value: boolean) => void

  enableChat?: boolean
  onFocus?: boolean
  startTime: Date | null,
  endTime: Date | null
  currentCycle?: number

  resetSocketStore?: () => void
}

export const useSocketStore = create<SocketStoreType>((set) => ({
  joinedRoomId: null,
  setJoinedRoomId: (roomId) => set({ joinedRoomId: roomId }),
  isConnected: false,
  setIsConnected: (value) => set({ isConnected: value }),
  enableChat: true,
  onFocus: false,
  startTime: null,
  endTime: null,
  currentCycle: 1,
  resetSocketStore: () => set({
    joinedRoomId: null,
    isConnected: false,
    enableChat: true,
    onFocus: false,
    startTime: null,
    endTime: null,
    currentCycle: 1
  })
}
))