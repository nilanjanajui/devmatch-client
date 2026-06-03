"use client";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
    return (
        <div className="max-w-3xl mx-auto pt-12 md:pt-2 pb-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-2xl font-bold text-white font-mono mb-2">Analytics</h1>
                <p className="text-white/40 font-mono text-sm">
                    Detailed analytics coming soon.
                </p>
            </motion.div>
        </div>
    );
}