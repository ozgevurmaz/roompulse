"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const ChatSettings = () => {
    const [targetCount, setTargetCount] = useState<number>(3)
    const [chatVisible, setChatVisible] = useState<boolean>(true)
    const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true)
    const [breakLength, setBreakLength] = useState<string>("5")

    return (
        <Card className='h-full hover:translate-y-0 hover:border-border hover:shadow-sm'>
            <CardHeader>
                <CardTitle>Card Settings</CardTitle>
            </CardHeader>
            <CardContent className='flex items-start gap-1 text-sm w-full'>
                <div className='w-full flex items-center justify-between gap-2'>
                    Pomodoro Target:
                    <Input
                        type="number"
                        min={1}
                        max={12}
                        value={targetCount}
                        onChange={() => setTargetCount}
                        className='w-16'
                        inputSize="sm"
                    />
                </div>
                <div className='w-full flex items-center justify-between gap-2'>
                    Show Chat:
                    <Switch checked={chatVisible} onCheckedChange={setChatVisible} />
                </div>

                <div className='w-full flex items-center justify-between gap-2'>
                    Break Duration:
                    <Select value={breakLength} onValueChange={setBreakLength}>
                        <SelectTrigger className='max-w-fit'>
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