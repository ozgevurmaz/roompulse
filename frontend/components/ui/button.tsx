import { Send } from "lucide-react"
import React from "react"
import clsx from "clsx"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    color?: "primary" | "secondary" | "accent" | "none"
    children: React.ReactNode
}

export const Button = ({ color = "primary", className, children, disabled, ...props }: ButtonProps) => {
    const baseStyle = "px-2 py-1 h-min flex items-center justify-center rounded-md transition-all duration-200 hover:scale-105 disabled:hover:scale-100 active:scale-95  disabled:cursor-not-allowed cursor-pointer disabled:opacity-70"

    const colorVariants = {
        primary: "bg-primary hover:bg-primary/80 text-primary-foreground shadow-sm hover:shadow-md disabled:hover:shadow-none",
        secondary: "bg-secondary hover:bg-secondary/80 text-secondary-foreground shadow-sm hover:shadow-md disabled:hover:shadow-none",
        accent: "bg-accent hover:bg-accent/80 text-accent-foreground shadow-sm hover:shadow-md disabled:hover:shadow-none",
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