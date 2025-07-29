"use client"

import { ReactNode } from 'react'
import { useSocketRoomCleanup } from '@/hooks/useSocketRoomCleanup'

export function SocketProvider({ children }: { children: ReactNode }) {
    useSocketRoomCleanup()
    return children
}
