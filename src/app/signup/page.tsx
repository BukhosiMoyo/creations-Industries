import { SignUpCard } from "@/components/auth/SignUpCard";
import { LoginRightPanel } from "@/components/auth/LoginRightPanel";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function RegisterPage() {
    return (
        <div className="min-h-screen w-full flex relative">
            <div className="absolute top-4 right-4 z-50">
                <ThemeToggle />
            </div>
            {/* Left Panel: Signup Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 bg-background">
                <div className="w-full max-w-md space-y-8">
                    {/* Mobile Header Branding (Visible only on small screens) */}
                    <div className="lg:hidden text-center mb-8">
                        <h1 className="text-2xl font-bold">Creations Industries</h1>
                    </div>

                    <SignUpCard />
                </div>
            </div>

            {/* Right Panel: Feature Promo (Hidden on mobile) */}
            <div className="hidden lg:block lg:w-1/2 border-l">
                <LoginRightPanel />
            </div>
        </div>
    );
}
