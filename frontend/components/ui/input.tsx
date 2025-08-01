import React from "react"
import clsx from "clsx"
import { LucideIcon } from "lucide-react"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  LabelIcon?: LucideIcon
  labelClassName?: string
  color?: "primary" | "secondary"
  inputSize?: "sm" | "md"
  protectedInput?: boolean

}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      LabelIcon,
      labelClassName,
      color = "primary",
      className,
      id,
      inputSize = "md",
      protectedInput = false,
      ...props
    },
    ref
  ) => {
    const baseStyle =
      "w-full bg-input-bg rounded-md border border-input-border text-foreground placeholder:text-input-placeholder focus:outline-none focus:ring-2 transition-all duration-200"


    const colorVariants = {
      primary: "focus:ring-primary/70 focus:border-primary",
      secondary: "focus:ring-secondary/70 focus:border-secondary"
    } as const
    const sizeVariants = {
      sm: "h-9 px-2 py-1 text-sm",
      md: "h-12 px-4 py-2 text-base"
    } as const

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={id}
            className={clsx("flex items-center gap-2 text-sm font-medium text-foreground", labelClassName)}
          >
            {LabelIcon && <LabelIcon className="w-4 h-4" />} {label} {protectedInput && <span className="opacity-80">(Protected)</span>}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={clsx(
            baseStyle,
            colorVariants[color],
            sizeVariants[inputSize as keyof typeof sizeVariants]
            , className
          )}
          {...props}
        />
      </div>
    )
  }
)

Input.displayName = "Input"
