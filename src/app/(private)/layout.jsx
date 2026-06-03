"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import { useAuth } from "@/context/AuthContext";

function hasAuthCookie() {
    if (typeof document === "undefined") return false;
    return document.cookie.split(";").some(c => c.trim().startsWith("auth_status=1"));
}

export default function PrivateLayout({ children }) {
    const { isLoggedIn, isLoading } = useAuth();
    const router = useRouter();
    const authed = hasAuthCookie();

    useEffect(() => {
        if (!authed) {
            router.push("/login");
            return;
        }
    }, [authed, isLoggedIn, isLoading, router]);

    if (!authed) {
        return (
            <div className="flex min-h-screen bg-[#0a0f1a] items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#00e5ff] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }
    
    return (
        <div className="flex min-h-screen bg-[#0a0f1a]">
            <Sidebar />
            <main className="flex-1 ml-0 md:ml-[200px] p-4 md:p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}