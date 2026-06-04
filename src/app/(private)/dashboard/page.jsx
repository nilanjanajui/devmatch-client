"use client";
import { useHasMounted } from "@/hooks/useHasMounted";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import {
    FolderOpen, Users, CheckCircle, Eye, Plus, ArrowRight,
    Compass, User, Zap, Mail, GitBranch, Globe
} from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

const chartData = [
    { day: "Mon", apps: 30 }, { day: "Tue", apps: 65 },
    { day: "Wed", apps: 50 }, { day: "Thu", apps: 90 },
    { day: "Fri", apps: 75 }, { day: "Sat", apps: 110 },
    { day: "Sun", apps: 130 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
        return (
            <div className="bg-[#0d1421] border border-[#00e5ff]/20 rounded-lg px-3 py-2">
                <p className="text-[#00e5ff] text-xs font-mono">{label}: {payload[0].value}</p>
            </div>
        );
    }
    return null;
};

// ── Empty state when user has no data yet ─────────────────────────────────
function EmptyDashboard({ firstName }) {
    return (
        <div className="pb-10">
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
                    {/* Create Project  (2 cols) */}
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
                                Get Started <ArrowRight size={14} />
                            </motion.span>
                        </Link>
                    </motion.div>

                    {/* Explore Missions  (1 col) */}
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

// ── Main dashboard ─────────────────────────────────────────────────────────
export default function DashboardOverview() {
    const { user } = useAuth();
    const mounted = useHasMounted();

    const firstName = mounted ? (user?.name?.split(" ")[0] ?? "there") : "there";
    const fullName = mounted ? (user?.name ?? "Developer") : "Developer";
    const avatar = mounted ? (user?.name ?? "D").charAt(0) : "D";

    // Fetch real data
    const { data: myProjects = [] } = useQuery({
        queryKey: ["my-projects"],
        queryFn: () => axiosInstance.get("/projects?mine=true").then(r => r.data.projects ?? []),
        enabled: !!user?.id,
    });

    const { data: myApplications = [] } = useQuery({
        queryKey: ["my-applications"],
        queryFn: () => axiosInstance.get("/applications").then(r => r.data),
        enabled: !!user?.id,
    });

    const { data: profile } = useQuery({
        queryKey: ["profile", user?.id],
        queryFn: () => axiosInstance.get(`/users/${user.id}`).then(r => r.data),
        enabled: !!user?.id,
    });

    // Compute real stats
    const totalApplicants = myProjects.reduce((sum, p) => sum + (p.application_count ?? 0), 0);
    const acceptedApps = myApplications.filter(a => a.status === "accepted").length;
    const hasAnyData = myProjects.length > 0 || myApplications.length > 0 || profile?.skills?.length > 0;

    const stats = [
        { label: "Projects Created", value: String(myProjects.length), badge: myProjects.length > 0 ? "active" : "start now", icon: FolderOpen },
        { label: "Applications Received", value: String(totalApplicants), badge: totalApplicants > 0 ? `${totalApplicants} total` : "none yet", icon: Users },
        { label: "Accepted", value: String(acceptedApps), badge: acceptedApps > 0 ? "congrats!" : "pending", icon: CheckCircle },
        { label: "Profile Views", value: "—", badge: "coming soon", icon: Eye },
    ];

    // Build activity from real data
    const activity = [
        ...myApplications.slice(0, 2).map(a => ({
            type: a.status === "accepted" ? "approved" : "join",
            text: `Your application for ${a.projectTitle ?? "a project"} is ${a.status}.`,
            time: new Date(a.createdAt).toLocaleDateString(),
        })),
        ...myProjects.slice(0, 2).map(p => ({
            type: "pr",
            text: `You created "${p.title}"`,
            time: new Date(p.createdAt).toLocaleDateString(),
        })),
    ].slice(0, 4);

    return (
        <div className="max-w-6xl mx-auto pt-12 md:pt-2 pb-10">
            {!hasAnyData ? (
                // ── Empty / onboarding state — self-contained ──────────────
                <EmptyDashboard firstName={firstName} />
            ) : (
                // ── Populated state — header + real data ───────────────────
                <>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                            <h1 className="text-4xl font-bold text-white font-mono leading-tight">
                                Welcome back, <span suppressHydrationWarning>{firstName}</span>.
                            </h1>
                            <p className="text-white/40 text-sm font-mono mt-1.5">
                                Your ecosystem is looking healthy.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                            className="flex items-center gap-3 bg-[#0d1421] border border-white/5 rounded-xl px-4 py-2.5 self-start shrink-0"
                        >
                            <div className="text-right">
                                <p className="text-white text-sm font-mono font-semibold" suppressHydrationWarning>{fullName}</p>
                                <p className="text-[#00e5ff] text-xs font-mono">
                                    {profile?.skills?.[0]
                                        ? `${profile.skills[0].level} ${profile.skills[0].name} Dev`
                                        : "Developer"}
                                </p>
                            </div>
                            <div className="relative">
                                {mounted && user?.image ? (
                                    <Image src={user.image} alt={fullName} width={40} height={40}
                                        className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                                ) : (
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-[#0a0f1a] font-bold text-sm font-mono"
                                        style={{ background: "linear-gradient(135deg, #00e5ff, #7c3aed)" }}
                                        suppressHydrationWarning
                                    >{avatar}</div>
                                )}
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0a0f1a]" />
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Stats, Chart, Activity, Tech Stack — unchanged ── */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                        {stats.map((s, i) => <StatsCard key={s.label} {...s} delay={i * 0.08} />)}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 mb-5">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                            className="bg-[#0d1421] border border-white/5 rounded-2xl p-5"
                        >
                            <div className="flex items-start justify-between mb-5">
                                <div>
                                    <h3 className="text-white font-mono font-semibold text-sm">Application Trends</h3>
                                    <p className="text-white/30 text-xs font-mono mt-0.5">Tracking growth across your tech stack</p>
                                </div>
                                <div className="flex gap-1">
                                    <button className="px-3 py-1 rounded-md text-xs font-mono bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20">Weekly</button>
                                    <button className="px-3 py-1 rounded-md text-xs font-mono text-white/30 hover:text-white/60 transition-colors">Monthly</button>
                                </div>
                            </div>
                            <div className="h-52">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} barCategoryGap="28%" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <XAxis dataKey="day" axisLine={false} tickLine={false}
                                            tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11, fontFamily: "monospace" }} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                                        <Bar dataKey="apps" radius={[4, 4, 0, 0]} activeBar={{ fill: "#00e5ff" }}>
                                            {chartData.map((_, i) => (
                                                <Cell key={i} fill={i === chartData.length - 1 ? "#1e4a5c" : "#1a2e3e"} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="h-full">
                            <ActivityFeed items={activity.length > 0 ? activity : [{ type: "pr", text: "No recent activity yet.", time: "just now" }]} />
                        </motion.div>
                    </div>

                    {profile?.skills?.length > 0 ? (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                            className="bg-[#0d1421] border border-white/5 rounded-2xl p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white font-mono font-semibold text-sm">Your Tech Stack Reputation</h3>
                                <Link href="/dashboard/profile">
                                    <span className="text-white/30 text-xs font-mono hover:text-[#00e5ff] transition-colors">Edit →</span>
                                </Link>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {profile.skills.map(({ name, level }) => (
                                    <div key={name} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:border-white/20 transition-colors">
                                        <span className="w-2 h-2 rounded-full shrink-0 bg-[#00e5ff]" />
                                        <span className="text-white/90 text-xs font-mono font-medium">{name}</span>
                                        <span className="text-white/35 text-xs font-mono">{level}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                            className="bg-[#0d1421] border border-white/5 border-dashed rounded-2xl p-6 text-center">
                            <p className="text-white/30 font-mono text-sm mb-3">You haven&apos;t added any skills yet.</p>
                            <Link href="/dashboard/profile">
                                <span className="text-[#00e5ff] font-mono text-xs hover:underline">Add skills to your profile →</span>
                            </Link>
                        </motion.div>
                    )}
                </>
            )}
        </div>
    );
}