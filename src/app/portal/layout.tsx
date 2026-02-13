
import { redirect } from "next/navigation";
import { getSession } from "@/lib/rbac"; // Assumption: rbac/auth logic helper exists
import { PortalShell } from "@/components/portal/portal-shell";
import { authOptions } from "@/lib/auth"; // Fallback if getSession is not consistent
import { getServerSession } from "next-auth";
import { UserRole } from "@prisma/client";

export default async function PortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Custom getSession or next-auth getServerSession
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    if (session.user.role !== UserRole.CLIENT) {
        // Double safety, though middleware handles this
        redirect("/dashboard");
    }

    return (
        <PortalShell user={session.user}>
            {children}
        </PortalShell>
    );
}
