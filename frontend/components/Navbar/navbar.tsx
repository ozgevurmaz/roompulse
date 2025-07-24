
import { User2Icon } from 'lucide-react'
import React from 'react'

const Navbar = () => {
    return (
        <div className='w-full h-14 bg-primary text-primary-foreground items-center justify-between flex py-2 px-8'>
            <h1 className='text-primary-foreground font-bold text-xl'>ROOMPULSE</h1>
            <div className='bg-accent text-accent-foreground rounded-full p-2'>
                <User2Icon className="w-5 h-5 m-auto" />
            </div>


        </div>
    )
}

export default Navbar