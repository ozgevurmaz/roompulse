import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { connectToDatabase } from "../mongoDB"
import UserSettings from "../models/userSetting"
import UserProfile from "../models/userProfile"
import type { GitHubProfile } from "next-auth/providers/github"

export const authOptions = [
    GitHub({
        clientId: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        profile(profile) {
            return {
                id: profile.id.toString(),
                name: profile.name ?? "",
                email: profile.email,
                image: profile.avatar_url,
                username: profile.login,
                bio: profile.bio ?? "",
                location: profile.location ?? "",
                github: profile.html_url,
                hireable: profile.hireable ?? false,
                company: profile.company ?? "",
            }
        }
    })]

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: authOptions,
    callbacks: {
        async jwt({ token, profile, trigger }) {
            if (profile) {
                const githubProfile = profile as unknown as GitHubProfile
                token.username = githubProfile.login
                token.bio = githubProfile.bio ?? ""
                token.github = githubProfile.html_url
                token.location = githubProfile.location ?? ""
                token.hireable = githubProfile.hireable ?? false
                token.company = githubProfile.company ?? ""
            }
            return token
        },
        async session({ session, token }) {
            session.user.username = token.username as string
            session.user.bio = token.bio as string
            session.user.github = token.github as string
            session.user.location = token.location as string
            session.user.hireable = token.hireable as boolean
            session.user.company = token.company as string
            return session
        },
        async signIn({ user, profile }) {
            try {
                const db = await connectToDatabase()

                const existing = await UserProfile.findOne({ userId: user.id })

                if (!existing) {
                    // Create new user profile
                    await UserProfile.create({
                        userId: user.id,
                        github: profile?.html_url,
                        name: profile?.name ?? "",
                        username: profile?.login,
                        bio: profile?.bio ?? "",
                        avatar: profile?.image,
                        location: profile?.location ?? "",
                        company: profile?.company ?? "",
                        hireable: profile?.hireable ?? false,
                        socialLinks: [],
                    })

                    await UserSettings.create({
                        userId: user.id,
                        theme: "light",
                        language: "en",
                        notificationsEnabled: true,
                    })

                    // Mark user as new for redirect handling
                    user.isNewUser = true
                } else {
                    // Mark user as existing
                    user.isNewUser = false
                }

                return true
            } catch (error) {
                console.error("Error during sign in:", error)
                return false
            }
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },
    pages: {
        signIn: '/auth/signin',
    },
    events: {
        async signIn({ user, isNewUser }) {
            console.log(`User ${user.email} signed in. New user: ${isNewUser}`)
        }
    }
})