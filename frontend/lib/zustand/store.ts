import { create } from "zustand"
import { persist } from "zustand/middleware"

type StoreType = {
  username: string
  setUsername: (name: string) => void
}

export const useStore = create<StoreType>()(
  persist(
    (set) => ({
      username: "",
      setUsername: (name) => set({ username: name }),
    }),
    {
      name: "neurofocus-store", 
    }
  )
)
