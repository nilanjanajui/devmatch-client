"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import axiosInstance from "@/lib/axios";
import PostCard from "@/components/community/PostCard";
import CommunityFilterSidebar from "@/components/community/CommunityFilterSidebar";

const SORT_OPTIONS = [
    { label: "Trending Now", value: "trending" },
    { label: "Most Recent", value: "recent" },
    { label: "Most Liked", value: "most_liked" },
];

const DEFAULT_FILTERS = { categories: [], levels: [], stacks: [] };

/* ── Skeleton ── */
function SkeletonCard() {
    return (
        <div style={{ background: "#0a0e1e", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ height: 200, background: "rgba(255,255,255,0.04)" }} />
            <div style={{ padding: "16px 20px 20px" }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                    {[60, 80, 50].map((w) => <div key={w} style={{ height: 18, width: w, borderRadius: 4, background: "rgba(255,255,255,0.06)" }} />)}
                </div>
                <div style={{ height: 22, width: "72%", borderRadius: 6, background: "rgba(255,255,255,0.07)", marginBottom: 10 }} />
                <div style={{ height: 13, width: "100%", borderRadius: 4, background: "rgba(255,255,255,0.04)", marginBottom: 6 }} />
                <div style={{ height: 13, width: "80%", borderRadius: 4, background: "rgba(255,255,255,0.04)", marginBottom: 20 }} />
                <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ height: 12, width: "45%", borderRadius: 4, background: "rgba(255,255,255,0.06)", marginBottom: 5 }} />
                        <div style={{ height: 10, width: "28%", borderRadius: 4, background: "rgba(255,255,255,0.04)" }} />
                    </div>
                </div>
                <div style={{ height: 38, borderRadius: 10, background: "rgba(255,255,255,0.04)" }} />
            </div>
        </div>
    );
}

/* ── Pagination ── */
function Pagination({ page, totalPages, onPageChange }) {
    const pages = [];
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        pages.push(1);
        if (page > 3) pages.push("...");
        for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
        if (page < totalPages - 2) pages.push("...");
        pages.push(totalPages);
    }
    const btn = (active) => ({
        width: 36, height: 36, borderRadius: 8,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 600, cursor: active ? "default" : "pointer",
        background: active ? "#3B82F6" : "rgba(255,255,255,0.04)",
        border: active ? "none" : "1px solid rgba(255,255,255,0.1)",
        color: active ? "#fff" : "rgba(255,255,255,0.6)",
        transition: "all 0.15s",
    });
    return (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, marginTop: 48 }}
        >
            <motion.button onClick={() => page > 1 && onPageChange(page - 1)} whileHover={page > 1 ? { scale: 1.08 } : {}} whileTap={page > 1 ? { scale: 0.95 } : {}}
                style={{ ...btn(false), opacity: page === 1 ? 0.3 : 1 }}>←</motion.button>
            {pages.map((p, i) =>
                p === "..." ? (
                    <span key={`e${i}`} style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, padding: "0 4px" }}>···</span>
                ) : (
                    <motion.button key={p} onClick={() => onPageChange(p)}
                        whileHover={p !== page ? { scale: 1.08, background: "rgba(59,130,246,0.15)" } : {}}
                        whileTap={p !== page ? { scale: 0.95 } : {}}
                        style={btn(p === page)}>{p}</motion.button>
                )
            )}
            <motion.button onClick={() => page < totalPages && onPageChange(page + 1)}
                whileHover={page < totalPages ? { scale: 1.08 } : {}} whileTap={page < totalPages ? { scale: 0.95 } : {}}
                style={{ ...btn(false), opacity: page === totalPages ? 0.3 : 1 }}>→</motion.button>
        </motion.div>
    );
}

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

/* ── Page ── */
export default function CommunityPage() {
    const searchRef = useRef(null);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [sort, setSort] = useState("trending");
    const [page, setPage] = useState(1);
    const [sortOpen, setSortOpen] = useState(false);

    // debounce
    useEffect(() => { const t = setTimeout(() => setDebouncedSearch(search), 400); return () => clearTimeout(t); }, [search]);

    // Ctrl+B shortcut (matches design)
    useEffect(() => {
        const fn = (e) => { if ((e.ctrlKey || e.metaKey) && e.key === "b") { e.preventDefault(); searchRef.current?.focus(); } };
        window.addEventListener("keydown", fn);
        return () => window.removeEventListener("keydown", fn);
    }, []);

    // reset page on filter change
    const resetKey = useMemo(() => `${debouncedSearch}-${JSON.stringify(filters)}-${sort}`, [debouncedSearch, filters, sort]);
    const resetKeyRef = useRef(resetKey);
    useEffect(() => { if (resetKeyRef.current !== resetKey) { setPage(1); resetKeyRef.current = resetKey; } }, [resetKey]);

    const params = useMemo(() => {
        const p = { sort, page };
        if (debouncedSearch) p.search = debouncedSearch;
        if (filters.categories.length === 1) p.type = filters.categories[0];
        if (filters.levels.length === 1) p.level = filters.levels[0];
        if (filters.stacks.length) p.stack = filters.stacks;
        return p;
    }, [debouncedSearch, filters, sort, page]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["community-posts", params],
        queryFn: async () => (await axiosInstance.get("/posts", { params })).data,
        staleTime: 30_000,
    });

    const posts = data?.posts ?? [];
    const total = data?.total ?? 0;
    const totalPages = data?.totalPages ?? 1;

    const handleReset = useCallback(() => { setFilters(DEFAULT_FILTERS); setSearch(""); setSort("trending"); setPage(1); }, []);

    return (
        <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.08) 0%, transparent 70%)" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: 36 }}>
                    <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 800, color: "#fff", margin: "0 0 8px", lineHeight: 1.15 }}>
                        Developer Community
                    </h1>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.48)", margin: 0, maxWidth: 480, lineHeight: 1.6 }}>
                        Join the conversation, showcase your latest builds, and find your next breakthrough collaboration.
                    </p>
                </motion.div>

                {/* Search */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }} style={{ position: "relative", marginBottom: 36 }}>
                    <Search size={16} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", pointerEvents: "none" }} />
                    <input
                        ref={searchRef}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search discussions, snippets, or developers..."
                        style={{ width: "100%", padding: "14px 90px 14px 44px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff", fontSize: 14, fontFamily: "'JetBrains Mono', monospace", outline: "none", transition: "border-color 0.2s, box-shadow 0.2s" }}
                        onFocus={(e) => { e.target.style.borderColor = "rgba(59,130,246,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.08)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                    />
                    <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, padding: "3px 8px" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em" }}>CTRL + B</span>
                    </div>
                </motion.div>

                {/* Layout */}
                <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
                    <CommunityFilterSidebar filters={filters} onChange={setFilters} onReset={handleReset} />

                    <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Results bar */}
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}
                        >
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                                <span style={{ color: "#fff", fontWeight: 600 }}>{total.toLocaleString()}</span> active discussions found
                            </p>

                            {/* Sort dropdown */}
                            <div style={{ position: "relative" }}>
                                <motion.button onClick={() => setSortOpen((v) => !v)} whileTap={{ scale: 0.97 }}
                                    style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 14px", fontSize: 13, color: "#fff", cursor: "pointer" }}
                                >
                                    <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>Sort by:</span>
                                    {SORT_OPTIONS.find((o) => o.value === sort)?.label}
                                    <motion.span animate={{ rotate: sortOpen ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>▼</motion.span>
                                </motion.button>
                                <AnimatePresence>
                                    {sortOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.96 }} transition={{ duration: 0.15 }}
                                            style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, background: "#0f1729", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, overflow: "hidden", minWidth: 160, zIndex: 50, boxShadow: "0 16px 40px rgba(0,0,0,0.4)" }}
                                        >
                                            {SORT_OPTIONS.map((opt) => (
                                                <motion.div key={opt.value} onClick={() => { setSort(opt.value); setSortOpen(false); }} whileHover={{ background: "rgba(59,130,246,0.12)" }}
                                                    style={{ padding: "10px 16px", fontSize: 13, cursor: "pointer", color: sort === opt.value ? "#3B82F6" : "rgba(255,255,255,0.7)", fontWeight: sort === opt.value ? 600 : 400 }}
                                                >
                                                    {sort === opt.value && <span style={{ marginRight: 8 }}>✓</span>}
                                                    {opt.label}
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/* Cards */}
                        {isLoading ? (
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
                                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                            </div>
                        ) : isError ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                style={{ textAlign: "center", padding: "80px 0", color: "rgba(255,255,255,0.4)", fontSize: 14 }}
                            >
                                <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
                                <p>Could not connect to the server. Make sure your backend is running.</p>
                            </motion.div>
                        ) : posts.length === 0 ? (
                            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                                style={{ textAlign: "center", padding: "80px 0", color: "rgba(255,255,255,0.4)", fontSize: 14 }}
                            >
                                <div style={{ fontSize: 40, marginBottom: 16 }}>💬</div>
                                <p style={{ fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>No discussions found</p>
                                <p>Try adjusting your filters or be the first to post!</p>
                                <motion.button onClick={handleReset} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                                    style={{ marginTop: 20, padding: "10px 24px", borderRadius: 8, background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.35)", color: "#3B82F6", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                                >
                                    Reset Filters
                                </motion.button>
                            </motion.div>
                        ) : (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${debouncedSearch}-${page}-${JSON.stringify(filters)}`}
                                    variants={grid} initial="hidden" animate="show" exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                    style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}
                                >
                                    {posts.map((post, i) => <PostCard key={post._id} post={post} index={i} />)}
                                </motion.div>
                            </AnimatePresence>
                        )}

                        {!isLoading && totalPages > 1 && (
                            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}