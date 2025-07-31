interface userProfile {
    id: string
    userId: string;
    username: string;
    title?: string;
    github?: string;
    name: string;
    email: string;
    bio: string;
    avatar: string;
    location: string;
    company: string;
    hireable: boolean;
    socialLinks?: string[];
    createdAt: Date;
    updatedAt: Date;
}

type UpdateProfileData = Omit<userProfile, 'userId' | 'avatar' | 'username' | 'email' | 'createdAt' | 'updatedAt'>
type ProfileDataType = Omit<userProfile, 'userId' | 'createdAt' | 'updatedAt'>

type ProfileSocketType = Pick<userProfile, 'username' | 'title' | 'avatar' | 'company' | "id">