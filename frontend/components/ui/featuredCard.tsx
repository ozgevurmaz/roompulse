import Link from "next/link"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  title: string
  description?: string
  href: string
  icon?: React.ReactNode
  className?: string
}

export function FeatureCard({ title, description, href, icon, className }: FeatureCardProps) {
  return (
    <Link href={href}>
      <div className={cn(
        "group relative rounded-2xl border border-border bg-card p-5 transition hover:border-primary hover:shadow-lg",
        className
      )}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          {icon && <div className="text-primary">{icon}</div>}
        </div>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </Link>
  )
}
