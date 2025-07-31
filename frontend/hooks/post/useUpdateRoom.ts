"use client";

import { useState } from 'react';
import { toast } from 'react-toastify';

export function useUpdateRoom(slug: string) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const updateRoom = async (roomData: RoomType) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/rooms/${slug}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roomData),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Something went wrong');
                return;
            }

        } catch (err: any) {
            setError(new Error(err).message)
            toast.error(error? `Updated room error ${error}` : 'Updated room failed')
        } finally {
            toast.success("Room updated successfully")
            setLoading(false);
        }
    };

    return { loading, updateRoom };
}
