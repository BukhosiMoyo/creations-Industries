import { getEmailTemplates } from "@/app/actions/email-template-actions";
import { EMAIL_TEMPLATE_CONFIG } from "@/lib/email/template-config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, AlertCircle } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { prisma } from "@/lib/prisma"; // Direct access for server component
import { requireRole } from "@/lib/rbac";

// Helper to get inventory
const getInventory = async () => {
    // We combine the static config with DB overrides
    const overrides = await prisma.emailTemplate.findMany();

    // Map existing config to a list
    const inventory = Object.values(EMAIL_TEMPLATE_CONFIG).map(config => {
        const override = overrides.find(o => o.key === config.key);
        return {
            ...config,
            override
        };
    });

    return inventory;
}

export default async function EmailTemplatesPage() {
    await requireRole(['ADMIN']);
    const templates = await getInventory();

    // Group by category
    const grouped = templates.reduce((acc, template) => {
        const cat = template.category || "Other";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(template);
        return acc;
    }, {} as Record<string, typeof templates>);

    return (
        <div className="space-y-8 pb-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Email Templates</h1>
                <p className="text-muted-foreground">Manage transactional email content and overrides.</p>
            </div>

            {Object.entries(grouped).map(([category, items]) => (
                <Card key={category}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {category} Emails
                            {category === "Invoice" && (
                                <Badge variant="secondary" className="text-xs font-normal">Xero Managed</Badge>
                            )}
                        </CardTitle>
                        <CardDescription>
                            {category === "Invoice"
                                ? "These emails are sent directly by Xero. Content cannot be edited here."
                                : `${items.length} templates available.`}
                        </CardDescription>
                    </CardHeader>
                    {category !== "Invoice" && (
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Template Name</TableHead>
                                        <TableHead>Key</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Last Edited</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {items.map((template) => (
                                        <TableRow key={template.key}>
                                            <TableCell className="font-medium">{template.label}</TableCell>
                                            <TableCell className="text-xs font-mono text-muted-foreground">{template.key}</TableCell>
                                            <TableCell>
                                                {template.override ? (
                                                    <Badge variant="default" className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 border-emerald-500/20">Customized</Badge>
                                                ) : (
                                                    <Badge variant="outline">Default</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {template.override ? format(template.override.updatedAt, "MMM d, yyyy") : "—"}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Link href={`/dashboard/settings/email-templates/${template.key}`}>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <Edit className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    )}
                </Card>
            ))}
        </div>
    )
}
