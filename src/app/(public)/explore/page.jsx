"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/lib/axios";
import ProjectCard from "@/components/projects/ProjectCard";
import FilterSidebar from "@/components/projects/FilterSidebar";

const SORT_OPTIONS = [
    { label: "Most Recent", value: "recent" },
    { label: "Most Applicants", value: "applicants" },
    { label: "Deadline Soon", value: "deadline" },
];

const DEFAULT_FILTERS = {
    categories: [],
    levels: [],
    teamSize: 10,
    stacks: [],
};

// ── Skeleton card placeholder ──────────────────────────
function SkeletonCard() {
    return (
        <div style={{
            background: "#0a0e1e", border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 16, overflow: "hidden",
        }}>
            <div style={{ height: 190, background: "rgba(255,255,255,0.04)" }} />
            <div style={{ padding: "16px 20px 20px" }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
                    {[60, 80, 50].map((w) => (
                        <div key={w} style={{ height: 18, width: w, borderRadius: 4, background: "rgba(255,255,255,0.06)" }} />
                    ))}
                </div>
                <div style={{ height: 22, width: "70%", borderRadius: 6, background: "rgba(255,255,255,0.07)", marginBottom: 10 }} />
                <div style={{ height: 14, width: "100%", borderRadius: 4, background: "rgba(255,255,255,0.04)", marginBottom: 6 }} />
                <div style={{ height: 14, width: "80%", borderRadius: 4, background: "rgba(255,255,255,0.04)", marginBottom: 20 }} />
                <div style={{ height: 38, borderRadius: 8, background: "rgba(255,255,255,0.04)" }} />
            </div>
        </div>
    );
}

// ── Pagination ─────────────────────────────────────────
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

    const btnStyle = (active) => ({
        width: 36, height: 36, borderRadius: 8,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, fontWeight: 600, cursor: active ? "default" : "pointer",
        background: active ? "#3B82F6" : "rgba(255,255,255,0.04)",
        border: active ? "none" : "1px solid rgba(255,255,255,0.1)",
        color: active ? "#fff" : "rgba(255,255,255,0.6)",
        transition: "all 0.15s",
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, marginTop: 48 }}
        >
            <motion.button
                onClick={() => page > 1 && onPageChange(page - 1)}
                whileHover={page > 1 ? { scale: 1.08 } : {}}
                whileTap={page > 1 ? { scale: 0.95 } : {}}
                style={{ ...btnStyle(false), opacity: page === 1 ? 0.3 : 1 }}
            >
                ←
            </motion.button>

            {pages.map((p, i) =>
                p === "..." ? (
                    <span key={`ellipsis-${i}`} style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, padding: "0 4px" }}>···</span>
                ) : (
                    <motion.button
                        key={p}
                        onClick={() => onPageChange(p)}
                        whileHover={p !== page ? { scale: 1.08, background: "rgba(59,130,246,0.15)" } : {}}
                        whileTap={p !== page ? { scale: 0.95 } : {}}
                        style={btnStyle(p === page)}
                    >
                        {p}
                    </motion.button>
                )
            )}

            <motion.button
                onClick={() => page < totalPages && onPageChange(page + 1)}
                whileHover={page < totalPages ? { scale: 1.08 } : {}}
                whileTap={page < totalPages ? { scale: 0.95 } : {}}
                style={{ ...btnStyle(false), opacity: page === totalPages ? 0.3 : 1 }}
            >
                →
            </motion.button>
        </motion.div>
    );
}

// ── Main Page ──────────────────────────────────────────
export default function ExplorePage() {
    const searchRef = useRef(null);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [filters, setFilters] = useState(DEFAULT_FILTERS);
    const [sort, setSort] = useState("recent");
    const [page, setPage] = useState(1);
    const [sortOpen, setSortOpen] = useState(false);

    // Debounce search input by 400ms
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search), 400);
        return () => clearTimeout(t);
    }, [search]);

    // Ctrl+K focuses search bar
    useEffect(() => {
        const onKey = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                searchRef.current?.focus();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Reset to page 1 when filters/search change
    const pageResetKey = useMemo(
        () => `${debouncedSearch}-${JSON.stringify(filters)}-${sort}`,
        [debouncedSearch, filters, sort]
    );

    const pageResetKeyRef = useRef(pageResetKey);
    useEffect(() => {
        if (pageResetKeyRef.current !== pageResetKey) {
            setPage(1);
            pageResetKeyRef.current = pageResetKey;
        }
    }, [pageResetKey]);

    // Build query params
    const queryParams = {
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(filters.categories.length === 1 && { category: filters.categories[0] }),
        ...(filters.levels.length === 1 && { difficulty: filters.levels[0] }),
        ...(filters.teamSize < 10 && { teamSize: filters.teamSize }),
        page: page,
        limit: 6,
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["projects", queryParams],
        queryFn: () =>
            axiosInstance.get("/projects", { params: queryParams }).then((r) => r.data),
        keepPreviousData: true,
    });

    const projects = data?.projects ?? [];
    const total = data?.total ?? 0;
    const totalPages = data?.totalPages ?? 1;

    const handleReset = useCallback(() => {
        setFilters(DEFAULT_FILTERS);
        setSearch("");
        setSort("recent");
        setPage(1);
    }, []);

    const cardContainerVariants = {
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
    };

    return (
        <div style={{ minHeight: "100vh", padding: "0 24px 80px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>

                {/* ── Hero ── */}
                <div style={{ paddingTop: 52, paddingBottom: 36 }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55 }}
                        style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 52, fontWeight: 700, lineHeight: 1.1,
                            marginBottom: 14,
                            background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                        }}
                    >
                        Forge Your Future
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 480 }}
                    >
                        Discover open-source engineering projects, high-stakes startups,<br />
                        and deep-tech collaborations.
                    </motion.p>
                </div>

                {/* ── Search Bar ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    style={{ marginBottom: 36, position: "relative" }}
                >
                    <div style={{
                        display: "flex", alignItems: "center",
                        background: "rgba(15,23,42,0.7)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 12, padding: "0 16px",
                        transition: "border-color 0.2s",
                    }}>
                        <span style={{ fontSize: 16, color: "rgba(255,255,255,0.3)", marginRight: 12, flexShrink: 0 }}>🔍</span>
                        <input
                            ref={searchRef}
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title, tech stack (e.g. Rust, AI, Web3)..."
                            onFocus={(e) => e.currentTarget.parentElement.style.borderColor = "rgba(59,130,246,0.5)"}
                            onBlur={(e) => e.currentTarget.parentElement.style.borderColor = "rgba(255,255,255,0.1)"}
                            style={{
                                flex: 1, background: "none", border: "none", outline: "none",
                                color: "#fff", fontSize: 14, padding: "16px 0",
                            }}
                        />
                        <div style={{
                            display: "flex", gap: 4, flexShrink: 0,
                            background: "rgba(255,255,255,0.07)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            borderRadius: 6, padding: "3px 8px",
                        }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em" }}>CTRL + K</span>
                        </div>
                    </div>
                </motion.div>

                {/* ── Main Layout ── */}
                <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>

                    {/* Sidebar */}
                    <FilterSidebar filters={filters} onChange={setFilters} onReset={handleReset} />

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>

                        {/* Results bar */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.25 }}
                            style={{
                                display: "flex", justifyContent: "space-between",
                                alignItems: "center", marginBottom: 24,
                            }}
                        >
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                                <span style={{ color: "#fff", fontWeight: 600 }}>{total}</span> projects found matching your stack
                            </p>

                            {/* Sort Dropdown */}
                            <div style={{ position: "relative" }}>
                                <motion.button
                                    onClick={() => setSortOpen((v) => !v)}
                                    whileTap={{ scale: 0.97 }}
                                    style={{
                                        display: "flex", alignItems: "center", gap: 8,
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: 8, padding: "8px 14px",
                                        fontSize: 13, color: "#fff", cursor: "pointer",
                                    }}
                                >
                                    <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12 }}>Sort by:</span>
                                    {SORT_OPTIONS.find((o) => o.value === sort)?.label}
                                    <motion.span
                                        animate={{ rotate: sortOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}
                                    >▼</motion.span>
                                </motion.button>

                                <AnimatePresence>
                                    {sortOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                            transition={{ duration: 0.15 }}
                                            style={{
                                                position: "absolute", top: "calc(100% + 6px)", right: 0,
                                                background: "#0f1729",
                                                border: "1px solid rgba(255,255,255,0.12)",
                                                borderRadius: 10, overflow: "hidden",
                                                minWidth: 160, zIndex: 50,
                                                boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
                                            }}
                                        >
                                            {SORT_OPTIONS.map((opt) => (
                                                <motion.div
                                                    key={opt.value}
                                                    onClick={() => { setSort(opt.value); setSortOpen(false); }}
                                                    whileHover={{ background: "rgba(59,130,246,0.12)" }}
                                                    style={{
                                                        padding: "10px 16px", fontSize: 13, cursor: "pointer",
                                                        color: sort === opt.value ? "#3B82F6" : "rgba(255,255,255,0.7)",
                                                        fontWeight: sort === opt.value ? 600 : 400,
                                                    }}
                                                >
                                                    {opt.value === sort && <span style={{ marginRight: 8 }}>✓</span>}
                                                    {opt.label}
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/* Cards Grid */}
                        {isLoading ? (
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
                                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                            </div>
                        ) : isError ? (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                style={{
                                    textAlign: "center", padding: "80px 0",
                                    color: "rgba(255,255,255,0.4)", fontSize: 14,
                                }}
                            >
                                <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
                                <p>Could not connect to the server. Make sure your backend is running.</p>
                            </motion.div>
                        ) : projects.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    textAlign: "center", padding: "80px 0",
                                    color: "rgba(255,255,255,0.4)", fontSize: 14,
                                }}
                            >
                                <div style={{ fontSize: 40, marginBottom: 16 }}>🔍</div>
                                <p style={{ fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>No projects found</p>
                                <p>Try adjusting your filters or search terms.</p>
                                <motion.button
                                    onClick={handleReset}
                                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                                    style={{
                                        marginTop: 20, padding: "10px 24px", borderRadius: 8,
                                        background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.35)",
                                        color: "#3B82F6", fontSize: 13, fontWeight: 600, cursor: "pointer",
                                    }}
                                >
                                    Reset Filters
                                </motion.button>
                            </motion.div>
                        ) : (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${debouncedSearch}-${page}-${JSON.stringify(filters)}`}
                                    variants={cardContainerVariants}
                                    initial="hidden"
                                    animate="show"
                                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                    style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}
                                >
                                    {projects.map((project, i) => (
                                        <ProjectCard key={project._id} project={project} index={i} />
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        )}

                        {/* Pagination */}
                        {!isLoading && totalPages > 1 && (
                            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}