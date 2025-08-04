"use client"

import { ChevronLeft } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { usePathname, useRouter } from "next/navigation"
import ProfilePhoto from '../ui/profilePhoto'
import Link from 'next/link'
import { NavLinkWithDropdown } from './navLinkDropDown'
import { useProfileStore } from '@/lib/zustand/useProfileStore'

const Navbar = () => {

    const {
        avatar, username
    } = useProfileStore()

    const pathname = usePathname()
    const router = useRouter()
    const showBackButton =
        pathname?.includes(`/account`) ||
        pathname?.includes("/rooms/")

    return (
        <div className='relative w-full h-[7vh] bg-primary text-primary-foreground items-center justify-between flex py-2 px-8 z-30'>
            <Link href="/" className='text-primary-foreground font-bold text-xl'>DevHive</Link>
            {username &&
                <NavLinkWithDropdown username={username}>
                    <ProfilePhoto imageUrl={avatar || ""} />
                </NavLinkWithDropdown>
            }
            {showBackButton && (
                <Button
                    onClick={() => router.back()}
                    className='z-10 absolute left-4 -bottom-11 -translate-y-1/2'
                    color="accent"
                >
                    <ChevronLeft className='w-5 h-5' />
                </Button>
            )}

        </div>
    )
}

export default Navbar