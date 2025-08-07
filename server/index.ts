import express from "express"
import http from "http"

import { Server } from "socket.io"
import { registerSocketHandlers } from "./socketServer"
import { connectToDatabase } from "./lib/mongoDB"

import dotenv from "dotenv"
dotenv.config()

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: process.env.NEXT_PUBLIC_SITE_URL,
    methods: ["GET", "POST"]
  }
})

const startServer = async () => {
  await connectToDatabase()
  registerSocketHandlers(io)
  server.listen(4000, () => {
    console.log("✅ Socket server running on http://localhost:4000")
  })
}

startServer()