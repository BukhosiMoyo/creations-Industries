import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { ClientRequestsList } from "@/components/portal/client-requests-list";

export const metadata = {
    title: "My Requests | Portal",
    description: "Manage your service requests"
}

export default async function PortalRequestsPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.companyId) {
        redirect("/portal");
    }

    const requests = await prisma.serviceRequest.findMany({
        where: { companyId: session.user.companyId },
        orderBy: { updatedAt: 'desc' },
        include: {
            _count: {
                select: { documents: true, tasks: true }
            }
        }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="shrink-0">
                        <Link href="/portal"><ArrowLeft className="h-4 w-4" /></Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Service Requests</h1>
                        <p className="text-muted-foreground">Manage and track your service requests</p>
                    </div>
                </div>
                <Button asChild>
                    <Link href="/portal/requests/new">
                        <Plus className="mr-2 h-4 w-4" /> New Request
                    </Link>
                </Button>
            </div>

            <ClientRequestsList requests={requests} />
        </div>
    );
}
