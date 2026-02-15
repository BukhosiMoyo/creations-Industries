import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react"

interface CalloutProps {
    type?: "default" | "warning" | "danger" | "success"
    title?: string
    children?: React.ReactNode
    className?: string
}

export function Callout({
    type = "default",
    title,
    children,
    className
}: CalloutProps) {
    return (
        <div className={cn(
            "my-6 flex flex-col rounded-lg border p-4 text-sm",
            {
                "border-border bg-surface text-text-primary": type === "default",
                "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-900/50 dark:bg-yellow-900/20 dark:text-yellow-200": type === "warning",
                "border-red-200 bg-red-50 text-red-900 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-200": type === "danger",
                "border-green-200 bg-green-50 text-green-900 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-200": type === "success",
            },
            className
        )}>
            <div className="flex items-center gap-2">
                {type === "default" && <Info className="h-4 w-4" />}
                {type === "warning" && <AlertCircle className="h-4 w-4" />}
                {type === "danger" && <XCircle className="h-4 w-4" />}
                {type === "success" && <CheckCircle2 className="h-4 w-4" />}
                {title && <span className="font-semibold">{title}</span>}
            </div>
            {children && <div className="mt-2 text-inherit/90">{children}</div>}
        </div>
    )
}
