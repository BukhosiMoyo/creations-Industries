import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function XeroIntegrationPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Xero Integration</h1>
                <p className="text-muted-foreground">Manage your connection with Xero Accounting.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Connection Status</CardTitle>
                    <CardDescription>Connect your organization to sync invoices and contacts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
                        <div className="h-10 w-10 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold">X</div>
                        <div className="flex-1">
                            <p className="font-medium">No Organization Connected</p>
                            <p className="text-sm text-muted-foreground">Sync is currently disabled.</p>
                        </div>
                        <Button>Connect Xero</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
