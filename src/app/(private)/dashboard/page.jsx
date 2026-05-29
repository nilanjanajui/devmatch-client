"use client";
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
    const firstName = user?.name?.split(" ")[0] ?? "Alex";

    return (
        <div className="max-w-6xl mx-auto pt-10 md:pt-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl md:text-4xl font-bold text-white font-mono">
                        Welcome back, {firstName}.
                    </h1>
                    <p className="text-white/40 text-sm font-mono mt-1">
                        Your ecosystem is looking healthy. 3 new requests today.
                    </p>
                </motion.div>

                {/* User info card — top right */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 bg-[#0d1421] border border-white/5 rounded-xl px-4 py-2.5 self-start sm:self-auto"
                >
                    <div className="text-right">
                        <p className="text-white text-sm font-mono font-semibold">{user?.name ?? "Alex Rivera"}</p>
                        <p className="text-[#00e5ff] text-xs font-mono">Full-Stack Engineer</p>
                    </div>
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#00e5ff] via-[#00bcd4] to-[#7c3aed] flex items-center justify-center text-[#0a0f1a] font-bold text-sm font-mono">
                            {(user?.name ?? "Alex Rivera").charAt(0)}
                        </div>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0a0f1a]" />
                    </div>
                </motion.div>
            </div>

            {/* Stats Grid — 4 cols on large, 2 on small */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((s, i) => (
                    <StatsCard key={s.label} {...s} delay={i * 0.08} />
                ))}
            </div>

            {/* Chart + Activity Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 mb-6">
                {/* Bar Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="bg-[#0d1421] border border-white/5 rounded-2xl p-6"
                >
                    <div className="flex items-start justify-between mb-1">
                        <div>
                            <h3 className="text-white font-mono font-semibold text-sm">Application Trends</h3>
                            <p className="text-white/30 text-xs font-mono mt-0.5">Tracking growth across your tech stack</p>
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

                    <div className="h-52 mt-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} barCategoryGap="30%" barGap={4}>
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "monospace" }}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                                <Bar dataKey="apps" radius={[4, 4, 0, 0]} activeBar={{ fill: "#00e5ff" }}>
                                    {chartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={index === chartData.length - 1 ? "#1e4a5a" : "#1a2d3d"}
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
                >
                    <ActivityFeed items={activity} />
                </motion.div>
            </div>

            {/* Tech Stack Reputation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="bg-[#0d1421] border border-white/5 rounded-2xl p-6"
            >
                <h3 className="text-white font-mono font-semibold text-sm mb-4">Your Tech Stack Reputation</h3>
                <div className="flex flex-wrap gap-3">
                    {techStack.map(({ name, level, color }) => (
                        <div
                            key={name}
                            className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:border-white/20 transition-colors"
                        >
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                            <span className="text-white/80 text-xs font-mono">{name}</span>
                            <span className="text-white/40 text-xs font-mono">{level}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}