"use client"
import { ArrowLeft, MessageCircle, Users } from 'lucide-react'
import { Button } from '../ui/button'

type Props = {
    roomName: string,
    goBack: () => void,
    isConnected: boolean
    onlineUsers: number
}

const ChatHeader = (props: Props) => {

    return (
        <div className="h-[7vh] flex items-center justify-between px-8 py-2 bg-surface border-b border-border-focus">

            <Button
                color='none'
                className='group px-4'
                onClick={props.goBack}
            >
                <ArrowLeft className='w-4 h-4 group-hover:-translate-x-1 mr-2' /> Back
            </Button>

            <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">{props.roomName || "Room"}</h3>

                <div className={`
            w-2 h-2 rounded-full transition-colors duration-300
            ${props.isConnected ? 'bg-success' : 'bg-error'}
          `} />
            </div>
            {/* Online users count */}
            <div className="flex items-center gap-1 text-sm text-neutral-foreground">
                <Users className="w-4 h-4" />
                <span>{props.onlineUsers}</span>
            </div>
        </div>
    )
}

export default ChatHeader