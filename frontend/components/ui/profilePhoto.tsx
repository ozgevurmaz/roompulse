"use client"
import React from 'react'
import Image from 'next/image'
import { User2Icon } from 'lucide-react'
import { get } from 'http'

const ProfilePhoto = ({
  imageUrl,
  size = "sm"
}: {
  imageUrl: string | null
  size?: "sm" | "md" | "lg" | "xl"
}) => {

  const getSizeClass = (size: string) => {
    switch (size) {
      case "sm":
        return "w-10 h-10"
      case "md":
        return "w-12 h-12"
      case "lg":
        return "w-26 h-26 ring-4 ring-background shadow-xl"
      case "xl":
        return "w-34 h-34 ring-4 ring-background shadow-xl"
      default:
        return "w-10 h-10"
    }
  }

  return (
    <div className={`relative bg-primary-dark text-primary-dark-foreground rounded-full overflow-hidden ${getSizeClass(size)}`}>
      {
        imageUrl ? (
          <Image
            width={120}
            height={120}
            src={imageUrl}
            alt='User Avatar'
            className='object-cover w-full h-full'
          />
        ) : (
          <User2Icon className="p-2 w-full h-full" />
        )
      }
    </div>
  )
}

export default ProfilePhoto