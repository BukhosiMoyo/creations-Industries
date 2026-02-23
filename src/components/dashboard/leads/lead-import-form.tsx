"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { uploadLeadsAction } from "@/app/actions/upload-leads";
import { Loader2, UploadCloud } from "lucide-react";
import { toast } from "sonner";

export function LeadImportForm() {
    const [isUploading, setIsUploading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [result, setResult] = useState<any>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsUploading(true);
        setResult(null);

        const formData = new FormData(event.currentTarget);

        try {
            const response = await uploadLeadsAction(formData);
            if (response.error) {
                toast.error(response.error);
            } else if (response.result) {
                setResult(response.result);
                toast.success(`Imported ${response.result.success} leads!`);
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Import Leads</CardTitle>
                <CardDescription>Upload a CSV file to bulk import leads. Headers should include: Email, First Name, Last Name, Company.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Input id="file" name="file" type="file" accept=".csv" required />
                    </div>

                    <Button type="submit" className="w-full" disabled={isUploading}>
                        {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
                        {isUploading ? "Processing..." : "Upload & Import"}
                    </Button>
                </form>

                {result && (
                    <div className="mt-4 p-4 bg-muted/30 rounded-lg text-sm space-y-2">
                        <p className="font-bold">Import Results:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li className="text-green-600">Successfully Imported: {result.success}</li>
                            <li className="text-amber-600">Duplicates Skipped: {result.duplicates}</li>
                            <li className="text-red-500">Failed / Invalid: {result.failed}</li>
                        </ul>
                        {result.errors.length > 0 && (
                            <div className="mt-2 p-2 bg-red-500/10 rounded border border-red-500/20 max-h-32 overflow-y-auto">
                                <p className="font-bold text-xs text-red-600 mb-1">Errors:</p>
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {result.errors.map((e: { row: number, error: string }, i: number) => (
                                    <p key={i} className="text-xs text-red-600/80">Row {e.row}: {e.error}</p>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
