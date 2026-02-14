
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { updateCampaignStatus } from "@/lib/campaigns/campaign-service"; // We need a server action for updates, or api route.
// Ideally usage of server actions. For now, assume client-side fetch wrapper or direct component server action if permitted (experimental).
// Simplest: Client Component calling API route. But we don't have API route for update yet (only service function).
// Let's assume we create a server action wrapper in a separate file or use API route.
// For this MVP, I'll mock the update call or assume `updateCampaignAction` exists.

// Actually, let's create a server action file for campaigns to keep it clean.
// Or just use the service if it's marked 'use server'?
// The service file isn't marked 'use server' yet.

interface CampaignSettingsProps {
    campaign: any;
    profiles: any[];
}

export function CampaignSettings({ campaign, profiles }: CampaignSettingsProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // State
    const [name, setName] = useState(campaign.name);
    const [profileId, setProfileId] = useState(campaign.sendingProfileId || "");
    const [status, setStatus] = useState(campaign.status);

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/campaigns/${campaign.id}`, {
                method: 'PATCH',
                body: JSON.stringify({ name, sendingProfileId: profileId, status }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!res.ok) throw new Error("Failed to update");

            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to save settings");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Campaign Settings</CardTitle>
                <CardDescription>Manage general configuration for this campaign.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Campaign Name</Label>
                    <Input id="name" value={name} onChange={e => setName(e.target.value)} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="profile">Sending Profile</Label>
                    <Select value={profileId} onValueChange={setProfileId}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a profile" />
                        </SelectTrigger>
                        <SelectContent>
                            {profiles.map(p => (
                                <SelectItem key={p.id} value={p.id}>
                                    {p.name} ({p.fromEmail})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">The email identity used to send this campaign.</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Paused">Paused</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="pt-4 flex justify-end">
                    <Button onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
