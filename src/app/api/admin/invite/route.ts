import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { UserRole } from "@prisma/client";
import { sendEmail } from "@/lib/email/send-email";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { email, role } = await req.json();

        if (!email || !role) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return new NextResponse("User already exists", { status: 400 });
        }

        // Check if invite already pending
        const existingInvite = await prisma.invite.findFirst({
            where: {
                email,
                status: "PENDING",
            },
        });

        if (existingInvite) {
            return new NextResponse("Invite already pending for this email", { status: 400 });
        }

        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

        const invite = await prisma.invite.create({
            data: {
                email,
                role: role as UserRole,
                token,
                expires,
                invitedBy: session.user.id,
                status: "PENDING",
            },
        });

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";
        const inviteLink = `${baseUrl}/accept-invite/${token}`;

        // Send invite email via Resend
        const emailResult = await sendEmail({
            key: "auth.finish.setup",
            to: email,
            props: {
                firstName: email.split("@")[0],
                setupUrl: inviteLink,
                serviceType: `${role} account`,
                brandName: "Creations",
                subject: "You've been invited to join Creations",
            },
        });

        if (!emailResult.success) {
            console.warn("[INVITE_POST] Email send failed, but invite was created:", emailResult.error);
        }

        return NextResponse.json({
            invite,
            link: inviteLink,
            emailSent: emailResult.success,
        });

    } catch (error) {
        console.error("[INVITE_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

