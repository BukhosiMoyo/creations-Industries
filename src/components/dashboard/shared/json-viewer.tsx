import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileCode2 } from "lucide-react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function JsonViewer({ data, title }: { data: any, title: string }) {
    if (!data || Object.keys(data).length === 0) return null

    return (
        <Card>
            <CardHeader className="pb-3 border-b flex flex-row items-center gap-2">
                <FileCode2 className="w-4 h-4 text-muted-foreground" />
                <CardTitle className="text-base font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {Object.entries(data).map(([key, value]) => {
                    if (key === "serviceDetails") return null // often nested duplicate
                    return (
                        <div key={key} className="flex flex-col space-y-1">
                            <span className="text-xs uppercase text-muted-foreground font-semibold tracking-wider">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span className="text-sm font-medium break-words">
                                {value === undefined || value === null || value === "" ? "—" : String(value)}
                            </span>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}
