import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { Switch } from '../ui/switch'

type Props = {}

const PersonalPreferences = (props: Props) => {
    const [focusTime, setFocusTime] = useState<boolean>(false)

    return (
        <Card className='h-full hover:translate-y-0 hover:border-border hover:shadow-sm'>
            <CardHeader>
                <CardTitle>Personal Preferences</CardTitle>
            </CardHeader>
            <CardContent >
                <div className='w-full flex items-center justify-between gap-2'>
                    Focus
                    <Switch checked={focusTime} onCheckedChange={setFocusTime} color='secondary' />
                </div>
                <div>
                    Workin On
                    <Select>
                        <SelectTrigger color="secondary">
                            <SelectValue placeholder="Pick a reporisoty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="RoomPulse">RoomPulse</SelectItem>
                            <SelectItem value="Ritmo">Ritmo</SelectItem>
                            <SelectItem value="PulseBoard">PulseBoard</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    Category
                    <Select>
                        <SelectTrigger color="secondary">
                            <SelectValue placeholder="Pick a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Fullstack">Fullstack</SelectItem>
                            <SelectItem value="Frontend">Frontend</SelectItem>
                            <SelectItem value="Backend">Backend</SelectItem>
                            <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}

export default PersonalPreferences