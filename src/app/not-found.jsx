"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-md"
            >
                {/* Glowing 404 */}
                <div className="relative inline-block mb-6">
                    <span
                        className="text-[120px] font-bold font-mono leading-none"
                        style={{
                            background: "linear-gradient(135deg, #00e5ff, #7c3aed)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        404
                    </span>
                    <div className="absolute inset-0 blur-3xl bg-[#00e5ff]/10 -z-10" />
                </div>

                <h2 className="text-white font-mono font-bold text-xl mb-2">
                    Page not found.
                </h2>
                <p className="text-white/40 font-mono text-sm mb-8 leading-relaxed">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>

                <div className="flex items-center justify-center gap-3">
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 bg-[#00e5ff] text-[#0a0f1a] font-bold font-mono text-sm px-5 py-2.5 rounded-xl"
                        >
                            <Home size={15} />
                            Home
                        </motion.button>
                    </Link>
                    <Link href="/explore">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 bg-white/5 border border-white/10 text-white font-mono text-sm px-5 py-2.5 rounded-xl hover:border-white/20 transition-colors"
                        >
                            <Search size={15} />
                            Explore
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}