'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { ArrowLeft, Save, RotateCcw, Send, AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"

import { getEmailTemplate, updateEmailTemplate, resetEmailTemplate, sendTestEmail } from "@/app/actions/email-template-actions"
import { EMAIL_TEMPLATE_CONFIG } from "@/lib/email/template-config"

export default function EditTemplatePage({ params }: { params: { key: string } }) {
    const { key } = params
    const router = useRouter()
    const { data: session } = useSession()

    // Config & State
    const config = EMAIL_TEMPLATE_CONFIG[key]
    const [template, setTemplate] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [sending, setSending] = useState(false)

    // Form State
    const [subject, setSubject] = useState("")
    const [bodyFields, setBodyFields] = useState<Record<string, string>>({})

    // Test Send State
    const [testEmail, setTestEmail] = useState("")
    const [testContext, setTestContext] = useState("GENERIC")

    useEffect(() => {
        loadTemplate()
    }, [key])

    const loadTemplate = async () => {
        setLoading(true)
        try {
            const data = await getEmailTemplate(key)
            setTemplate(data)

            // Initialize form
            if (data) {
                setSubject(data.subject || "")
                setBodyFields(data.body as Record<string, string> || {})
            } else {
                // If no override, leaving empty means "use default" effectively if we tracked that,
                // but for editing we might want to show placeholders? 
                // Currently defaults are in code, so we can't easily fetch them to show as "current value" 
                // without rendering the template. 
                // For this MVP, empty input means "Default".
            }
        } catch (error) {
            console.error(error)
            toast({ title: "Error loading template", variant: "destructive" })
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            await updateEmailTemplate(key, {
                subject,
                body: bodyFields
            })
            toast({ title: "Template saved successfully", variant: "default" }) // Use success variant if available
            loadTemplate() // Reload to get updated timestamps
        } catch (error) {
            toast({ title: "Failed to save", variant: "destructive" })
        } finally {
            setSaving(false)
        }
    }

    const handleReset = async () => {
        if (!confirm("Are you sure? This will revert the template to system defaults.")) return

        setSaving(true)
        try {
            await resetEmailTemplate(key)
            toast({ title: "Template reverted to default", variant: "default" })
            setSubject("")
            setBodyFields({})
            setTemplate(null)
            router.refresh()
        } catch (error) {
            toast({ title: "Failed to reset", variant: "destructive" })
        } finally {
            setSaving(false)
        }
    }

    const handleTestSend = async () => {
        if (!testEmail) return toast({ title: "Please enter a test email", variant: "destructive" })

        setSending(true)
        try {
            const res = await sendTestEmail(key, testEmail, testContext)
            // @ts-ignore
            if (res.success) {
                toast({ title: "Test email sent", variant: "default" })
            } else {
                throw new Error("Send failed")
            }
        } catch (error) {
            toast({ title: "Test send failed", variant: "destructive" })
        } finally {
            setSending(false)
        }
    }

    if (!config) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-xl font-bold">Template Not Found</h2>
                <p className="text-muted-foreground">The key "{key}" is not registered in the system configuration.</p>
                <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto pb-20 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Button variant="ghost" size="sm" className="p-0 h-auto" onClick={() => router.back()}>
                            <ArrowLeft className="h-4 w-4 mr-1" /> Back
                        </Button>
                        <span>/</span>
                        <span>Settings</span>
                        <span>/</span>
                        <span>Templates</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">{config.label}</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="font-mono">{key}</Badge>
                        <Badge variant="secondary">{config.category}</Badge>
                        {template && <Badge className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border-emerald-500/20">Customized</Badge>}
                    </div>
                </div>
                <div className="flex gap-2">
                    {template && (
                        <Button variant="destructive" variant="outline" onClick={handleReset} disabled={saving}>
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Revert to Default
                        </Button>
                    )}
                    <Button onClick={handleSave} disabled={saving} className="min-w-[120px]">
                        {saving ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                        Save Changes
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Editor Column */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Content Editor</CardTitle>
                            <CardDescription>
                                Edit the text content of this email. Design and layout are locked.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject Line</Label>
                                <Input
                                    id="subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    placeholder="Default Subject used if empty"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Available variables: {config.variables.map(v => `{{${v}}}`).join(", ")}
                                </p>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="text-sm font-semibold mb-4">Body Blocks</h3>
                                {config.editableFields.length > 0 ? (
                                    <div className="space-y-4">
                                        {config.editableFields.map((field) => (
                                            <div key={field} className="space-y-2">
                                                <Label htmlFor={field} className="capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</Label>
                                                <Textarea
                                                    id={field}
                                                    value={bodyFields[field] || ""}
                                                    onChange={(e) => setBodyFields(prev => ({ ...prev, [field]: e.target.value }))}
                                                    placeholder={`Default ${field} text...`}
                                                    rows={4}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <Alert>
                                        <AlertTriangle className="h-4 w-4" />
                                        <AlertTitle>No Editable Blocks</AlertTitle>
                                        <AlertDescription>
                                            This template does not have any editable text blocks defined. You can still modify the subject line.
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    {/* Test Send Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Test Send</CardTitle>
                            <CardDescription>Send a preview to yourself.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Test Email Address</Label>
                                <Input
                                    value={testEmail}
                                    onChange={(e) => setTestEmail(e.target.value)}
                                    placeholder="you@company.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Simulate Context</Label>
                                <Select value={testContext} onValueChange={setTestContext}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="GENERIC">Generic</SelectItem>
                                        <SelectItem value="LEAD">Lead (New)</SelectItem>
                                        <SelectItem value="REQUEST">Service Request</SelectItem>
                                        <SelectItem value="AUTH">Authentication</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button className="w-full" variant="outline" onClick={handleTestSend} disabled={sending}>
                                {sending ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                                Send Test Email
                            </Button>
                        </CardContent>
                        <CardFooter className="bg-muted/40 p-4 text-xs text-muted-foreground">
                            <strong>Note:</strong> Test emails are logged in the system but marked as tests.
                        </CardFooter>
                    </Card>

                    {/* Info Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Template Details</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Last Edited:</span>
                                <span className="font-medium">
                                    {template ? new Date(template.updatedAt).toLocaleDateString() : "Never"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Edited By:</span>
                                <span className="font-medium truncate max-w-[120px]">
                                    {template?.lastEditedBy || "System"}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
