"use client"

import * as React from "react"
import { Upload, File, X, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface PortalUploadZoneProps {
    token: string
    onUploadSuccess: (doc: { id: string; name: string; type: string; createdAt: string }) => void
}

export function PortalUploadZone({ token, onUploadSuccess }: PortalUploadZoneProps) {
    const [isDragging, setIsDragging] = React.useState(false)
    const [isUploading, setIsUploading] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    const [file, setFile] = React.useState<File | null>(null)
    const [error, setError] = React.useState<string | null>(null)

    const onDrop = React.useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile) handleFileSelection(droppedFile)
    }, [])

    const handleFileSelection = (selectedFile: File) => {
        // Basic validation
        if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
            setError("File size must be less than 10MB")
            return
        }
        setFile(selectedFile)
        setError(null)
    }

    const startUpload = async () => {
        if (!file) return

        setIsUploading(true)
        setProgress(10)

        try {
            // Mock upload progress
            const interval = setInterval(() => {
                setProgress(p => {
                    if (p >= 90) {
                        clearInterval(interval)
                        return 90
                    }
                    return p + 10
                })
            }, 300)

            // API Call
            const response = await fetch(`/api/leads/portal/${token}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: file.name,
                    type: "Other", // Default type
                    size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
                    url: "mock-url-from-uploadthing"
                })
            })

            if (!response.ok) throw new Error("Upload failed")

            const data = (await response.json()) as { id: string; name: string; type: string; createdAt: string }
            setProgress(100)

            setTimeout(() => {
                onUploadSuccess(data)
                setFile(null)
                setIsUploading(false)
                setProgress(0)
            }, 500)

        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "An error occurred during upload")
            setIsUploading(false)
        }
    }

    return (
        <div className="space-y-4">
            {!file ? (
                <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={onDrop}
                    className={cn(
                        "relative group flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-3xl transition-all",
                        isDragging ? "border-accent bg-accent/5" : "border-border/40 bg-card/20 hover:border-accent/20 hover:bg-card/30"
                    )}
                >
                    <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => e.target.files?.[0] && handleFileSelection(e.target.files[0])}
                    />
                    <div className="h-16 w-16 rounded-full bg-muted/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="h-8 w-8 text-muted-foreground group-hover:text-accent" />
                    </div>
                    <p className="text-sm font-bold text-foreground mb-1 uppercase tracking-widest">Click or drag to upload</p>
                    <p className="text-[11px] font-medium text-muted-foreground uppercase opacity-60">FICA, ID or Bank Statements (Max 10MB)</p>
                </div>
            ) : (
                <div className="p-6 rounded-3xl border border-border/40 bg-card/50 backdrop-blur-sm space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20">
                            <File className="h-6 w-6 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate leading-none">{file.name}</p>
                            <p className="text-[11px] font-medium text-muted-foreground/60 mt-1 uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        {!isUploading && (
                            <Button variant="ghost" size="icon" onClick={() => setFile(null)} className="h-9 w-9 rounded-xl">
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>

                    {isUploading && (
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                <span>Uploading...</span>
                                <span>{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-1.5" />
                        </div>
                    )}

                    {!isUploading && (
                        <Button
                            onClick={startUpload}
                            className="w-full h-11 bg-accent hover:bg-accent/90 text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-accent/20 transition-all active:scale-[0.98]"
                        >
                            <Loader2 className={cn("h-4 w-4 mr-2 animate-spin", !isUploading && "hidden")} />
                            Upload Document
                        </Button>
                    )}
                </div>
            )}

            {error && (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-destructive/5 border border-destructive/10 text-destructive text-[11px] font-bold uppercase tracking-widest">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {error}
                </div>
            )}
        </div>
    )
}
