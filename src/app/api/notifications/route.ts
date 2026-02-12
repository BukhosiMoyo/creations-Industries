import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const notifications = await prisma.notification.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
            take: 50,
        });

        return NextResponse.json(notifications);
    } catch (error) {
        console.error("GET notifications error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { ids, isRead } = await req.json();

        await prisma.notification.updateMany({
            where: {
                userId: session.user.id,
                id: { in: ids },
            },
            data: { isRead },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("PATCH notifications error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (id) {
            await prisma.notification.delete({
                where: {
                    id,
                    userId: session.user.id,
                },
            });
        } else {
            // Clear all read notifications
            await prisma.notification.deleteMany({
                where: {
                    userId: session.user.id,
                    isRead: true,
                },
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("DELETE notifications error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
