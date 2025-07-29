import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface userProfileActions {
    setProfile: (data: Partial<ProfileDataType>) => void
    resetProfile: () => void
}

export const useProfileStore = create<ProfileDataType & userProfileActions>()(
    persist(
        (set) => ({
            username: '',
            github: '',
            name: '',
            email: '',
            bio: '',
            avatar: '',
            location: '',
            company: '',
            hireable: false,
            socialLinks: [],
            setProfile: (data) => set((state) => ({ ...state, ...data })),
            resetProfile: () =>
                set(() => ({
                    username: '',
                    github: '',
                    name: '',
                    email: '',
                    bio: '',
                    avatar: '',
                    location: '',
                    company: '',
                    hireable: false,
                    socialLinks: [],
                })),

        }), {
        name: 'dev-hive-profile-store',
    })
)