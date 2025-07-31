import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface userProfileActions {
    setProfile: (data: Partial<ProfileDataType>) => void
    resetProfile: () => void
}

export const useProfileStore = create<ProfileDataType & userProfileActions>()(
    persist(
        (set) => ({
            id: '',
            username: '',
            github: '',
            title: '',
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
                    id: '',
                    username: '',
                    github: '',
                    name: '',
                    title: '',
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