import { useEffect, useState } from "react"
import { useProfileStore } from "@/lib/zustand/useProfileStore"
import { toast } from "react-toastify"

export function useUserProfile(username: string | undefined) {
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const setProfile = useProfileStore((s) => s.setProfile)

    useEffect(() => {
        if (!username) return

        async function fetchProfile() {
            try {
                setLoading(true)
                const res = await fetch(`/api/user/${username}`)
                const data = await res.json()

                if (!res.ok) {
                    setError(data.error || "Something went wrong")
                    return
                }
                setProfile({
                    username: data.username,
                    name: data.name,
                    bio: data.bio,
                    location: data.location,
                    company: data.company,
                    hireable: data.hireable,
                    socialLinks: data.socialLinks || [],
                    github: data.github,
                    avatar: data.avatar,
                    email: data.email,
                })
            } catch (err) {
                toast.error("Profile could not be fetched")
                setError("Network error")
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [username, setProfile])

    return { loading, error }
}