import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import { MessageCircle, User, User2 } from 'lucide-react'
import ProfilePhoto from '../ui/profilePhoto'

type Props = {
    activeUsers: ProfileSocketType[]
    roomName?: string
    roomId?: string
    isConnected: boolean
    currentUser: string
}

const ActiveUserCard = (props: Props) => {
    return (
        <Card className='h-full hover:translate-y-0 hover:border-border hover:shadow-sm gap-1'>
            <CardHeader className='border-b border-primart-dark'>
                <CardTitle className="flex items-center gap-2 text-xl   ">
                    <MessageCircle className="w-5 h-5" />
                    {props.roomName || "Room"}
                    <div className={`w-2 h-2 rounded-full ${props.isConnected ? "bg-success" : "bg-error"}`} />
                </CardTitle>
                <CardDescription className='text-sm text-primary-foreground'>
                    <span className='text-secondary'>Active Users:  </span>
                    <span className='ml-2 text-xs'>{props.activeUsers.length}</span>
                </CardDescription>
            </CardHeader>
            <CardContent className='p-0'>
                {
                    props.activeUsers.length > 0 &&
                    <div className='grid gap-2 w-full'>
                        {
                            props.activeUsers.map((u, index) =>

                                <div
                                    key={index}
                                    className={`flex px-2 py-1 w-full gap-2 items-center ${index / 2 === 0 ? "bg-primary/10 text-primary-dark" : "bg-secondary/10 text-secondary-dark"}`}
                                >
                                    {/* Profile Photo */}
                                    <ProfilePhoto imageUrl={u.avatar} size="md" />

                                    <div className='flex flex-col items-start'>
                                        <p className='font-semibold'>{u.username}</p>
                                        <small>{u.title} {u.company && <>| {u.company}</>}</small>
                                    </div>
                                </div>)


                        }
                    </div>

                }
            </CardContent>
        </Card>
    )
}

export default ActiveUserCard