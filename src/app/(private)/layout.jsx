"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import Link from "next/link";

export default function PrivateLayout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-[#0a0f1a]">
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 ml-0 md:ml-50 p-4 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>

            {/* Footer — matches reference design */}
            <footer className="ml-0 md:ml-50 border-t border-white/5 bg-[#0a0f1a]">
                <div className="max-w-6xl mx-auto px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {/* Brand */}
                        <div>
                            <p className="text-[#00e5ff] font-bold text-xl font-mono mb-2">DevMatch</p>
                            <p className="text-white/40 text-sm font-mono leading-relaxed">
                                Engineering the future of collaborative development<br />
                                through high-precision networking.
                            </p>
                        </div>
                        {/* Platform */}
                        <div>
                            <p className="text-white/60 text-xs font-mono uppercase tracking-widest mb-3">Platform</p>
                            <ul className="space-y-2">
                                {["About", "Docs"].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-white/40 text-sm font-mono hover:text-white/70 transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Legal */}
                        <div>
                            <p className="text-white/60 text-xs font-mono uppercase tracking-widest mb-3">Legal</p>
                            <ul className="space-y-2">
                                {["Privacy", "Terms"].map((item) => (
                                    <li key={item}>
                                        <Link href="#" className="text-white/40 text-sm font-mono hover:text-white/70 transition-colors">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/5 pt-6">
                        <p className="text-white/20 text-xs font-mono text-center">
                            © 2024 DevMatch. Engineering the Future.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}