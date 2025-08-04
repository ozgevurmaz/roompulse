"use client"

import { useProfileStore } from '@/lib/zustand/useProfileStore'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import LoadingScreen from '../screens/Loading'
import { useUserProfile } from '@/hooks/get/useProfile'

interface Props {
    children: React.ReactNode
}
const AuthProvider = ({ children }: Props) => {
    const session = useSession()
    const router = useRouter()
    const { id } = useProfileStore()
    const { loading } = useUserProfile(session.data?.user.username)

    useEffect(() => {
        if (session.status === "unauthenticated") {
            useProfileStore.getState().resetProfile()
            router.push("/")
        }
    }, [session.status, router])

    if (session.status === "loading" && loading) return <LoadingScreen />

    return (
        <div>{children}</div>
    )
}

export default AuthProvider