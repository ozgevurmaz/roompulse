"use client"

import { SessionProvider, useSession } from 'next-auth/react'
import React from 'react'
import { SocketProvider } from './socketProvider'
import AuthProvider from './authProvider'

type Props = {
  children: React.ReactNode
}

const AppProviders = (props: Props) => {


  return (
    <SocketProvider>
      <SessionProvider>
        <AuthProvider>
        {props.children}
        </AuthProvider>
      </SessionProvider>
    </SocketProvider>
  )
}

export default AppProviders