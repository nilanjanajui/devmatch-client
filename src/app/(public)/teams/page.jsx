"use client";
import Link from "next/link";
import { Users, ArrowLeft } from "lucide-react";

export default function TeamsPage() {
    return (
        <div style={{
            minHeight: "70vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 24px",
            textAlign: "center",
        }}>
            <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 24,
            }}>
                <Users size={32} style={{ color: "#3B82F6" }} />
            </div>
            <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 700, fontFamily: "monospace", margin: "0 0 12px" }}>
                Teams — Coming Soon
            </h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, fontFamily: "monospace", maxWidth: 420, lineHeight: 1.7, margin: "0 0 32px" }}>
                Browse and join curated dev teams. This feature is under active development — check back soon.
            </p>
            <Link href="/explore" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "linear-gradient(135deg, #3B82F6, #6366F1)",
                color: "#fff", textDecoration: "none",
                padding: "12px 24px", borderRadius: 10,
                fontSize: 14, fontWeight: 600, fontFamily: "monospace",
                boxShadow: "0 0 20px rgba(59,130,246,0.3)",
            }}>
                Explore Projects Instead
            </Link>
        </div>
    );
}