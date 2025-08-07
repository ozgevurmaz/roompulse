import { Server, Socket } from "socket.io"
import { logMessage } from "../lib/logMessages"
import { system } from "../system"
import { onlineUsersPerRoom } from "../state/onlineUser"
import { updateRoom } from "../lib/changeRoomDetails"
import Room from "../lib/models/room"
import { RoomDBType } from "../types/room"
import { ObjectId } from "mongodb"

export const handleLeaveRoom = async (
    io: Server,
    socket: Socket,
    { roomId, user }: { roomId: string; user: ProfileType }
) => {
    socket.leave(roomId)
    const leftAt = new Date()
    if (roomId && onlineUsersPerRoom[roomId]?.has(user.username)) {
        onlineUsersPerRoom[roomId]!.delete(user.username)

        const roomUsers = onlineUsersPerRoom[roomId]
        let updatedRoom: RoomDBType | null = null

        const userLeftIsCaptain = user.id === (await Room.findById(roomId))?.roomCaptain.toString() || false

        if (roomUsers.size === 0) {
            updatedRoom = await updateRoom(roomId, {
                active: false,
                activeUsers: 0,
                roomCaptain: null,
            })
        } else {
            if (userLeftIsCaptain) {
                const newCaptain = Array.from(roomUsers.values())[0] || null
                const newCaptainId = newCaptain?.id || null

                updatedRoom = await updateRoom(roomId, {
                    activeUsers: roomUsers.size,
                    roomCaptain: newCaptainId ? new ObjectId(newCaptainId) : null,
                })

                io.to(roomId).emit("captain-user", newCaptainId)
            } else {
                updatedRoom = await updateRoom(roomId, {
                    activeUsers: roomUsers.size,
                })
            }
        }

        io.emit("room-updated", updatedRoom)
        io.to(roomId).emit("online-users", Array.from(onlineUsersPerRoom[roomId]))


        io.to(roomId).emit("chat-message", {
            roomId,
            user: "system",
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

    onlineUsersPerRoom[roomId] && io.to(roomId).emit("online-users", Array.from(onlineUsersPerRoom[roomId].values()))
   }