"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Mail,
    Users,
    Shield,
    Bell,
    Palette,
    Database,
    Globe,
    ChevronRight,
    Zap,
} from "lucide-react";

const settingsSections = [
    {
        title: "Email Templates",
        description:
            "Manage transactional email templates, subjects, and content overrides.",
        icon: Mail,
        href: "/dashboard/settings/email-templates",
        badge: null,
    },
    {
        title: "User Management",
        description:
            "Invite team members, manage roles, and control access permissions.",
        icon: Users,
        href: "/dashboard/users",
        badge: null,
    },
    {
        title: "Security",
        description:
            "Password policies, two-factor authentication, and session management.",
        icon: Shield,
        href: "#",
        badge: "Coming Soon",
    },
    {
        title: "Notifications",
        description:
            "Configure email and in-app notification preferences for your team.",
        icon: Bell,
        href: "#",
        badge: "Coming Soon",
    },
    {
        title: "Branding",
        description:
            "Customise your logo, colours, and client-facing portal appearance.",
        icon: Palette,
        href: "#",
        badge: "Coming Soon",
    },
    {
        title: "Integrations",
        description:
            "Connect Xero, SARS eFiling, and other third-party services.",
        icon: Zap,
        href: "/dashboard/xero",
        badge: null,
    },
    {
        title: "Data & Export",
        description:
            "Export client data, generate reports, and manage data retention.",
        icon: Database,
        href: "#",
        badge: "Coming Soon",
    },
    {
        title: "Company Profile",
        description:
            "Your firm's details, registration, and public-facing information.",
        icon: Globe,
        href: "#",
        badge: "Coming Soon",
    },
];

export default function SettingsPage() {
    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">
                    Settings
                </h1>
                <p className="text-muted-foreground font-medium">
                    Configure your platform, integrations, and team preferences.
                </p>
            </div>

            {/* Settings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {settingsSections.map((section) => {
                    const isDisabled =
                        section.badge === "Coming Soon" ||
                        section.href === "#";

                    return (
                        <Link
                            key={section.title}
                            href={isDisabled ? "#" : section.href}
                            className={isDisabled ? "cursor-not-allowed" : ""}
                        >
                            <Card
                                className={`border-border/60 transition-all group h-full ${isDisabled
                                        ? "opacity-50"
                                        : "hover:bg-muted/30 hover:shadow-md hover:border-accent/30 cursor-pointer"
                                    }`}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={`h-12 w-12 shrink-0 rounded-2xl flex items-center justify-center transition-all duration-300 ${isDisabled
                                                        ? "bg-muted/30 text-muted-foreground/40"
                                                        : "bg-muted/50 border border-border/50 text-muted-foreground group-hover:bg-accent group-hover:text-white group-hover:border-accent"
                                                    }`}
                                            >
                                                <section.icon className="h-6 w-6" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-foreground text-sm">
                                                        {section.title}
                                                    </h3>
                                                    {section.badge && (
                                                        <Badge
                                                            variant="outline"
                                                            className="text-[9px] font-bold uppercase tracking-widest bg-muted/50 text-muted-foreground border-border/60"
                                                        >
                                                            {section.badge}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                                                    {section.description}
                                                </p>
                                            </div>
                                        </div>
                                        {!isDisabled && (
                                            <ChevronRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-accent transition-colors shrink-0 mt-1" />
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
