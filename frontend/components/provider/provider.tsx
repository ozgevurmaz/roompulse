"use client"

import { ReactNode } from 'react'
import { useSocketRoomCleanup } from '@/hooks/useSocketRoomCleanup'

export function Providers({ children }: { children: ReactNode }) {
    useSocketRoomCleanup()
    return children
}
