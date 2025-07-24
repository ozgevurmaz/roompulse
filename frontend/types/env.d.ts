declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI:string
    DB_NAME:string
    NEXT_PUBLIC_SOCKET_URL: string
    NEXT_PUBLIC_SITE_URL: string
  }
}