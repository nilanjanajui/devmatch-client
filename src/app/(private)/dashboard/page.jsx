"use client";
import { useHasMounted } from "@/hooks/useHasMounted";
import Image from "next/image";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { FolderOpen, Users, CheckCircle, Eye } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import { useAuth } from "@/context/AuthContext";

const chartData = [
    { day: "Mon", apps: 30 },
    { day: "Tue", apps: 65 },
    { day: "Wed", apps: 50 },
    { day: "Thu", apps: 90 },
    { day: "Fri", apps: 75 },
    { day: "Sat", apps: 110 },
    { day: "Sun", apps: 130 },
];

const stats = [
    { label: "Projects Created", value: "24", badge: "+12%", icon: FolderOpen },
    { label: "Applications Received", value: "156", badge: "+5 today", icon: Users },
    { label: "Accepted Status", value: "12", badge: "89% rate", icon: CheckCircle },
    { label: "Profile Views", value: "1.2k", badge: "+432", icon: Eye },
];

const activity = [
    { type: "join", text: "Sarah Chen requested to join Neural-Link", time: "2 mins ago" },
    { type: "approved", text: "Project Quantum-Dash was approved for Beta.", time: "45 mins ago" },
    { type: "pr", text: "New pull request in DevMatch-Core", time: "2 hours ago" },
    { type: "message", text: "Marcus sent a direct message", time: "5 hours ago" },
];

const techStack = [
    { name: "React & Next.js", level: "Expert", color: "#00e5ff" },
    { name: "Rust Ecosystem", level: "Advanced", color: "#00bcd4" },
    { name: "PostgreSQL", level: "Senior", color: "#7c3aed" },
    { name: "Kubernetes", level: "Intermediate", color: "#2196f3" },
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

export default function DashboardOverview() {
    const { user } = useAuth();
    const mounted = useHasMounted();

    const firstName = mounted ? (user?.name?.split(" ")[0] ?? "Alex") : "Alex";
    const fullName = mounted ? (user?.name ?? "Alex Rivera") : "Alex Rivera";
    const avatar = mounted ? (user?.name ?? "A").charAt(0) : "A";

    return (
        <div className="max-w-6xl mx-auto pt-12 md:pt-2 pb-10">

            {/* ── Header ─────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">

                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h1 className="text-4xl font-bold text-white font-mono leading-tight">
                        Welcome back, <span suppressHydrationWarning>{firstName}</span>.
                    </h1>
                    <p className="text-white/40 text-sm font-mono mt-1.5">
                        Your ecosystem is looking healthy. 3 new requests today.
                    </p>
                </motion.div>

                {/* User card */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 bg-[#0d1421] border border-white/5 rounded-xl px-4 py-2.5 self-start shrink-0"
                >
                    <div className="text-right">
                        <p
                            className="text-white text-sm font-mono font-semibold"
                            suppressHydrationWarning
                        >
                            {fullName}
                        </p>
                        <p className="text-[#00e5ff] text-xs font-mono">Full-Stack Engineer</p>
                    </div>

                    <div className="relative">
                        {mounted && user?.image ? (
                            <Image
                                src={user.image}
                                alt={fullName}
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-[#0a0f1a] font-bold text-sm font-mono"
                                style={{ background: "linear-gradient(135deg, #00e5ff, #7c3aed)" }}
                                suppressHydrationWarning
                            >
                                {avatar}
                            </div>
                        )}
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0a0f1a]" />
                    </div>
                </motion.div>
            </div>

            {/* ── Stats Grid ─────────────────────────────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                {stats.map((s, i) => (
                    <StatsCard key={s.label} {...s} delay={i * 0.08} />
                ))}
            </div>

            {/* ── Chart + Activity ───────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 mb-5">

                {/* Bar Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="bg-[#0d1421] border border-white/5 rounded-2xl p-5"
                >
                    <div className="flex items-start justify-between mb-5">
                        <div>
                            <h3 className="text-white font-mono font-semibold text-sm">
                                Application Trends
                            </h3>
                            <p className="text-white/30 text-xs font-mono mt-0.5">
                                Tracking growth across your tech stack
                            </p>
                        </div>
                        <div className="flex gap-1">
                            <button className="px-3 py-1 rounded-md text-xs font-mono bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20">
                                Weekly
                            </button>
                            <button className="px-3 py-1 rounded-md text-xs font-mono text-white/30 hover:text-white/60 transition-colors">
                                Monthly
                            </button>
                        </div>
                    </div>

                    <div className="h-52.5">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                barCategoryGap="28%"
                                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                            >
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fill: "rgba(255,255,255,0.25)",
                                        fontSize: 11,
                                        fontFamily: "monospace",
                                    }}
                                />
                                <Tooltip
                                    content={<CustomTooltip />}
                                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                                />
                                <Bar dataKey="apps" radius={[4, 4, 0, 0]} activeBar={{ fill: "#00e5ff" }}>
                                    {chartData.map((_, i) => (
                                        <Cell
                                            key={i}
                                            fill={i === chartData.length - 1 ? "#1e4a5c" : "#1a2e3e"}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Activity Feed */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="h-full"
                >
                    <ActivityFeed items={activity} />
                </motion.div>
            </div>

            {/* ── Tech Stack Reputation ──────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="bg-[#0d1421] border border-white/5 rounded-2xl p-5"
            >
                <h3 className="text-white font-mono font-semibold text-sm mb-4">
                    Your Tech Stack Reputation
                </h3>
                <div className="flex flex-wrap gap-3">
                    {techStack.map(({ name, level, color }) => (
                        <div
                            key={name}
                            className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:border-white/20 transition-colors"
                        >
                            <span
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: color }}
                            />
                            <span className="text-white/90 text-xs font-mono font-medium">{name}</span>
                            <span className="text-white/35 text-xs font-mono">{level}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}