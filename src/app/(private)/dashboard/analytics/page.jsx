"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
    TrendingUp, FolderKanban, Inbox, Send,
    Sparkles, Clock, CheckCircle2, XCircle,
} from "lucide-react";
import axiosInstance from "@/lib/axios";

// ── shared design tokens (matches dashboard/page.jsx) ──
const BG = "#0b1326";
const CARD_BG = "rgba(15, 23, 42, 0.65)";
const BORDER = "rgba(173, 198, 255, 0.1)";
const ACCENT = "#adc6ff";
const CYAN = "#4cd7f6";
const MUTED = "rgba(194, 198, 214, 0.7)";

const STATUS_COLORS = { pending: "#facc15", accepted: "#4ade80", rejected: "#f87171" };

const cardStyle = {
    background: CARD_BG,
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: `1px solid ${BORDER}`,
    borderRadius: "16px",
    padding: "24px",
};

const labelStyle = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: MUTED,
};

function KpiCard({ icon: Icon, label, value, accent, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            style={{ ...cardStyle, display: "flex", flexDirection: "column", gap: "14px" }}
        >
            <div style={{
                width: "38px", height: "38px", borderRadius: "10px",
                background: `${accent}1a`, display: "flex",
                alignItems: "center", justifyContent: "center",
            }}>
                <Icon size={18} color={accent} />
            </div>
            <div>
                <p style={{ ...labelStyle, marginBottom: "6px" }}>{label}</p>
                <p style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "28px", fontWeight: 700, color: "#dae2fd", margin: 0,
                }}>
                    {value}
                </p>
            </div>
        </motion.div>
    );
}

function StatusPill({ status, count }) {
    const icons = { pending: Clock, accepted: CheckCircle2, rejected: XCircle };
    const Icon = icons[status];
    const color = STATUS_COLORS[status];
    return (
        <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "8px 12px", borderRadius: "10px",
            background: `${color}14`, border: `1px solid ${color}33`,
        }}>
            <Icon size={13} color={color} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#dae2fd" }}>
                {count}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: MUTED, textTransform: "capitalize" }}>
                {status}
            </span>
        </div>
    );
}

function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background: "#0d1421", border: `1px solid ${BORDER}`,
            borderRadius: "8px", padding: "8px 12px",
            fontFamily: "'JetBrains Mono', monospace", fontSize: "12px",
        }}>
            <p style={{ color: MUTED, margin: 0, marginBottom: "2px" }}>{label}</p>
            <p style={{ color: CYAN, margin: 0, fontWeight: 700 }}>{payload[0].value} applications</p>
        </div>
    );
}

export default function AnalyticsPage() {
    const { data, isLoading } = useQuery({
        queryKey: ["analytics-overview"],
        queryFn: () => axiosInstance.get("/analytics/overview").then((r) => r.data),
    });

    if (isLoading) {
        return (
            <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "13px" }}>
                    Crunching the numbers…
                </p>
            </div>
        );
    }

    const totals = data?.totals ?? { projectsOwned: 0, applicationsReceived: 0, applicationsSent: 0 };
    const stats = data?.stats ?? { contributionScore: 0 };
    const trend = data?.trend ?? [];
    const receivedStatus = data?.receivedStatus ?? { pending: 0, accepted: 0, rejected: 0 };
    const sentStatus = data?.sentStatus ?? { pending: 0, accepted: 0, rejected: 0 };
    const topProjects = data?.topProjects ?? [];

    const pieData = Object.entries(receivedStatus)
        .map(([status, value]) => ({ name: status, value }))
        .filter((d) => d.value > 0);

    const maxApplications = Math.max(...topProjects.map((p) => p.applicationCount), 1);
    const hasAnyActivity = totals.projectsOwned > 0 || totals.applicationsSent > 0;

    return (
        <div style={{ paddingTop: "8px", paddingBottom: "40px" }}>
            {/* ── Header ── */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: "30px",
                    fontWeight: 700, color: "#dae2fd", margin: 0, marginBottom: "6px",
                }}>
                    Analytics
                </h1>
                <p style={{ ...labelStyle, textTransform: "none", letterSpacing: "normal", fontSize: "13px", marginBottom: "32px" }}>
                    Your activity across DevMatch, at a glance.
                </p>
            </motion.div>

            {!hasAnyActivity ? (
                <div style={{ ...cardStyle, textAlign: "center", padding: "60px 24px" }}>
                    <Sparkles size={28} color={ACCENT} style={{ marginBottom: "12px" }} />
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#dae2fd", fontSize: "14px", marginBottom: "6px" }}>
                        No activity yet
                    </p>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "12px" }}>
                        Create a project or apply to one to start seeing analytics here.
                    </p>
                </div>
            ) : (
                <>
                    {/* ── KPI row ── */}
                    <div style={{
                        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "16px", marginBottom: "24px",
                    }}>
                        <KpiCard icon={FolderKanban} label="Projects Owned" value={totals.projectsOwned} accent={ACCENT} delay={0} />
                        <KpiCard icon={Inbox} label="Applications Received" value={totals.applicationsReceived} accent={CYAN} delay={0.05} />
                        <KpiCard icon={Send} label="Applications Sent" value={totals.applicationsSent} accent={ACCENT} delay={0.1} />
                        <KpiCard icon={TrendingUp} label="Contribution Score" value={stats.contributionScore} accent={CYAN} delay={0.15} />
                    </div>

                    {/* ── Trend + status breakdown ── */}
                    <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "16px", marginBottom: "16px" }}>
                        {/* Trend chart */}
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={cardStyle}>
                            <p style={{ ...labelStyle, marginBottom: "20px" }}>Applications Received — Last 6 Months</p>
                            <div style={{ width: "100%", height: "220px" }}>
                                <ResponsiveContainer>
                                    <AreaChart data={trend} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor={CYAN} stopOpacity={0.35} />
                                                <stop offset="100%" stopColor={CYAN} stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                                        <XAxis
                                            dataKey="month"
                                            tick={{ fill: MUTED, fontSize: 11, fontFamily: "JetBrains Mono" }}
                                            axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                                            tickLine={false}
                                        />
                                        <YAxis
                                            allowDecimals={false}
                                            tick={{ fill: MUTED, fontSize: 11, fontFamily: "JetBrains Mono" }}
                                            axisLine={false}
                                            tickLine={false}
                                            width={28}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="applications"
                                            stroke={CYAN}
                                            strokeWidth={2}
                                            fill="url(#trendFill)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* Received status donut */}
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} style={cardStyle}>
                            <p style={{ ...labelStyle, marginBottom: "12px" }}>Received — By Status</p>
                            {pieData.length === 0 ? (
                                <p style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "12px", padding: "40px 0", textAlign: "center" }}>
                                    No applications yet
                                </p>
                            ) : (
                                <>
                                    <div style={{ width: "100%", height: "150px" }}>
                                        <ResponsiveContainer>
                                            <PieChart>
                                                <Pie
                                                    data={pieData}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    innerRadius={45}
                                                    outerRadius={68}
                                                    paddingAngle={3}
                                                    stroke="none"
                                                >
                                                    {pieData.map((entry) => (
                                                        <Cell key={entry.name} fill={STATUS_COLORS[entry.name]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip content={<CustomTooltip />} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                                        {Object.entries(receivedStatus).map(([status, count]) => (
                                            <StatusPill key={status} status={status} count={count} />
                                        ))}
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </div>

                    {/* ── Bottom row: top projects + sent status ── */}
                    <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "16px" }}>
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={cardStyle}>
                            <p style={{ ...labelStyle, marginBottom: "18px" }}>Top Projects by Applications</p>
                            {topProjects.length === 0 ? (
                                <p style={{ fontFamily: "'JetBrains Mono', monospace", color: MUTED, fontSize: "12px" }}>
                                    You haven&apos;t created any projects yet.
                                </p>
                            ) : (
                                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                    {topProjects.map((p) => (
                                        <div key={p.id}>
                                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                                                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#dae2fd", fontWeight: 500 }}>
                                                    {p.title}
                                                </span>
                                                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: MUTED }}>
                                                    {p.applicationCount} / {p.teamSize} spots
                                                </span>
                                            </div>
                                            <div style={{ height: "6px", borderRadius: "4px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${Math.min((p.applicationCount / maxApplications) * 100, 100)}%` }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                    style={{ height: "100%", background: `linear-gradient(90deg, ${ACCENT}, ${CYAN})`, borderRadius: "4px" }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={cardStyle}>
                            <p style={{ ...labelStyle, marginBottom: "18px" }}>Sent — By Status</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                {Object.entries(sentStatus).map(([status, count]) => (
                                    <StatusPill key={status} status={status} count={count} />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </div>
    );
}