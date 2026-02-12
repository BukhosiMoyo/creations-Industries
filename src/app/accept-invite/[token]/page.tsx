import { prisma } from "@/lib/prisma";
import { SignUpForm } from "@/components/auth/SignUpForm";
import Link from "next/link";
import { notFound } from "next/navigation";

interface AcceptInvitePageProps {
    params: {
        token: string;
    };
}

export default async function AcceptInvitePage({ params }: AcceptInvitePageProps) {
    const invite = await prisma.invite.findUnique({
        where: { token: params.token },
    });

    if (!invite || invite.status !== "PENDING" || invite.expires < new Date()) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
                <h1 className="text-2xl font-bold mb-2">Invalid or Expired Invite</h1>
                <p className="text-muted-foreground mb-6">
                    This invite link is no longer valid. Please ask the administrator to send a new invite.
                </p>
                <Link href="/login" className="text-primary hover:underline">
                    Back to Login
                </Link>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        Complete your account setup
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        You&apos;ve been invited to join <strong>Creations</strong>.
                    </p>
                </div>

                <div className="mt-8 bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <SignUpForm
                        defaultValues={{ email: invite.email }}
                        onSuccess={async () => {
                            "use server";
                            // This would ideally be a server action, but standard onSuccess is client-side.
                            // We will handle the invite completion in the register API or a separate update.
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
