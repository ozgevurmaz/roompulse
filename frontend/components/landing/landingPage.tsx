"use client"

import React, { useEffect } from 'react'
import LoginButton from './loginButton'
import { useSocketStore } from '@/lib/zustand/socketStore'

type Props = {}

const LandingPage = (props: Props) => {
    useEffect(() => useSocketStore.getState().setJoinedRoomId(""), [])
    return (
        <div className="flex flex-col items-center justify-center h-screen mx-auto">
            <h1 className="text-4xl font-bold">RoomPulse</h1>
            <p className="text-lg mt-2 mb-6">Real-time chat with your team</p>
            <LoginButton />
        </div>
    )
}

export default LandingPage