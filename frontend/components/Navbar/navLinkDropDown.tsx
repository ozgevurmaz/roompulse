"use client"

import { dropdownVariants } from '@/lib/motion/dropDownVariants'
import { useProfileStore } from '@/lib/zustand/useProfileStore'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


export const NavLinkWithDropdown = ({ children, username }: { children: React.ReactNode, username: string }) => {
    const router = useRouter()

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isServiceOpen, setIsServiceOpen] = useState<boolean>(false);
    const [isMobileServiceOpen, setIsMobileServiceOpen] = useState<boolean>(false);
    const link = [
        { name: "Profile", href: `/${username}`, color: "none" },
        { name: "Account", href: `${username}/account`, color: "none" },
        { name: "App Preferences", href: "/prefetences", color: "none" },
        { name: "Logout", href: "/api/auth/signout", color: "error" }
    ]
    const handleLinkClick = (href: string): void => {
        if (href === "/api/auth/signout") {
        useProfileStore.getState().resetProfile()}
        setIsOpen(false);
        setIsMobileServiceOpen(false);
        router.push(href)
    };

    return (
        <div
            className="relative z-30"
            onMouseEnter={() => setIsServiceOpen(true)}
            onMouseLeave={() => setIsServiceOpen(false)}
        >
            <div
                className="hover:text-foreground/70 px-3 py-2 flex items-center transition-colors duration-200 "
            >
                {children}
                <motion.div
                    animate={{ rotate: isServiceOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="ml-1 h-4 w-4" />
                </motion.div>
            </div>

            <AnimatePresence>
                {isServiceOpen && (
                    <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute right-0 mt-1 w-48 bg-surface text-foreground rounded-md shadow-lg border border-primary"
                    >
                        <div className="py-1">
                            {link.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.2,
                                        delay: index * 0.05
                                    }}
                                >
                                    <Link
                                        href={`${item.href}`}
                                        onClick={() => handleLinkClick(item.href)}
                                        className={`block w-full text-left px-4 py-2 ${item.color === "error" ? "text-error hover:bg-error hover:text-foreground" : "hover:bg-primary hover:text-primary-foreground"} transition-colors duration-300 ease-in-out`}
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}