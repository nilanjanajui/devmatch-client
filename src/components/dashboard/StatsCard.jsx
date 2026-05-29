"use client";
import { motion } from "framer-motion";

export default function StatsCard({ label, value, badge, icon: Icon, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
            className="bg-[#0d1421] border border-white/5 rounded-2xl p-5 relative overflow-hidden"
        >
            {/* Top right badge */}
            {badge && (
                <span className="absolute top-4 right-4 text-[#00e5ff] text-xs font-mono">{badge}</span>
            )}

            {/* Icon */}
            <div className="text-white/30 mb-3">
                <Icon size={20} />
            </div>

            {/* Label */}
            <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-1">{label}</p>

            {/* Value */}
            <p className="text-white text-3xl font-bold font-mono">{value}</p>

            {/* Subtle bottom glow */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#00e5ff]/20 to-transparent" />
        </motion.div>
    );
}