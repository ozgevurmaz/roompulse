import { create } from 'zustand'

interface RoomsStore {
  rooms: RoomType[]
  setRooms: (rooms: RoomType[]) => void
  updateRoom: (id: string, update: Partial<RoomType>) => void
}

export const useRoomsStore = create<RoomsStore>((set) => ({
  rooms: [],
  setRooms: (rooms) => set({ rooms }),
  updateRoom: (slug, update) =>
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.slug === slug ? { ...room, ...update } : room
      )
    })),
}))
