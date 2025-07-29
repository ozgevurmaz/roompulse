import image from 'next/image'
import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/Card'
import ProfilePhoto from '../ui/profilePhoto'

type Props = {
    image: string | null
    children: React.ReactNode
    headerChildren?: React.ReactNode
}

const ProfileCard = (props: Props) => {
    return (
        <div className="min-h-max py-2 px-4 m-auto w-full">
            <Card className="max-w-7xl mx-auto min-h-full p-6 overflow-hidden shadow-lg border-0 bg-surface backdrop-blur-sm relative">
                <CardHeader >
                    <div className="h-32 absolute bg-linear-to-r from-primary to-secondary top-0     left-0 right-0">
                        <div className="absolute inset-0 bg-black/10">{ }</div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end gap-6 z-10 mt-12">
                        <div className="relative">
                            <ProfilePhoto
                                imageUrl={props.image || null}
                                size="lg"
                            />
                            <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-background"></div>
                        </div>

                        {props.headerChildren && props.headerChildren}

                    </div>

                </CardHeader>
                <CardContent>
                    {props.children}
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfileCard