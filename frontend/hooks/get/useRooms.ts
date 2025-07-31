import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRoomsStore } from "@/lib/zustand/useRooms"

export function useRooms() {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const setRooms = useRoomsStore((s) => s.setRooms)

    useEffect(() => {
        async function fetchRooms() {
            try {
                setLoading(true)
                const res = await fetch(`/api/rooms`)
                const data = await res.json()

                if (!res.ok) {
                    setError(data.error || "Something went wrong")
                    return
                }
                setRooms(data)
            } catch (err) {
                toast.error("Rooms could not be fetched")
                setError("Network error")
            } finally {
                setLoading(false)
            }
        }

        fetchRooms()
    }, [setRooms])

    return { loading, error }
}