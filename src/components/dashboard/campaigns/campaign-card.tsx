"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, Edit, Archive } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";

type Campaign = {
    id: string;
    name: string;
    status: string;
    type: string;
    updatedAt: Date;
    _count: {
        leads: number;
        steps: number;
    }
}

export function CampaignCard({ campaign }: { campaign: Campaign }) {
    const router = useRouter();

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-green-500/10 text-green-600 border-green-200/50";
            case "Draft": return "bg-slate-500/10 text-slate-600 border-slate-200/50";
            case "Paused": return "bg-amber-500/10 text-amber-600 border-amber-200/50";
            default: return "bg-muted text-muted-foreground";
        }
    }

    return (
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push(`/dashboard/campaigns/${campaign.id}`)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {campaign.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getStatusColor(campaign.status)}>
                        {campaign.status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{campaign._count.leads} <span className="text-sm font-normal text-muted-foreground">leads</span></div>
                <div className="text-xs text-muted-foreground mt-1">
                    {campaign._count.steps} steps • {campaign.type}
                </div>
                <div className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
                    Updated {formatDistanceToNow(new Date(campaign.updatedAt))} ago
                </div>
            </CardContent>
        </Card>
    );
}
