"use client"

import { useProfileStore } from '@/lib/zustand/useProfileStore'
import React, { useEffect } from 'react'
import { FeatureCard } from '../ui/featuredCard'
import { Plus, User, Users } from 'lucide-react'
import { useSocketStore } from '@/lib/zustand/socketStore'

const LoggedInLanding = () => {
    const { name, username } = useProfileStore()

    useEffect(() => useSocketStore.getState().setJoinedRoomId(""), [])
    
    return (
        <div className='space-y-3 py-2 px-4'>
            <h1 className='text-2xl font-semibold'>Welcome back, {name.split(" ", 1) || username} 👋</h1>
            <p className='text-lg'>Ready to build something awesome today?</p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-5">
                <FeatureCard
                    title="Join a Room"
                    description="Work with others, pomodoro style"
                    href="/rooms"
                    icon={<Users className="w-5 h-5" />}
                />
                <FeatureCard
                    title="Create Room"
                    description="Start something new"
                    href="/rooms/new"
                    icon={<Plus className="w-5 h-5" />}
                />
                <FeatureCard
                    title="View Profile"
                    description="Your DevHive space"
                    href={`/profile/${username}`}
                    icon={<User className="w-5 h-5" />}
                />
            </div>
 


        </div>
    )
}

export default LoggedInLanding