"use client"

import { SessionProvider } from 'next-auth/react'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const AppProviders = (props: Props) => {
    return (
        <SessionProvider>
          {props.children}
        </SessionProvider>
    )
}

export default AppProviders