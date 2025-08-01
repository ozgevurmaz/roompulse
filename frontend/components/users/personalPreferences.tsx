import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select'
import { SelectValue } from '@radix-ui/react-select'
import { Switch } from '../ui/switch'
import { Bell, BellOff, MessageCircleMore, MessageCircleOff, Save } from 'lucide-react'
import { Button } from '../ui/button'

type Props = {}

const PersonalPreferences = (props: Props) => {
    const [focusTime, setFocusTime] = useState<boolean>(false)
    const [chatVisible, setChatVisible] = useState<boolean>(true)

    const handleSave = () => {

    }

    return (
        <Card className='h-full hover:translate-y-0 hover:border-border hover:shadow-sm'>

            <CardHeader className='flex justify-between pb-0'>
                <CardTitle>Personal Preferences</CardTitle>
                <Button
                    onClick={handleSave}
                    color='secondary'
                >
                    <Save className="w-4 h-4 mr-1" />
                    Save
                </Button>
            </CardHeader>
            <CardContent >
                <div className='w-full text-sm font-medium flex items-center justify-between gap-2'>
                    Silent Mode
                    <Switch
                        CheckIcon={BellOff}
                        UncheckIcon={Bell}
                        checked={focusTime}
                        onCheckedChange={setFocusTime}
                        color='secondary'
                    />
                </div>
                <div>
                    <span className='text-sm font-medium'>
                        Workin On
                    </span>
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
                    <span className='text-sm font-medium'>
                        Category
                    </span>
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