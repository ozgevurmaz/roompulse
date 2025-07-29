declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string
    DB_NAME: string
    GITHUB_CLIENT_ID: string
    GITHUB_CLIENT_SECRET: string
    NEXT_PUBLIC_SOCKET_URL: string
    NEXT_PUBLIC_SITE_URL: string
    NEXTAUTH_SECRET:string
  }
}