"use client"

import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { SocketProvider } from './socketProvider'

type Props = {
  children: React.ReactNode
}

const AppProviders = (props: Props) => {
  return (
    <SocketProvider>
      <SessionProvider>
        {props.children}
      </SessionProvider>
    </SocketProvider>
  )
}

export default AppProviders