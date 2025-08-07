"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Switch } from "../ui/switch"
import { MessageCircleMore, MessageCircleOff } from "lucide-react"

type Props = {
    userId: string
}

export function CreateRoomModal({ userId }: Props) {
    const [roomName, setRoomName] = useState("")
    const [targetCount, setTargetCount] = useState<number>(3)
    const [breakLength, setBreakLength] = useState<string>("5")
    const [chatVisible, setChatVisible] = useState<boolean>(true)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()


    const handleSubmit = async () => {
        if (!roomName.trim()) return
        if (!userId) {
            toast.error("User cannot found. Room couldn't be created.")
        }
        try {
            setLoading(true)
            const res = await fetch("/api/rooms", {
                method: "POST",
                body: JSON.stringify({
                    name: roomName,
                    creator: userId,
                    target: targetCount,
                    showChat: chatVisible,
                    breakDuration: Number(breakLength)
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            const data: RoomDBType = await res.json()
            router.push(`/rooms/${data.slug}`)
            setRoomName("")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button color="secondary" className="text-md font-semibold px-4 py-2">Create Room</Button>
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
                    <Input
                        label="Pomodoro Target"
                        type="number"
                        min={1}
                        max={10}
                        value={targetCount}
                        onChange={(e) => setTargetCount(Number(e.target.value))}
                        className='w-16'
                        inputSize="sm"
                    />
                    <div className="grid grid-cols-2 gap-5">
                        <div className='w-full text-sm font-medium flex items-center justify-between gap-2'>
                            Break Duration:
                            <Select value={breakLength} onValueChange={setBreakLength}>
                                <SelectTrigger className='max-w-fit'>
                                    <SelectValue placeholder="Pick one" className="font-normal" />
                                </SelectTrigger>
                                <SelectContent className="font-normal">
                                    <SelectItem value="5">5 min</SelectItem>
                                    <SelectItem value="10">10 min</SelectItem>
                                    <SelectItem value="15">15 min</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='w-full text-sm font-medium flex items-center justify-center gap-2'>
                            Show Chat:
                            <Switch
                                checked={chatVisible}
                                onCheckedChange={setChatVisible}
                                CheckIcon={MessageCircleMore}
                                UncheckIcon={MessageCircleOff}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button
                        onClick={() => setOpen(false)}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!roomName.trim() || loading}
                    >
                        {loading ? "Creating..." : "Create"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
