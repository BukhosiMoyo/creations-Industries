import { toast } from "@/components/ui/use-toast"

export const showToast = {
    success: (title: string, description?: string) => {
        toast({
            title,
            description,
            variant: "default", // or "success" if configured
            className: "border-l-4 border-emerald-500", // Visual cue
        })
    },
    error: (title: string, description?: string) => {
        toast({
            title,
            description,
            variant: "destructive",
        })
    },
    info: (title: string, description?: string) => {
        toast({
            title,
            description,
            variant: "default",
            className: "border-l-4 border-blue-500", // Visual cue
        })
    },
    warning: (title: string, description?: string) => {
        toast({
            title,
            description,
            variant: "default",
            className: "border-l-4 border-amber-500", // Visual cue
        })
    }
}
