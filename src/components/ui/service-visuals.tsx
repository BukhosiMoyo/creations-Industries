"use client"

import { motion } from "framer-motion"
import { Shield, Cloud, Network, LayoutDashboard, Users, TrendingUp, Landmark, Binary } from "lucide-react"

interface ServiceVisualProps {
    type?: 'chart' | 'shield' | 'cloud' | 'flow' | 'team' | 'compliance' | 'strategic'
    className?: string
}

export function ServiceVisual({ type = 'chart', className = "" }: ServiceVisualProps) {
    const containerVariants = {
        initial: { opacity: 0, scale: 0.9 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 }
    }

    const renderVisual = () => {
        switch (type) {
            case 'shield':
            case 'compliance':
                return (
                    <div className="relative flex items-center justify-center">
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                rotate: [0, 2, -2, 0]
                            }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10"
                        >
                            <Shield className="w-32 h-32 text-accent" strokeWidth={1} />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-2 border-dashed border-accent/20 rounded-full scale-150"
                        />
                        <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full scale-150" />
                        <motion.div variants={itemVariants} className="absolute -top-4 -right-4 bg-surface border border-border p-3 rounded-xl shadow-xl">
                            <Landmark className="w-6 h-6 text-accent" />
                        </motion.div>
                    </div>
                )
            case 'cloud':
                return (
                    <div className="relative flex items-center justify-center">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10"
                        >
                            <Cloud className="w-32 h-32 text-accent" strokeWidth={1} />
                        </motion.div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        scale: [1, 1.5],
                                        opacity: [0.3, 0]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: i * 1,
                                        ease: "easeOut"
                                    }}
                                    className="absolute w-24 h-24 border border-accent/30 rounded-full"
                                />
                            ))}
                        </div>
                        <motion.div variants={itemVariants} className="absolute -bottom-4 -left-4 bg-surface border border-border p-3 rounded-xl shadow-xl">
                            <Binary className="w-6 h-6 text-accent" />
                        </motion.div>
                    </div>
                )
            case 'flow':
            case 'strategic':
                return (
                    <div className="relative flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="relative z-10"
                        >
                            <Network className="w-32 h-32 text-accent/40" strokeWidth={1} />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 flex items-center justify-center text-accent"
                        >
                            <TrendingUp className="w-16 h-16" strokeWidth={1.5} />
                        </motion.div>
                        <div className="absolute inset-0 bg-accent/10 blur-2xl rounded-full" />
                    </div>
                )
            case 'team':
                return (
                    <div className="relative flex items-center justify-center">
                        <div className="flex -space-x-8">
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                                    className="w-24 h-24 rounded-full bg-surface border-2 border-accent/20 flex items-center justify-center shadow-2xl relative overflow-hidden"
                                >
                                    <Users className="w-10 h-10 text-accent" strokeWidth={1} />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )
            case 'chart':
            default:
                return (
                    <div className="relative flex items-center justify-center">
                        <motion.div
                            className="relative z-10 bg-surface/50 backdrop-blur-xl border border-border/50 p-8 rounded-[2rem] shadow-2xl overflow-hidden"
                        >
                            <LayoutDashboard className="w-24 h-24 text-accent" strokeWidth={1} />
                            <motion.div
                                animate={{ scaleX: [0, 1] }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="h-1 bg-accent/30 mt-4 rounded-full origin-left"
                            />
                            <motion.div
                                animate={{ scaleX: [0, 0.7] }}
                                transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                                className="h-1 bg-accent/20 mt-2 rounded-full origin-left"
                            />
                        </motion.div>
                        <div className="absolute -inset-4 bg-accent/5 blur-2xl rounded-full" />
                    </div>
                )
        }
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className={`relative ${className}`}
        >
            {renderVisual()}
        </motion.div>
    )
}
