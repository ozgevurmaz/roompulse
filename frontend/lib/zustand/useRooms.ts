import { create } from 'zustand'

interface RoomsStore {
  rooms: RoomType[]
  setRooms: (rooms: RoomType[]) => void
  fetchRooms: () => Promise<void>
}

export const useRoomsStore = create<RoomsStore>((set) => ({
  rooms: [],
  setRooms: (rooms) => set({ rooms }),
  fetchRooms: async () => {
    const res = await fetch('/api/rooms')
    const data = await res.json()
    set({ rooms: data })
  }
}))
