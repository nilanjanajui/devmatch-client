"use client";
import { useHasMounted } from "@/hooks/useHasMounted";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { FolderOpen, Users, CheckCircle, Eye, Plus, ArrowRight } from "lucide-react";
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
        <div className="max-w-2xl mx-auto text-center py-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div
                    className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(124,58,237,0.15))", border: "1px solid rgba(0,229,255,0.2)" }}
                >
                    <FolderOpen size={32} className="text-[#00e5ff]" />
                </div>
                <h2 className="text-white font-mono font-bold text-2xl mb-2">
                    Welcome, {firstName}!
                </h2>
                <p className="text-white/40 font-mono text-sm mb-8 leading-relaxed">
                    Your dashboard is ready. Start by creating your first project<br />
                    or explore what other developers are building.
                </p>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                    <Link href="/dashboard/projects/new">
                        <motion.button
                            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 bg-[#00e5ff] text-[#0a0f1a] font-bold font-mono text-sm px-5 py-3 rounded-xl"
                        >
                            <Plus size={15} /> Create Project
                        </motion.button>
                    </Link>
                    <Link href="/explore">
                        <motion.button
                            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 bg-white/5 border border-white/10 text-white font-mono text-sm px-5 py-3 rounded-xl hover:border-white/20 transition-colors"
                        >
                            Explore Projects <ArrowRight size={15} />
                        </motion.button>
                    </Link>
                </div>

                {/* Quick action cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 text-left">
                    {[
                        { title: "Add your skills", desc: "Let teams know what you can build.", href: "/dashboard/profile", cta: "Edit Profile" },
                        { title: "Browse projects", desc: "Find a team that needs your expertise.", href: "/explore", cta: "Explore" },
                        { title: "Post a project", desc: "Recruit the developers you need.", href: "/dashboard/projects/new", cta: "Create" },
                    ].map((card, i) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="bg-[#0d1421] border border-white/5 rounded-2xl p-5 hover:border-[#00e5ff]/20 transition-colors"
                        >
                            <p className="text-white font-mono font-semibold text-sm mb-1">{card.title}</p>
                            <p className="text-white/40 font-mono text-xs mb-4">{card.desc}</p>
                            <Link href={card.href}>
                                <span className="text-[#00e5ff] font-mono text-xs hover:underline">{card.cta} →</span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
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

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                    <h1 className="text-4xl font-bold text-white font-mono leading-tight">
                        Welcome back, <span suppressHydrationWarning>{firstName}</span>.
                    </h1>
                    <p className="text-white/40 text-sm font-mono mt-1.5">
                        {hasAnyData
                            ? "Your ecosystem is looking healthy."
                            : "Let's get you set up — it only takes a minute."}
                    </p>
                </motion.div>

                {/* User card */}
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
                                className="w-10 h-10 rounded-full object-cover"
                                referrerPolicy="no-referrer"
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

            {/* If brand new user — show onboarding */}
            {!hasAnyData ? (
                <EmptyDashboard firstName={firstName} />
            ) : (
                <>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                        {stats.map((s, i) => (
                            <StatsCard key={s.label} {...s} delay={i * 0.08} />
                        ))}
                    </div>

                    {/* Chart + Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 mb-5">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
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
                                            tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 11, fontFamily: "monospace" }}
                                        />
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

                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 }} className="h-full"
                        >
                            <ActivityFeed items={activity.length > 0 ? activity : [
                                { type: "pr", text: "No recent activity yet.", time: "just now" }
                            ]} />
                        </motion.div>
                    </div>

                    {/* Tech Stack */}
                    {profile?.skills?.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                            className="bg-[#0d1421] border border-white/5 rounded-2xl p-5"
                        >
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
                    )}

                    {/* If they have no skills yet, prompt them */}
                    {!profile?.skills?.length && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                            className="bg-[#0d1421] border border-white/5 border-dashed rounded-2xl p-6 text-center"
                        >
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