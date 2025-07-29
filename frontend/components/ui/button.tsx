import { Send } from "lucide-react"
import React from "react"
import clsx from "clsx"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    color?: "primary" | "secondary" | "primarydark" | "secondarydark" | "none"
    children: React.ReactNode
}

export const Button = ({ color = "primary", className, children, disabled, ...props }: ButtonProps) => {
    const baseStyle = "px-2 py-1 h-min flex items-center justify-center rounded-md transition-all duration-200 hover:scale-105 disabled:hover:scale-100 active:scale-95  disabled:cursor-not-allowed cursor-pointer disabled:opacity-70"

    const colorVariants = {
        primary: "bg-primary hover:bg-primary-hover text-primary-foreground shadow-sm hover:shadow-md disabled:hover:shadow-none",
        secondary: "bg-secondary hover:bg-secondary-hover text-secondary-foreground shadow-sm hover:shadow-md disabled:hover:shadow-none",
        primarydark: "bg-primary-dark hover:bg-primary-dark/90 text-primary-dark-foreground shadow-sm hover:shadow-md disabled:hover:shadow-none",
        secondarydark: "bg-secondary-dark hover:bg-secondary-dark/90 text-secondary-dark-foreground shadow-sm hover:shadow-md disabled:hover:shadow-none",
        none: ""
    }

    return (
        <button
            disabled={disabled}
            className={clsx(baseStyle, colorVariants[color], className)}
            {...props}
        >
            {children}
        </button>
    )
}