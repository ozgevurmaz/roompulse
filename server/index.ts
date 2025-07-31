import express from "express"
import http from "http"
import { Server } from "socket.io"
import dotenv from "dotenv"
import { logMessage } from "./lib/logMessages"
dotenv.config()

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
      socket.leave(previousRoomId)
      if (onlineUsersPerRoom[previousRoomId].has(user.username)) {
        onlineUsersPerRoom[previousRoomId].delete(user.username)
      }
      io.to(previousRoomId).emit("user-left", user)
      io.to(previousRoomId).emit("online-users", Array.from(onlineUsersPerRoom[previousRoomId]))

      const leftAt = new Date()
      io.to(previousRoomId).emit("chat-message", {
        roomId,
        user: { username: "system" },
        text: `${user.username} joined the room`,
        leftAt,
        system: true
      })
      await logMessage({
        roomId,
        user: "system",
        text: `${user.username} left the room`,
        createdAt: leftAt,
        system: true
      })
    }

    socket.data.user = user
    socket.data.roomId = roomId

    socket.join(roomId)

    if (!onlineUsersPerRoom[roomId]) {
      onlineUsersPerRoom[roomId] = new Map()
    }
    onlineUsersPerRoom[roomId].set(user.username, user)
    io.to(roomId).emit("online-users", Array.from(onlineUsersPerRoom[roomId].values()))

    const joinedAt = new Date()
    io.to(roomId).emit("chat-message", {
      roomId,
      user: "system",
      text: `${user.username} joined the room`,
      joinedAt,
      system: true
    })
    await logMessage({
      roomId,
      user: "system",
      text: `${user.username} joined the room`,
      createdAt: joinedAt,
      system: true
    })
  })

  socket.on("user-left", async ({ user, roomId }: { user: ProfileType; roomId: string }) => {
    socket.leave(roomId)
    console.log("1")
    if (onlineUsersPerRoom[roomId].has(user.username)) {
      onlineUsersPerRoom[roomId].delete(user.username)
      console.log(onlineUsersPerRoom)
    }
    io.to(roomId).emit("online-users", Array.from(onlineUsersPerRoom[roomId].values()))
    console.log("Online map entries", onlineUsersPerRoom[roomId].values())
    console.log("2")
    const leftAt = new Date()
    io.to(roomId).emit("chat-message", {
      roomId,
      user: "system",
      text: `${user.username} left the room`,
      leftAt,
      system: true
    })
    await logMessage({
      roomId,
      user: "system",
      text: `${user.username} left the room`,
      createdAt: leftAt,
      system: true
    })
  })

  socket.on("chat-message", async ({ roomId, user, text }: { user: ProfileType; roomId: string; text: string }) => {
    const createdAt = new Date()
    io.to(roomId).emit("chat-message", { roomId, user:user.id, text, createdAt })

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
      logMessage({ roomId, user: "system", text: `${user.username} left the room`, system: true })
    }
  })
})

server.listen(4000, () => {
  console.log("✅ Socket server running on http://localhost:4000")
})
