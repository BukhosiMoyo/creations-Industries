"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Mail } from "lucide-react"; // Assuming lucide-react is installed
import Link from "next/link";
import { toast } from "sonner";

interface Template {
    key: string;
    subject: string | null;
    updatedAt: string | null;
    lastEditedBy: string | null;
}

export default function EmailTemplatesPage() {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            const res = await fetch("/api/email/templates");
            if (!res.ok) throw new Error("Failed to fetch templates");
            const data = await res.json();
            setTemplates(data);
        } catch (error) {
            toast.error("Error fetching templates");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="animate-spin h-8 w-8 text-black" />
            </div>
        );
    }

    // Group templates by category
    const categories: Record<string, Template[]> = {
        Auth: [],
        Leads: [],
        Requests: [],
        Tasks: [],
        System: [],
        Other: [],
    };

    templates.forEach(t => {
        if (t.key.startsWith("auth")) categories.Auth.push(t);
        else if (t.key.startsWith("lead")) categories.Leads.push(t);
        else if (t.key.startsWith("request")) categories.Requests.push(t);
        else if (t.key.startsWith("task") || t.key.startsWith("reminder") || t.key.startsWith("digest")) categories.Tasks.push(t);
        else if (t.key.startsWith("system")) categories.System.push(t);
        else categories.Other.push(t);
    });

    return (
        <div className="space-y-6 p-6">
            <h1 className="text-3xl font-bold tracking-tight">Email Templates</h1>
            <p className="text-muted-foreground">
                Manage transactional email templates and overrides.
            </p>

            {Object.entries(categories).map(([category, items]) => {
                if (items.length === 0) return null;
                return (
                    <Card key={category}>
                        <CardHeader>
                            <CardTitle>{category}</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {items.map((template) => (
                                <Link
                                    key={template.key}
                                    href={`/dashboard/settings/email-templates/${template.key}`}
                                    className="block group"
                                >
                                    <div className="border rounded-lg p-4 hover:border-black transition-colors bg-white">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-gray-100 rounded-md group-hover:bg-gray-200">
                                                <Mail className="h-4 w-4" />
                                            </div>
                                            <span className="font-medium text-sm truncate" title={template.key}>
                                                {template.key}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {template.subject || "Default Subject"}
                                        </p>
                                        {template.updatedAt && (
                                            <p className="text-[10px] text-muted-foreground mt-2">
                                                Edited: {new Date(template.updatedAt).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
