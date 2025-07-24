import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import { User, User2 } from 'lucide-react'

type Props = {
    activeUsers: string[]
}

const ActiveUserCard = (props: Props) => {
    return (
        <Card className='h-full hover:translate-y-0 hover:border-border hover:shadow-sm'>
            <CardHeader>
                <CardTitle>Active Users</CardTitle>
            </CardHeader>
            <CardContent className='p-0'>
                {
                    props.activeUsers.length > 0 &&
                    <div className='grid gap-2 w-full'>
                        {
                            props.activeUsers.map((u, index) =>
                                <div
                                    key={index}
                                    className={`flex px-2 w-full gap-2 items-center ${index / 2 === 0 ? "bg-primary/10 text-primary-dark" : "bg-secondary/10 text-secondary-dark"}`}
                                >
                                    {/* Profile Photo */}
                                    <div className='bg-secondary-dark-foreground text-secondary-dark p-2 rounded-full'>
                                        <User2 className='w-5 h-5' />
                                    </div>

                                    <div className='flex flex-col items-start'>
                                        <p>{u}</p>
                                        <p>Fullstack Developer</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                }
            </CardContent>
        </Card>
    )
}

export default ActiveUserCard