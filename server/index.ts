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

io.on("connection", (socket) => {
  if (process.env.NODE_ENV === "development") {
    console.log("Client connected:", socket.id)
  }

  socket.on("join-room", ({ roomId, user }) => {
    socket.data.username = user
    socket.data.roomId = roomId
    socket.join(roomId)
    if (process.env.NODE_ENV === "development") {
      console.log(`${socket.id} joined room: ${roomId}`)
    }
    logMessage({ roomId, user: " ", text: `${user} joined the room`, system: true })
    io.to(roomId).emit("user-joined", user)
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
      socket.to(roomId).emit("user-left", user)
      socket.to(roomId).emit("stop-typing", { roomId, user })
      logMessage({ roomId, user: " ", text: `${user} left the room`, system: true })
      if (process.env.NODE_ENV === "development") {
        console.log(`👋 ${user} left room: ${roomId}`)
      }
    }
  })
})

server.listen(4000, () => {
  console.log("✅ Socket server running on http://localhost:4000")
})
