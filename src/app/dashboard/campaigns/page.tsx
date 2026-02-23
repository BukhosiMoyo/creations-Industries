import { getCampaigns } from "@/lib/campaigns/campaign-service";
import { CampaignCard } from "@/components/dashboard/campaigns/campaign-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function CampaignsPage() {
    const campaigns = await getCampaigns();

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Campaigns</h2>
                <div className="flex items-center space-x-2">
                    <Link href="/dashboard/campaigns/new">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> New Campaign
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {campaigns.map((campaign: any) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
                {campaigns.length === 0 && (
                    <div className="col-span-full h-32 flex items-center justify-center border border-dashed rounded-lg text-muted-foreground">
                        No campaigns found. Create one to get started.
                    </div>
                )}
            </div>
        </div>
    );
}
