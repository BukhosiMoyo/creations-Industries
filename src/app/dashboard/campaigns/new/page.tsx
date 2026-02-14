"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewCampaignPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [type, setType] = useState("Outbound");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) return;

        setLoading(true);
        try {
            const res = await fetch('/api/campaigns', {
                method: 'POST',
                body: JSON.stringify({ name, type }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                const campaign = await res.json();
                router.push(`/dashboard/campaigns/${campaign.id}`);
            } else {
                alert("Failed to create campaign");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6 max-w-2xl mx-auto">
            <Link href="/dashboard/campaigns" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back to Campaigns
            </Link>

            <Card>
                <CardHeader>
                    <CardTitle>Create New Campaign</CardTitle>
                    <CardDescription>Setup the basics for your new outreach campaign.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Campaign Name</label>
                            <Input
                                placeholder="e.g. Q1 Outreach"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Campaign Type</label>
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Outbound">Outbound (Cold)</SelectItem>
                                    <SelectItem value="Nurture">Nurture</SelectItem>
                                    <SelectItem value="Onboarding">Onboarding</SelectItem>
                                    <SelectItem value="Webinar">Webinar Invite</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Link href="/dashboard/campaigns">
                                <Button variant="outline" type="button">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Create & Continue
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
