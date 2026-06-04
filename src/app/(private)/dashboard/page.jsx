"use client";
import { useHasMounted } from "@/hooks/useHasMounted";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    FolderOpen, Compass, User, Zap, Users, Mail, GitBranch, Globe
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardOverview() {
    const { user } = useAuth();
    const mounted = useHasMounted();

    const firstName = mounted ? (user?.name?.split(" ")[0] ?? "there") : "there";
    const fullName = mounted ? (user?.name ?? "Developer") : "Developer";
    const avatar = mounted ? (user?.name ?? "D").charAt(0) : "D";

    return (
        <div className="max-w-6xl mx-auto pt-12 md:pt-2 pb-10">
            {/* Hero header */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
                    Welcome to the Hub,{" "}
                    <span className="text-gradient-cyan" suppressHydrationWarning>{firstName}.</span>
                </h1>
                <p className="text-white/50 text-base max-w-xl leading-relaxed">
                    Your journey as a developer collaborator starts here. Let&apos;s build something
                    incredible. Connect with elite engineers, join cutting-edge missions, and
                    manifest your code into reality.
                </p>
            </motion.div>

            {/* Initialize Your Journey */}
            <section className="mb-10">
                <p className="text-white/25 text-[11px] font-mono uppercase tracking-[0.18em] mb-5">
                    Initialize Your Journey
                </p>

                {/* Row 1 — large card + narrow card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* Create Project (2 cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="md:col-span-2 bg-[#0d1421] border border-white/5 rounded-2xl p-7 relative overflow-hidden hover:border-white/10 transition-colors group"
                    >
                        <span className="absolute top-5 right-5 text-white/30 text-[11px] font-mono border border-white/10 rounded-full px-2.5 py-0.5">
                            Recommended
                        </span>
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:border-[#00e5ff]/20 transition-colors">
                            <FolderOpen size={22} className="text-[#00e5ff]" />
                        </div>
                        <h3 className="font-heading text-white font-bold text-2xl mb-2">
                            Create Your First Project
                        </h3>
                        <p className="text-white/40 text-sm mb-6 leading-relaxed max-w-sm">
                            Launch your own vision and recruit the best talent on DevMatch.
                            Set your stack, define your goals, and start building.
                        </p>
                        <Link href="/dashboard/projects/new">
                            <motion.span
                                whileHover={{ x: 3 }}
                                className="inline-flex items-center gap-1.5 text-white text-sm font-semibold font-mono hover:text-[#00e5ff] transition-colors"
                            >
                                Get Started →
                            </motion.span>
                        </Link>
                    </motion.div>

                    {/* Explore Missions (1 col) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                        className="bg-[#0d1421] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:border-[#7c3aed]/20 transition-colors">
                            <Compass size={22} className="text-[#7c3aed]" />
                        </div>
                        <h3 className="font-heading text-white font-semibold text-lg mb-2">
                            Explore Active Missions
                        </h3>
                        <p className="text-white/40 text-sm mb-5 leading-relaxed">
                            Find projects that match your tech stack and join existing teams.
                        </p>
                        <Link href="/explore">
                            <span className="text-[#00e5ff] text-sm font-mono hover:underline">
                                Find Projects ↗
                            </span>
                        </Link>
                    </motion.div>
                </div>

                {/* Row 2 — two equal cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Complete Profile */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="bg-[#0d1421] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors group"
                    >
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:border-blue-500/20 transition-colors">
                            <User size={22} className="text-blue-400" />
                        </div>
                        <h3 className="font-heading text-white font-semibold text-lg mb-2">
                            Complete Your Profile
                        </h3>
                        <p className="text-white/40 text-sm mb-5 leading-relaxed">
                            Showcase your skills and experience to get recruited for top missions.
                        </p>
                        <Link href="/dashboard/profile">
                            <span className="text-white/50 text-xs font-mono hover:text-white transition-colors">
                                Update Skills ✏
                            </span>
                        </Link>
                    </motion.div>

                    {/* Collaboration quote */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                        className="bg-[#0d1421] border border-dashed border-white/5 rounded-2xl p-6 relative overflow-hidden"
                    >
                        <h3 className="font-heading text-white font-semibold text-lg mb-3">
                            Collaboration is the Core
                        </h3>
                        <p className="text-white/40 text-sm italic leading-relaxed">
                            &ldquo;The best software isn&apos;t built alone. It&apos;s forged in the fires of
                            collective intelligence and diverse perspective.&rdquo;
                        </p>
                        {/* Subtle dot pattern */}
                        <div
                            className="absolute bottom-0 right-0 w-28 h-28 opacity-[0.07]"
                            style={{
                                backgroundImage: "radial-gradient(circle, #00e5ff 1px, transparent 1px)",
                                backgroundSize: "8px 8px",
                            }}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Quick Tips + Community Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Quick Tips */}
                <div>
                    <p className="text-white/25 text-[11px] font-mono uppercase tracking-[0.18em] mb-5">
                        Quick Tips
                    </p>
                    <div className="space-y-5">
                        {[
                            {
                                Icon: Zap, iconColor: "text-[#00e5ff]",
                                bg: "bg-[#00e5ff]/10 border-[#00e5ff]/20",
                                title: "Optimize your tech stack",
                                desc: "Tags help the algorithm match you with relevant projects.",
                            },
                            {
                                Icon: Users, iconColor: "text-[#7c3aed]",
                                bg: "bg-[#7c3aed]/10 border-[#7c3aed]/20",
                                title: "Engage in Community",
                                desc: "Join the #general channel to introduce yourself to other devs.",
                            },
                        ].map(({ Icon, iconColor, bg, title, desc }, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="flex items-start gap-4"
                            >
                                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${bg}`}>
                                    <Icon size={15} className={iconColor} />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-semibold mb-0.5">{title}</p>
                                    <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Community Highlights */}
                <div>
                    <p className="text-white/25 text-[11px] font-mono uppercase tracking-[0.18em] mb-5">
                        Community Highlights
                    </p>
                    <motion.div
                        initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
                        className="bg-[#0d1421] border border-white/5 rounded-2xl p-5"
                    >
                        <div className="flex items-start gap-3 mb-4">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-[#0a0f1a] font-bold text-sm shrink-0"
                                style={{ background: "linear-gradient(135deg, #00e5ff, #7c3aed)" }}
                            >
                                S
                            </div>
                            <div>
                                <p className="text-white text-sm font-semibold mb-0.5">
                                    Sarah just launched{" "}
                                    <span className="text-[#00e5ff]">&ldquo;NeuralFlow AI&rdquo;</span>
                                </p>
                                <p className="text-white/30 text-xs font-mono">
                                    Looking for: Rust Developers, UX Designers
                                </p>
                            </div>
                        </div>
                        <button className="w-full text-xs font-mono text-white/40 border border-white/10 rounded-xl py-2.5 hover:border-[#00e5ff]/30 hover:text-[#00e5ff] transition-colors">
                            View Mission Details
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-white/5 pt-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <p className="text-white font-heading font-bold text-lg mb-1">DevMatch</p>
                        <p className="text-white/25 text-xs font-mono leading-relaxed">
                            © 2024 DevMatch.<br />Engineering the Future.
                        </p>
                    </div>
                    <div>
                        <p className="text-white/25 text-[10px] font-mono uppercase tracking-widest mb-3">Product</p>
                        <div className="space-y-2">
                            {["About", "Docs"].map(t => (
                                <p key={t} className="text-white/50 text-sm hover:text-white cursor-pointer transition-colors">{t}</p>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-white/25 text-[10px] font-mono uppercase tracking-widest mb-3">Legal</p>
                        <div className="space-y-2">
                            {["Privacy", "Terms"].map(t => (
                                <p key={t} className="text-white/50 text-sm hover:text-white cursor-pointer transition-colors">{t}</p>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-white/25 text-[10px] font-mono uppercase tracking-widest mb-3">Social</p>
                        <div className="flex items-center gap-2">
                            {[Mail, GitBranch, Globe].map((Icon, i) => (
                                <div key={i} className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#00e5ff] hover:border-[#00e5ff]/20 cursor-pointer transition-colors">
                                    <Icon size={14} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}