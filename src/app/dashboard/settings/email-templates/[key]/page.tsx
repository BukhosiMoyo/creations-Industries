"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Send, RefreshCw, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function EditTemplatePage() {
    const params = useParams();
    const router = useRouter();
    const key = params?.key as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [sending, setSending] = useState(false);
    const [previewLoading, setPreviewLoading] = useState(false);

    const [subject, setSubject] = useState("");
    const [preheader, setPreheader] = useState("");
    const [previewHtml, setPreviewHtml] = useState("");
    const [testEmail, setTestEmail] = useState("");

    // Fetch template data
    useEffect(() => {
        if (!key) return;
        fetchTemplate();
    }, [key]);

    const fetchTemplate = async () => {
        try {
            const res = await fetch(`/api/email/templates/${key}`);
            if (!res.ok) throw new Error("Failed to fetch template");
            const data = await res.json();
            setSubject(data.subject || "");
            setPreheader(data.preheader || "");
        } catch (error) {
            toast.error("Error loading template");
        } finally {
            setLoading(false);
        }
    };

    // Update preview
    const updatePreview = useCallback(async () => {
        if (!key) return;
        setPreviewLoading(true);
        try {
            const res = await fetch("/api/email/preview", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    key,
                    subject,
                    preheader,
                    props: {
                        // Mock data for preview could be enhanced here
                        firstName: "John",
                        clientName: "Acme Corp",
                        brandName: "Creations",
                        serviceType: "Accounting",
                        requestId: "REQ-123",
                        leadId: "LEAD-456",
                        dashboardUrl: "#",
                        portalUrl: "#",
                        verifyUrl: "#",
                        resetUrl: "#",
                    }
                }),
            });
            const html = await res.text();
            setPreviewHtml(html);
        } catch (error) {
            console.error("Preview error", error);
        } finally {
            setPreviewLoading(false);
        }
    }, [key, subject, preheader]);

    // Debounced preview update
    useEffect(() => {
        const timer = setTimeout(() => {
            updatePreview();
        }, 800);
        return () => clearTimeout(timer);
    }, [updatePreview]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`/api/email/templates/${key}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subject, preheader }),
            });

            if (!res.ok) throw new Error("Failed to save");

            toast.success("Template saved successfully");
        } catch (error) {
            toast.error("Failed to save template");
        } finally {
            setSaving(false);
        }
    };

    const handleSendTest = async () => {
        if (!testEmail) {
            toast.error("Please enter a recipient email");
            return;
        }
        setSending(true);
        try {
            const res = await fetch("/api/email/send-test", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key, to: testEmail }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Failed to send");
            }

            toast.success(`Test email sent to ${testEmail}`);
        } catch (error: any) {
            toast.error(`Failed to send test email: ${error.message}`);
        } finally {
            setSending(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="animate-spin h-8 w-8" />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)]">
            {/* Header */}
            <header className="border-b bg-background px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard/settings/email-templates">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-lg font-semibold">{key}</h1>
                        <p className="text-sm text-muted-foreground">Edit template overrides</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => updatePreview()} disabled={previewLoading}>
                        <RefreshCw className={`h-4 w-4 mr-2 ${previewLoading ? "animate-spin" : ""}`} />
                        Refresh Preview
                    </Button>
                    <Button onClick={handleSave} disabled={saving}>
                        {saving ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                        Save Changes
                    </Button>
                </div>
            </header>

            {/* Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Editor Sidebar */}
                <div className="w-[400px] border-r bg-muted/10 p-6 overflow-y-auto space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Subject Line</Label>
                            <Input
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Enter subject line..."
                            />
                            <p className="text-xs text-muted-foreground">
                                Supports variables like {"{{firstName}}"}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label>Preheader</Label>
                            <Input
                                value={preheader}
                                onChange={(e) => setPreheader(e.target.value)}
                                placeholder="Enter preheader text..."
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t space-y-4">
                        <Label>Test Email</Label>
                        <div className="flex gap-2">
                            <Input
                                placeholder="user@example.com"
                                value={testEmail}
                                onChange={(e) => setTestEmail(e.target.value)}
                            />
                            <Button size="icon" variant="secondary" onClick={handleSendTest} disabled={sending}>
                                {sending ? <Loader2 className="animate-spin h-4 w-4" /> : <Send className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Preview Area */}
                <div className="flex-1 bg-gray-100 p-8 overflow-y-auto flex justify-center">
                    <div className="w-full max-w-[600px] bg-white shadow-sm min-h-[600px] rounded-md overflow-hidden">
                        {previewLoading && !previewHtml ? (
                            <div className="flex justify-center items-center h-full text-muted-foreground">
                                <Loader2 className="animate-spin h-8 w-8 mr-2" /> Generating preview...
                            </div>
                        ) : (
                            <iframe
                                srcDoc={previewHtml}
                                className="w-full h-full border-none min-h-[800px]"
                                title="Email Preview"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
