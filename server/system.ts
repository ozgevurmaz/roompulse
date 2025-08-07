import dotenv from "dotenv"
dotenv.config()

export const system: ProfileType = {
  username: "System",
  id: process.env.SYSTEM_USER_ID as string,
  avatar: "system",
}