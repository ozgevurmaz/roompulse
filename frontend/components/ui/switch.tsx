import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"
import { Check, LucideIcon, X } from "lucide-react"

type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
  color?: "primary" | "secondary" | "success"
  CheckIcon?: LucideIcon
  UncheckIcon?: LucideIcon
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, color = "primary", CheckIcon, UncheckIcon, ...props }, ref) => {
  const isChecked = Boolean(props.checked)

  const rootColorVariants = {
    primary: "bg-input data-[state=checked]:bg-primary",
    secondary: "bg-input data-[state=checked]:bg-secondary",
    success: "bg-input data-[state=checked]:bg-success data-[state=unchecked]:bg-error ",
  }

  const thumbColorVariants = {
    primary: {
      checked: "bg-accent text-primary",
      unchecked: "bg-accent text-accent-foreground"
    },
    secondary: {
      checked: "bg-accent text-secondary",
      unchecked: "bg-accent text-accent-foreground"
    },
    success: {
      checked: "bg-success-foreground text-success",
      unchecked: "bg-error-foreground text-error"
    },
  }

  return (
    <SwitchPrimitives.Root
      ref={ref}
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border transition-colors border-input-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        rootColorVariants[color],
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none flex items-center justify-center h-5 w-5 rounded-full shadow-lg ring-0 transition-transform",
          isChecked ? "translate-x-5" : "translate-x-0",
          isChecked
            ? thumbColorVariants[color].checked
            : thumbColorVariants[color].unchecked
        )}
      >
        {(CheckIcon && UncheckIcon)
          && (isChecked ? <CheckIcon className="w-3 h-3" /> : <UncheckIcon className="w-3 h-3" />)}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  )
})
Switch.displayName = "CustomSwitch"

export { Switch }
