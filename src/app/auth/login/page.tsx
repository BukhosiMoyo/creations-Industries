"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight, Lock, Mail, ChevronLeft, ShieldCheck } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                router.push("/dashboard");
            }
        } catch {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0C10]">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,1)_0%,rgba(0,0,0,1)_100%)]" />

            {/* Animated accent glows */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[150px]"
            />

            <div className="relative z-10 w-full max-w-[440px] px-6">
                {/* Logo Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center mb-8"
                >
                    <Link href="/" className="group flex items-center gap-2 mb-2">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] group-hover:scale-105 transition-transform">
                            <ShieldCheck className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold tracking-tighter text-white">Creations</span>
                    </Link>
                    <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-border to-transparent" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="p-8 md:p-10 rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-2xl overflow-hidden relative group">
                        {/* Decorative inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />

                        <div className="relative z-10">
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                                <p className="text-slate-400 text-sm">Enter your credentials to access your secure portal</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <AnimatePresence mode="wait">
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-xs font-medium flex items-center gap-2"
                                        >
                                            <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                                            {error}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="space-y-2 group/input">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 ml-1">
                                        <Mail className="h-3 w-3" /> Email Address
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type="email"
                                            placeholder="name@company.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="h-14 bg-white/[0.03] border-white/10 text-white placeholder:text-slate-600 rounded-2xl focus:ring-accent/20 focus:border-accent transition-all pl-12"
                                        />
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-600 group-focus-within/input:text-accent transition-colors" />
                                    </div>
                                </div>

                                <div className="space-y-2 group/input">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2 ml-1">
                                        <Lock className="h-3 w-3" /> Password
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="h-14 bg-white/[0.03] border-white/10 text-white placeholder:text-slate-600 rounded-2xl focus:ring-accent/20 focus:border-accent transition-all pl-12"
                                        />
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-600 group-focus-within/input:text-accent transition-colors" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-xs px-1">
                                    <div className="flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer select-none">
                                        <div className="h-4 w-4 rounded border border-white/20 flex items-center justify-center">
                                            <div className="h-2 w-2 rounded-sm bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        Remember Me
                                    </div>
                                    <Link href="/auth/forgot-password" title="Forgot password recovery link" className="text-accent hover:text-accent/80 font-semibold transition-colors">
                                        Forgot Password?
                                    </Link>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-14 bg-accent hover:bg-accent/90 text-white font-bold text-lg rounded-2xl shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] transition-all flex items-center justify-center gap-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <>
                                            Sign In
                                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-8 text-center"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-medium"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back to main website
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

