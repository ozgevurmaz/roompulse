import { Server, Socket } from "socket.io"
import { logMessage } from "../lib/logMessages"
import { system } from "../system"
import { onlineUsersPerRoom } from "../state/onlineUser"
import { updateRoom } from "../lib/changeRoomDetails"


export const handleDisconnect = async (
    io: Server,
    socket: Socket,
) => {
    const user = socket.data.user
    const roomId = socket.data.roomId

    if (user && roomId) {
        socket.leave(roomId)
        io.to(roomId).emit("user-left", user)
        io.to(roomId).emit("stop-typing", { roomId, user })
        io.to(roomId).emit("online-users", Array.from(onlineUsersPerRoom[roomId].values()))
        logMessage({ roomId, user: system.id, text: `${user.username} left the room`, system: true })
        if (onlineUsersPerRoom[roomId] && onlineUsersPerRoom[roomId].size === 0) {
            let updatedRoom = await updateRoom(roomId, { active: false, activeUsers: 0, roomCaptain: null })
            io.emit("room-updated", updatedRoom)
        }

    }
}