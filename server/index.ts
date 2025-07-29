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

const onlineUsersPerRoom: Record<string, Set<string>> = {}

io.on("connection", (socket) => {
  socket.on("join-room", async ({ roomId, user }) => {
    const previousRoomId = socket.data.roomId

    if (previousRoomId && previousRoomId !== roomId) {
      socket.leave(previousRoomId)
      onlineUsersPerRoom[previousRoomId]?.delete(user)
      io.to(previousRoomId).emit("user-left", user)
      io.to(previousRoomId).emit("online-users", Array.from(onlineUsersPerRoom[previousRoomId] ?? []))

      const leftAt = new Date()
      io.to(previousRoomId).emit("chat-message", {
        roomId,
        user: "system",
        text: `${user} joined the room`,
        leftAt,
        system: true
      })
      await logMessage({
        roomId,
        user: "system",
        text: `${user} left the room`,
        createdAt: leftAt,
        system: true
      })
    }

    socket.data.username = user
    socket.data.roomId = roomId

    socket.join(roomId)

    if (!onlineUsersPerRoom[roomId]) {
      onlineUsersPerRoom[roomId] = new Set()
    }
    onlineUsersPerRoom[roomId].add(user)

    io.to(roomId).emit("online-users", Array.from(onlineUsersPerRoom[roomId]))
    const joinedAt = new Date()
    io.to(roomId).emit("chat-message", {
      roomId,
      user: "system",
      text: `${user} joined the room`,
      joinedAt,
      system: true
    })
    await logMessage({
      roomId,
      user: "system",
      text: `${user} joined the room`,
      createdAt: joinedAt,
      system: true
    })
  })

  socket.on("user-left", async ({ user, roomId }) => {
    socket.leave(roomId)
    onlineUsersPerRoom[roomId]?.delete(user)
    io.to(roomId).emit("online-users", Array.from(onlineUsersPerRoom[roomId] ?? []))
    const leftAt = new Date()
    io.to(roomId).emit("chat-message", {
      roomId,
      user: "system",
      text: `${user} left the room`,
      leftAt,
      system: true
    })
    await logMessage({
      roomId,
      user: "system",
      text: `${user} left the room`,
      createdAt: leftAt,
      system: true
    })
  })

  socket.on("chat-message", async ({ roomId, user, text }) => {
    const createdAt = new Date()
    io.to(roomId).emit("chat-message", { roomId, user, text, createdAt })

    await logMessage({ roomId, user, text, createdAt })
  })

  socket.on("typing", ({ roomId, user }) => {
    socket.to(roomId).emit("typing", { roomId, user })
  })

  socket.on("stop-typing", ({ roomId, user }) => {
    socket.to(roomId).emit("stop-typing", { roomId, user })
  })

  socket.on("disconnect", () => {
    const user = socket.data.username
    const roomId = socket.data.roomId

    if (user && roomId) {
      socket.leave(roomId)
      io.to(roomId).emit("user-left", user)
      io.to(roomId).emit("stop-typing", { roomId, user })
      io.to(roomId).emit("online-users", Array.from(onlineUsersPerRoom[roomId] ?? []))
      logMessage({ roomId, user: "system", text: `${user} left the room`, system: true })
    }
  })
})

server.listen(4000, () => {
  console.log("✅ Socket server running on http://localhost:4000")
})
