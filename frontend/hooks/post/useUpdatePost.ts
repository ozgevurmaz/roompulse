"use client";

import { useProfileStore } from '@/lib/zustand/useProfileStore';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function useUpdateProfile(username: string) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const updateProfile = async (profileData: UpdateProfileData) => {
        setLoading(true);
        setSuccess(false);
        setError(null);

        try {
            const res = await fetch(`/api/user/${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Something went wrong');
                return;
            }

            useProfileStore.setState({
                name: data.name,
                bio: data.bio,
                location: data.location,
                company: data.company,
                hireable: data.hireable,
                socialLinks: data.socialLinks,
                github: data.github,
                email: data.email,
                avatar: data.avatar,
                username: data.username,
            })

            setSuccess(true);
        } catch (err: any) {
            toast.error("Profile updated failed")
            setError('Network error');
        } finally {
            toast.success("Profile updated successfully")
            setLoading(false);
        }
    };

    return { loading, updateProfile };
}
