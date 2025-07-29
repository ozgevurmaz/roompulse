"use client"

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useUserProfile } from '@/hooks/get/useProfile'
import { toast } from 'react-toastify'

export default function AuthCallback() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [checkCompleted, setCheckCompleted] = useState(false)
    const { error, loading } = useUserProfile(session?.user?.username)


    useEffect(() => {
        if (status === "loading") return

        if (status === "unauthenticated") {
            router.push('/')
            return
        }

        if (session?.user) {
            checkUserStatus()
        }
    }, [session, status, router])

    const checkUserStatus = async () => {
        try {
            const response = await fetch('/api/user/status')
            const data = await response.json()

            if (data.isNew) {
                // New user - redirect to account setup
                router.push(`/${session?.user.username}/account`)
            } else {
                // Existing user - redirect to rooms
                setCheckCompleted(true)
            }
        } catch (error) {
            console.error('Error checking user status:', error)
            // Default to rooms on error
            router.push('/rooms')
        }
    }

    useEffect(() => {
        if (!checkCompleted) return

        if (error) {
            toast.error("Error loading profile")
            router.push('/')
            return
        }

        if (!loading) {
            router.push('/rooms')
        }
    }, [checkCompleted, loading, error])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-border-focus mx-auto"></div>
                <p className="mt-4 text-foreground">Setting up your account...</p>
            </div>
        </div>
    )
}