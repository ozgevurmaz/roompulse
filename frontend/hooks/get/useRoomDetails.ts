import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export function useRoomDetails(slug: string | undefined) {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [data, setData] = useState<RoomDBType | null>(null)

    useEffect(() => {
        if (!slug) return

        async function fetchRoomDetail() {
            try {
                setLoading(true)
                const res = await fetch(`/api/rooms/${slug}`)
                const roomDetail = await res.json()
                setData(roomDetail)
                if (!res.ok) {
                    setError(roomDetail.error || "Something went wrong")
                    return
                }

            } catch (err) {
                toast.error("Room Details could not be fetched")
                setError("Network error")
            } finally {
                setLoading(false)
            }
        }

        fetchRoomDetail()
    }, [slug])

    return { loading, error, data }
}