import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            github: string
            username: string
            name: string
            bio: string | null
            location: string | null
            avatar: string
            company: string | null
            hireable: boolean | null
            isNewUser: boolean | null
        } & DefaultSession["user"]
    }

    interface User {
        github: string
        username: string
        name: string
        bio?: string
        location?: string
        avatar?: string
        company?: string
        hireable?: boolean
        isNewUser?: boolean
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        github: string
        username?: string
        name?: string
        bio?: string
        location?: string
        avatar?: string
        company?: string
        hireable?: boolean
    }
}
