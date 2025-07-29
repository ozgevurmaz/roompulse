"use client"

import React from 'react'
import { Button } from '../ui/button'
import { Github } from 'lucide-react'
import { signIn } from 'next-auth/react'

type Props = {
    user?: string | null
}

const LoginButton = (props: Props) => {

    const handleSignIn = () => {
        // Redirect to auth callback page after successful signin
        signIn("github", { 
            callbackUrl: "/auth/callback" 
        })
    }

    return (
        <Button
            onClick={handleSignIn}
            className="px-4 py-2 font-semibold"
            color="primary"
        >
            <Github className='w-5 h-5 mr-2' />
            Login with GitHub
        </Button>
    )
}

export default LoginButton