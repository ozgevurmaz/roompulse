"use client"

import { connectSocket } from '@/lib/socket'
import { formatTypingUsers } from '@/lib/utils'
import { MessageCircle, Send } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import MessageItem from './messageItem'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card } from '../ui/Card'
import { useProfileStore } from '@/lib/zustand/useProfileStore'

const socket = connectSocket()

const ChatBox = (
    {
        roomId,
        enable,
        isConnected
    }
        :
        {
            roomId: string,
            enable: boolean,
            isConnected: boolean
        }) => {
    const { id, username, title, company, avatar } = useProfileStore()

    const user: ProfileSocketType = { id, username, title, company, avatar }
    const [message, setMessage] = useState<string>("")
    const [chat, setChat] = useState<MessageType[]>([])
    const [typingUsers, setTypingUsers] = useState<Map<string, ProfileSocketType>>(new Map())


    const chatEndRef = useRef<HTMLDivElement>(null)
    const typingTimeout = useRef<NodeJS.Timeout | null>(null)
    const messageInputRef = useRef<HTMLInputElement>(null)
    const alreadyJoinedRef = useRef(false)

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [chat])

    useEffect(() => {
        const getHistory = async () => {
            const res = await fetch(`/api/messages?roomId=${roomId}`)
            const data: MessageType[] = await res.json()
            setChat(data)
        }
        getHistory()
    }
        , [roomId])

    useEffect(() => {
        if (!user || !roomId || !enable) return

        const messageListener = ({ user, text, roomId: incomingRoomId, createdAt, system }: MessageSocketType) => {
            if (roomId !== incomingRoomId) return
            setChat((prev) => [...prev, { user, text, createdAt, system: !!system }])
        }

        const typingListener = ({ user, roomId: incomingRoomId }: { user: ProfileSocketType; roomId: string }) => {
            if (roomId === incomingRoomId && user.username !== username) {
                setTypingUsers(prev => {
                    const updated = new Map(prev)
                    updated.set(user.username, user)
                    return updated
                })
            }
        }

        const stopTypingListener = ({ roomId: incomingRoomId, user }: { roomId: string, user: ProfileSocketType }) => {
            if (roomId === incomingRoomId && user.username !== username) {
                setTypingUsers(prev => {
                    const updated = new Map(prev)
                    updated.delete(user.username)
                    return updated
                })
            }
        }

        socket.on("chat-message", messageListener)
        socket.on("typing", typingListener)
        socket.on("stop-typing", stopTypingListener)

        return () => {
            socket.off("chat-message", messageListener)
            socket.off("typing", typingListener)
            socket.off("stop-typing", stopTypingListener)
        }
    }, [roomId, user])


    useEffect(() => {
        alreadyJoinedRef.current = false
    }, [roomId])

    const send = () => {
        if (message.trim()) {
            socket.emit("chat-message", {
                roomId: roomId,
                user: user,
                text: message,
            })
            setMessage("")
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            send()
        }
    }

    const handleTyping = () => {
        socket.emit("typing", { roomId: roomId, user: user })

        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current)
        }

        typingTimeout.current = setTimeout(() => {
            socket.emit("stop-typing", { roomId: roomId, user: user })
            typingTimeout.current = null
        }, 1000)
    }

    return (
        <Card className="relative w-full h-full pt-0.5 bg-surface flex flex-col justify-between gap-0 overflow-hidden rounded-xl shadow-md px-2 py-1">

            <div
                className="relative flex-1 overflow-y-auto p-2 pb-1 rounded-xl scrollbar-thin scrollbar-thumb-border-hover scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/30 transition-all duration-300"
                style={{ scrollBehavior: "smooth" }}
            >
                {chat.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-neutral-foreground">
                        <MessageCircle className="w-12 h-12 mb-3 opacity-50" />
                        <p className="text-xs mt-1">Send first message and start conversation!</p>
                    </div>
                ) : (
                    chat.map((m, i) => (
                        <MessageItem key={i} message={m} index={i} userId={user.id} />
                    ))
                )}
                <div ref={chatEndRef} />
            </div>

            <div className="relative w-full bg-surface pb-2 pt-5 z-10 flex gap-3 items-end px-4">
                {/* Typing indicator */}
                {typingUsers.size > 0 && (
                    <div className="absolute top-0 flex flex-row-reverse items-center gap-0.5 animate-pulse">
                        <div className="flex gap-0.5 pt-1.5">
                            <div className="w-0.5 h-0.5 bg-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-0.5 h-0.5 bg-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-0.5 h-0.5 bg-foreground rounded-full animate-bounce"></div>
                        </div>
                        <small>
                            {formatTypingUsers(Array.from(typingUsers.values()))}
                        </small>
                    </div>
                )}
                <div className="flex-1">
                    <Input
                        ref={messageInputRef}
                        placeholder="Type something..."
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value)
                            handleTyping()
                        }}
                        disabled={!isConnected || !enable}
                        color="primary"
                        type="text"
                        onKeyDown={handleKeyPress}
                    />
                </div>

                <Button
                    onClick={send}
                    disabled={!message.trim() || !isConnected || !username || !enable}
                    color="primary"
                    className='h-fill'
                >
                    <Send className="w-5 h-5" />
                </Button>

            </div>

        </Card>
    )
}

export default ChatBox