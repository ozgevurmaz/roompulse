import express from "express"
import http from "http"
import { Server } from "socket.io"
import dotenv from "dotenv"
import { logMessage } from "./lib/logMessages"
dotenv.config()

const system: ProfileType = {
  username: "System",
  id: "688c91e9f80d9d333ea3f07d",
  avatar: "system",
}

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.NEXT_PUBLIC_SITE_URL,
    methods: ["GET", "POST"]
  }
})
const onlineUsersPerRoom: Record<string, Map<string, ProfileType>> = {}

io.on("connection", (socket) => {
  socket.on("join-room", async ({ roomId, user }: { roomId: string, user: ProfileType }) => {
    const previousRoomId = socket.data.roomId

    if (previousRoomId && previousRoomId !== roomId) {
      const leftAt = new Date()
      socket.leave(previousRoomId)
      if (previousRoomId && onlineUsersPerRoom[previousRoomId]?.has(user.username)) {

        onlineUsersPerRoom[previousRoomId].delete(user.username)

        io.to(previousRoomId).emit("chat-message", {
          roomId,
          user: { username: "system" },
          text: `${user.username} joined the room`,
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
      io.to(previousRoomId).emit("online-users", Array.from(onlineUsersPerRoom[previousRoomId]))
    }

    socket.data.user = user
    socket.data.roomId = roomId

    socket.join(roomId)
    const joinedAt = new Date()
    if (!onlineUsersPerRoom[roomId]) {
      onlineUsersPerRoom[roomId] = new Map()
    }
    if (roomId && !onlineUsersPerRoom[roomId]?.has(user.username)) {
      onlineUsersPerRoom[roomId].set(user.username, user)

      io.to(roomId).emit("chat-message", {
        roomId,
        user: "system",
        text: `${user.username} joined the room`,
        joinedAt,
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

    io.to(roomId).emit("online-users", Array.from(onlineUsersPerRoom[roomId].values()))
  })

  socket.on("user-left", async ({ user, roomId }: { user: ProfileType; roomId: string }) => {
    socket.leave(roomId)
    const leftAt = new Date()
    if (roomId && onlineUsersPerRoom[roomId]?.has(user.username)) {
      onlineUsersPerRoom[roomId]!.delete(user.username)

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
    io.to(roomId).emit("online-users", Array.from(onlineUsersPerRoom[roomId].values()))
  })

  socket.on("chat-message", async ({ roomId, user, text }: { user: ProfileType; roomId: string; text: string }) => {
    const createdAt = new Date()
    io.to(roomId).emit("chat-message", { roomId, user: user, text, createdAt })

    await logMessage({ roomId, user: user.id, text, createdAt })
  })

  socket.on("typing", ({ roomId, user }: { user: ProfileType; roomId: string }) => {
    socket.to(roomId).emit("typing", { roomId, user })
  })

  socket.on("stop-typing", ({ roomId, user }: { user: ProfileType; roomId: string }) => {
    socket.to(roomId).emit("stop-typing", { roomId, user })
  })

  socket.on("disconnect", () => {
    const user = socket.data.user
    const roomId = socket.data.roomId

    if (user && roomId) {
      socket.leave(roomId)
      io.to(roomId).emit("user-left", user)
      io.to(roomId).emit("stop-typing", { roomId, user })
      io.to(roomId).emit("online-users", Array.from(onlineUsersPerRoom[roomId].values()))
      logMessage({ roomId, user: system.id, text: `${user.username} left the room`, system: true })
    }
  })
})

server.listen(4000, () => {
  console.log("✅ Socket server running on http://localhost:4000")
})
