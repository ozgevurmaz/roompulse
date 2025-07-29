import React from "react"
import clsx from "clsx"
import { LucideIcon } from "lucide-react"

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string
    LabelIcon?: LucideIcon
    labelClassName?: string
    color?: "primary" | "secondary"
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            label,
            LabelIcon,
            labelClassName,
            color = "primary",
            className,
            id,
            ...props
        },
        ref
    ) => {
        const baseStyle =
            "w-full p-3 bg-input-bg rounded-md border text-foreground placeholder:text-input-placeholder focus:outline-none focus:ring-2 transition-all duration-200"


        const colorVariants = {
            primary: "border-input-border focus:ring-primary/70 focus:border-input-focus-border",
            secondary: "border-secondary focus:ring-secondary/70 focus:border-secondary"
        } as const

        return (
            <div className="flex flex-col gap-1">
                {label && (
                    <label
                        htmlFor={id}
                        className={clsx("flex items-center gap-2 text-sm font-medium text-foreground", labelClassName)}
                    >
                        {LabelIcon && <LabelIcon className="w-4 h-4" />} {label}
                    </label>
                )}
                <textarea
                    id={id}
                    ref={ref}
                    className={clsx(
                        baseStyle,
                        colorVariants[color],
                        className
                    )}
                    {...props}
                />
            </div>
        )
    }
)

Textarea.displayName = "Textarea"
