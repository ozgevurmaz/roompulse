import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongoDB'
import UserProfile from '@/lib/models/userProfile'
import { auth } from '@/lib/auth/auth'

export async function GET(request: NextRequest) {
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

        const isIncomplete = !userProfile.bio || 
                           !userProfile.location || 
                           userProfile.socialLinks.length === 0

        const createdRecently = userProfile.createdAt && 
                               (Date.now() - userProfile.createdAt.getTime()) < 5 * 60 * 1000

        return NextResponse.json({ 
            isNew: isIncomplete || createdRecently 
        })
        
    } catch (error) {
        console.error('Error checking user status:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}