import { SignUpForm } from "@/components/auth/SignUpForm";
import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                        Create your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Or{" "}
                        <Link href="/login" className="font-medium text-primary hover:text-primary/90">
                            sign in to your existing account
                        </Link>
                    </p>
                </div>

                <div className="mt-8 bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <SignUpForm />
                </div>
            </div>
        </div>
    );
}
