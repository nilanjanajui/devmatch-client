"use client";
import Sidebar from "@/components/dashboard/Sidebar";

export default function PrivateLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-[#0a0f1a]">
            <Sidebar />
            <main className="flex-1 ml-0 md:ml-50 p-4 md:p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}