import { Server, Socket } from "socket.io"
import { updateRoom } from "../lib/changeRoomDetails"
import { logMessage } from "../lib/logMessages"
import { system } from "../system"
import { onlineUsersPerRoom } from "../state/onlineUser"
import { on } from "events"


export const handleJoinRoom = async (
    io: Server,
    socket: Socket,
    { roomId, user }: { roomId: string; user: ProfileType }
) => {
    const previousRoomId = socket.data.roomId

    if (previousRoomId && previousRoomId !== roomId) {
        const leftAt = new Date()
        socket.leave(previousRoomId)
        if (previousRoomId && onlineUsersPerRoom[previousRoomId]?.has(user.username)) {

            onlineUsersPerRoom[previousRoomId].delete(user.username)

            if (onlineUsersPerRoom[roomId] && onlineUsersPerRoom[roomId].size === 0) {
                let updatedRoom = await updateRoom(roomId, { active: false, activeUsers: 0, roomCaptain: null })
                io.emit("room-updated", updatedRoom)
            }
            io.to(previousRoomId).emit("online-users", Array.from(onlineUsersPerRoom[previousRoomId]))

            io.to(previousRoomId).emit("chat-message", {
                roomId,
                user: { username: "system" },
                text: `${user.username} left the room`,
                leftAt,
                system: true
            })

            await logMessage({
                roomId,
                user: system.id,
                text: `${user.username} left the room`,
                createdAt: leftAt,
                system: true
            })

        }
        io.to(previousRoomId).emit("user-left", user)
    }

    socket.data.user = user
    socket.data.roomId = roomId
    socket.join(roomId)

    if (!onlineUsersPerRoom[roomId]) {
        onlineUsersPerRoom[roomId] = new Map()
    }
    const joinedAt = new Date()

    if (!onlineUsersPerRoom[roomId].has(user.username)) {
        onlineUsersPerRoom[roomId].set(user.username, user)

        io.to(roomId).emit("chat-message", {
            roomId,
            user: "system",
            text: `${user.username} joined the room`,
            joinedAt: joinedAt,
            system: true
        })


        await logMessage({
            roomId,
            user: system.id,
            text: `${user.username} joined the room`,
            createdAt: joinedAt,
            system: true
        })
    }
    if (onlineUsersPerRoom[roomId] && onlineUsersPerRoom[roomId].size > 0) {
        if (onlineUsersPerRoom[roomId].size === 1) {
            let updatedRoom = await updateRoom(roomId, { active: true, activeUsers: onlineUsersPerRoom[roomId].size, roomCaptain: user.id })
            io.to(roomId).emit("room-updated", updatedRoom)
            io.to(roomId).emit("captain-user", user.id)
        } else {
            let updatedRoom = await updateRoom(roomId, { active: true, activeUsers: onlineUsersPerRoom[roomId].size })
            io.to(roomId).emit("room-updated", updatedRoom)
        }

    }
    onlineUsersPerRoom[roomId] && io.to(roomId).emit("online-users", Array.from(onlineUsersPerRoom[roomId].values()))
}