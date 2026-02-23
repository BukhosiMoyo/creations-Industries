
import { getCampaign, getCampaignAnalytics } from "@/lib/campaigns/campaign-service";
import { getSendingProfiles } from "@/lib/outreach/profile-service";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CampaignSettings } from "@/components/dashboard/campaigns/campaign-settings";
import { CampaignStepsEditor } from "@/components/dashboard/campaigns/steps-editor";

export const dynamic = 'force-dynamic';

export default async function CampaignDetailPage({ params }: { params: { id: string } }) {
    const [campaign, analytics, profiles] = await Promise.all([
        getCampaign(params.id),
        getCampaignAnalytics(params.id),
        getSendingProfiles()
    ]);

    if (!campaign) notFound();

    // Calculate Rates
    const openRate = analytics.sent > 0 ? Math.round((analytics.opened / analytics.sent) * 100) : 0;
    const replyRate = analytics.sent > 0 ? Math.round((analytics.replied / analytics.sent) * 100) : 0;

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center space-x-4 mb-6">
                <Link href="/dashboard/campaigns">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div className="flex-1">
                    <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                        {campaign.name}
                        <Badge variant="outline">{campaign.status}</Badge>
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        {campaign.type} • Created {formatDistanceToNow(new Date(campaign.createdAt))} ago
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        {campaign.sendingProfile ? `Sending as: ${campaign.sendingProfile.name}` : "No Profile Selected"}
                    </Button>
                    <Link href={`/dashboard/campaigns/${campaign.id}/leads`}>
                        <Button>Add Leads</Button>
                    </Link>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.totalLeads}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sent</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.sent}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{openRate}%</div>
                        <p className="text-xs text-muted-foreground">{analytics.opened} opens</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Reply Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{replyRate}%</div>
                        <p className="text-xs text-muted-foreground">{analytics.replied} replies</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="steps" className="space-y-4 mt-8">
                <TabsList>
                    <TabsTrigger value="steps">Sequence Steps</TabsTrigger>
                    <TabsTrigger value="leads">Enrolled Leads</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="steps" className="space-y-4">
                    <CampaignStepsEditor
                        campaignId={campaign.id}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        initialSteps={campaign.steps.map((s: any) => ({
                            id: s.id,
                            subject: s.subject || "",
                            body: s.body || "",
                            delayMinutes: s.delayMinutes,
                            order: s.order
                        }))}
                    />
                </TabsContent>
                <TabsContent value="leads">
                    <div className="p-12 border border-dashed rounded text-center text-muted-foreground">
                        <p className="mb-4">Lead management view coming soon.</p>
                        <Button variant="outline">View All Leads</Button>
                    </div>
                </TabsContent>
                <TabsContent value="settings">
                    <CampaignSettings campaign={campaign} profiles={profiles} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
