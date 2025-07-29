import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongoDB'
import UserProfile from '@/lib/models/userProfile'
import { auth } from '@/lib/auth/auth'

export async function GET() {
    try {
        const session = await auth()
        
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        await connectToDatabase()
        
        const userProfile = await UserProfile.findOne({ userId: session.user.id })
        
        if (!userProfile) {
            return NextResponse.json({ isNew: true })
        }

        const hasIncompleteProfile = !userProfile.bio || 
                                   !userProfile.location || 
                                   userProfile.socialLinks.length === 0

        const isRecentlyCreated = userProfile.createdAt && 
                                (Date.now() - new Date(userProfile.createdAt).getTime()) < 10 * 60 * 1000

        const hasCompletedOnboarding = userProfile.onboardingCompleted || false

        const isNew = !hasCompletedOnboarding || hasIncompleteProfile || isRecentlyCreated

        return NextResponse.json({ 
            isNew,
            user: userProfile 
        })
        
    } catch (error) {
        console.error('Error checking user status:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}