"use client"

import { connectSocket } from '@/lib/socket'
import { formatTypingUsers } from '@/lib/utils'
import { useStore } from '@/lib/zustand/store'
import { MessageCircle, Send } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import MessageItem from './messageItem'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card } from '../ui/Card'

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
    const username = useStore((s) => s.username)
    const [message, setMessage] = useState<string>("")
    const [chat, setChat] = useState<MessageType[]>([])
    const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set())
    const [onlineUsers, setOnlineUsers] = useState<string[]>([])

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
        if (!username || !roomId || !enable) return

        const messageListener = ({ user, text, roomId: incomingRoomId, createdAt, system }: MessageSocketType) => {
            if (roomId !== incomingRoomId) return
            setChat((prev) => [...prev, { user, text, createdAt, system: !!system }])
        }

        const typingListener = ({ user, roomId: incomingRoomId }: { user: string; roomId: string }) => {
            if (roomId === incomingRoomId && user !== username) {
                setTypingUsers(prev => new Set(prev).add(user))
            }
        }

        const stopTypingListener = ({ roomId: incomingRoomId, user }: { roomId: string, user: string }) => {
            if (roomId === incomingRoomId && user !== username) {
                setTypingUsers(prev => {
                    const updated = new Set(prev)
                    updated.delete(user)
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
    }, [roomId, username])


    useEffect(() => {
        alreadyJoinedRef.current = false
    }, [roomId])

    const send = () => {
        if (message.trim()) {
            socket.emit("chat-message", {
                roomId: roomId,
                user: username,
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
        socket.emit("typing", { roomId: roomId, user: username })

        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current)
        }

        typingTimeout.current = setTimeout(() => {
            socket.emit("stop-typing", { roomId: roomId, user: username })
            typingTimeout.current = null
        }, 1000)
    }

    return (
        <Card className="relative w-full h-full pt-0.5 bg-surface flex flex-col justify-between overflow-hidden rounded-xl shadow-md px-2 py-1">

            <div
                className="flex-1 overflow-y-auto p-2 pb-0 rounded-xl scrollbar-thin scrollbar-thumb-border-hover scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/30 transition-all duration-300"
                style={{ scrollBehavior: "smooth" }}
            >
                {chat.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-neutral-foreground">
                        <MessageCircle className="w-12 h-12 mb-3 opacity-50" />
                        <p className="text-xs mt-1">Send first message and start conversation!</p>
                    </div>
                ) : (
                    chat.map((m, i) => (
                        <MessageItem key={i} message={m} index={i} username={username} />
                    ))
                )}

                {/* Typing indicator */}
                {typingUsers.size > 0 && (
                    <div className="absolude b-2">
                        <div className="bg-neutral/30 text-neutral-foreground px-4 py-2 rounded-2xl rounded-bl-md text-xs flex items-center gap-2 animate-pulse">
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></div>
                            </div>
                            <span>{formatTypingUsers([...typingUsers])}</span>
                        </div>
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            <div className="w-full bg-surface pb-2 z-10 flex gap-3 items-end px-4">
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