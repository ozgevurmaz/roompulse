import { formatTime } from '@/lib/utils';
import { Users, Clock } from 'lucide-react';
import React from 'react'
import ProfilePhoto from '../ui/profilePhoto';

type Props = {
    message: MessageType;
    index: number
    user: string
}

const MessageItem = (props: Props) => {

    const isSystemMessage = props.message.system
    const isOwnMessage = props.message.user.id === props.user

    if (isSystemMessage) {
        return (
            <div className="flex justify-center my-2">
                <div className="bg-neutral text-neutral-foreground px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {props.message.text}
                </div>
            </div>
        )
    }

    return (
        <div className={`flex mb-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] flex items-end gap-1 ${isOwnMessage ? 'order-2' : 'order-1'}`}>

                {/* Message bubble */}
                <div className={`py-1 px-2 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md relative group border-border
            ${isOwnMessage
                        ? 'bg-chat-own text-foreground  rounded-br-none'
                        : 'bg-chat-bubble text-foreground rounded-bl-none border'
                    }
          `}>

                    {/* User name (only for others' messages) */}
                    {!isOwnMessage && (
                        <span className='text-xs flex gap-1 font-semibold items-start justify-center'>
                            <ProfilePhoto imageUrl={props.message.user.avatar} size='sm' />
                            {props.message.user.username}
                        </span>
                    )}

                    <p className="text-md leading-relaxed break-words">{props.message.text}</p>

                    {/* Timestamp */}
                    <div className={`hidden group-hover:flex absolute scale-70 text-xs items-center gap-1 mt-2 -bottom-4 ${isOwnMessage ? 'text-primary-foreground/70 justify-end right-0' : 'text-neutral-foreground left-0'
                        }`}>
                        <Clock className="w-3 h-3" />
                        {formatTime(props.message.createdAt)}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default MessageItem