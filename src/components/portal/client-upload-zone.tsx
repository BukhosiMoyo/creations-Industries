"use client"

import * as React from "react"
import { Upload, File, X, AlertCircle, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { uploadClientDocument } from "@/app/actions/portal-actions"
import { useToast } from "@/components/ui/use-toast"
import { trackEvent } from "@/lib/analytics"

interface ClientUploadZoneProps {
    requestId: string
}

export function ClientUploadZone({ requestId }: ClientUploadZoneProps) {
    const { toast } = useToast()
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
        // Validation: Max 10MB
        if (selectedFile.size > 10 * 1024 * 1024) {
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

        trackEvent({
            eventType: "DOCUMENT_UPLOAD_STARTED",
            metadata: { fileSize: file.size, fileType: file.type }
        })

        try {
            // Mock upload progress simulation
            const interval = setInterval(() => {
                setProgress(p => {
                    if (p >= 90) {
                        clearInterval(interval)
                        return 90
                    }
                    return p + 10
                })
            }, 300)

            // Call Server Action
            await uploadClientDocument(requestId, {
                name: file.name,
                size: file.size,
                type: file.type
            })

            clearInterval(interval)
            setProgress(100)

            trackEvent({
                eventType: "DOCUMENT_UPLOAD_SUCCEEDED",
                metadata: { fileSize: file.size, fileName: file.name }
            })

            toast({
                title: "Upload Successful",
                description: `${file.name} has been securely uploaded.`,
            })

            setTimeout(() => {
                setFile(null)
                setIsUploading(false)
                setProgress(0)
            }, 1000)

        } catch (err) {
            console.error(err)
            trackEvent({
                eventType: "DOCUMENT_UPLOAD_FAILED",
                metadata: { error: String(err) }
            })
            setError("Upload failed. Please try again.")
            setIsUploading(false)
            toast({
                title: "Upload Failed",
                description: "There was an error uploading your document.",
                variant: "destructive"
            })
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
                        "relative group flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all cursor-pointer",
                        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 bg-muted/5 hover:border-primary/50 hover:bg-muted/10"
                    )}
                    onClick={() => document.getElementById('file-upload')?.click()}
                >
                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFileSelection(e.target.files[0])}
                    />
                    <div className="h-12 w-12 rounded-full bg-background shadow-sm border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Upload className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <p className="text-sm font-medium text-foreground text-center">Click or drag to upload</p>
                    <p className="text-xs text-muted-foreground text-center mt-1">PDF, JPG, PNG up to 10MB</p>
                </div>
            ) : (
                <div className="p-4 rounded-xl border bg-card space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <File className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        {!isUploading && (
                            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setFile(null); }} className="h-8 w-8">
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>

                    {isUploading && (
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-medium text-muted-foreground">
                                <span>Uploading...</span>
                                <span>{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-1.5" />
                        </div>
                    )}

                    {!isUploading && (
                        <Button onClick={startUpload} className="w-full" size="sm">
                            <Upload className="h-4 w-4 mr-2" /> Upload File
                        </Button>
                    )}

                    {progress === 100 && (
                        <div className="flex items-center justify-center text-green-600 text-sm font-medium pt-1">
                            <CheckCircle2 className="h-4 w-4 mr-2" /> Upload Complete
                        </div>
                    )}
                </div>
            )}

            {error && (
                <div className="flex items-center gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                </div>
            )}
        </div>
    )
}
