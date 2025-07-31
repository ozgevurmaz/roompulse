// components/CreateRoomModal.tsx
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useRoomsStore } from "@/lib/zustand/useRooms"
import { toast } from "react-toastify"

type Props = {
    user?: string
}

export function CreateRoomModal({ user }: Props) {
    const [roomName, setRoomName] = useState("")
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const { fetchRooms } = useRoomsStore()

    const handleSubmit = async () => {
        if (!roomName.trim()) return
        if(!user){
            toast.error("User cannot found. Room couldn't be created.")
        }
        try {
            setLoading(true)
            const res = await fetch("/api/rooms", {
                method: "POST",
                body: JSON.stringify({ name: roomName, creator: user }),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const data = await res.json()
            router.push(`/rooms/${data.slug}`)
            setRoomName("")
        } finally {
            setLoading(false)
            setOpen(false)
            fetchRooms();
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create Room</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create a New Room</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-2">
                    <Input
                        label="Room Name"
                        id="roomName"
                        placeholder="Enter room name"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <Button onClick={() => setOpen(false)} disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={!roomName.trim() || loading}>
                        {loading ? "Creating..." : "Create"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
