import React from "react"
import clsx from "clsx"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  labelClassName?: string
  color?: "primary" | "secondary"
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      labelClassName,
      color = "primary",
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || props.name || `chat-input-${Math.random().toString(36).substring(2, 8)}`

    const baseStyle =
      "w-full px-4 py-1 h-12 bg-input-bg rounded-xl border border-2 text-foreground placeholder:text-input-placeholder  focus:outline-none focus:ring-2 focus:border-input-focus-border transition-all duration-200"

    const colorVariants = {
      primary:
        "border-input-border focus:ring-primary/70",
      secondary:
        "border-secondary focus:ring-secondary/70"
    }

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className={clsx("text-sm font-medium text-foreground", labelClassName)}
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={clsx(baseStyle, colorVariants[color], className)}
          {...props}
        />
      </div>
    )
  }
)