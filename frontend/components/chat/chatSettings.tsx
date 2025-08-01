"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { MessageCircleMore, MessageCircleOff, Save } from 'lucide-react'
import { useUpdateRoom } from '@/hooks/post/useUpdateRoom'
import { Button } from '../ui/button'

interface Props {
    slug: string
    room: RoomDBType
}

const ChatSettings = ({ slug, room }: Props) => {
    const [targetCount, setTargetCount] = useState<number>(3)
    const [chatVisible, setChatVisible] = useState<boolean>(true)
    const [breakLength, setBreakLength] = useState<string>("5")

    const { updateRoom } = useUpdateRoom(slug)

    useEffect(() => {
        setTargetCount(room.target || 3)
        setChatVisible(room.showChat || false)
        setBreakLength(room.breakDuration?.toString() || "5")
    }, [])

    const handleSave = () => {
        const updatedRoom = {
            ...room,
            target: targetCount,
            showChat: chatVisible,
            breakDuration: Number(breakLength)
        }
        updateRoom(updatedRoom)
    }

    return (
        <Card className='h-full hover:translate-y-0 hover:border-border hover:shadow-sm gap-3'>
            <CardHeader className='flex justify-between pb-0'>
                <CardTitle>Chat Settings</CardTitle>
                <Button
                    onClick={handleSave}
                    color='secondary'
                >
                    <Save className="w-4 h-4 mr-1" />
                    Save
                </Button>
            </CardHeader>
            <CardContent className='flex flex-col gap-3 w-full items-start'>
                <Input
                    label="Pomodoro Target"
                    type="number"
                    min={1}
                    max={10}
                    value={targetCount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTargetCount(Number(e.target.value))}
                    inputSize="sm"
                    color='secondary'
                />

                <div className='flex w-full items-center justify-between gap-2'>
                    <span className='text-sm font-medium'>
                        Show Chat During Focus:
                    </span>
                    <Switch
                        color='secondary'
                        checked={chatVisible}
                        onCheckedChange={setChatVisible}
                        CheckIcon={MessageCircleMore}
                        UncheckIcon={MessageCircleOff}
                    />
                </div>

                <div className='flex flex-col gap-1 w-full'>
                    <span className='text-sm font-medium'>
                        Break Duration:
                    </span>
                    <Select value={breakLength} onValueChange={setBreakLength} >
                        <SelectTrigger color='secondary'>
                            <SelectValue placeholder="Pick one" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="5">5 min</SelectItem>
                            <SelectItem value="10">10 min</SelectItem>
                            <SelectItem value="15">15 min</SelectItem>
                        </SelectContent>
                    </Select>
                </div>


            </CardContent>
        </Card>
    )
}

export default ChatSettings