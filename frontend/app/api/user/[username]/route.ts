import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongoDB'
import UserProfile from '@/lib/models/userProfile'

export async function GET(
    req: Request,
    { params }: { params: Promise<{ username: string }> }
) {
    const { username } = await params
    try {
        await connectToDatabase()
        const profile = await UserProfile.findOne({ username: username })

        if (!profile) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
        }
        return NextResponse.json(profile)
    } catch (error) {
        console.error('Profile fetch error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ username: string }> }
) {
    const { username } = await params
    try {
        const profileData = await req.json()
        await connectToDatabase()

        const updatedProfile = await UserProfile.findOneAndUpdate(
            { username: username },
            profileData,
            { new: true, runValidators: true }
        )

        if (!updatedProfile) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
        }

        return NextResponse.json(updatedProfile)
    } catch (error) {
        console.error('Profile update error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}