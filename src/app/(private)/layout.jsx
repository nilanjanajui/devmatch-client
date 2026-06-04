"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
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
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-[#0a0f1a]">
                {/* Top bar */}
                <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2
                    bg-[#0a0f1a] border-b border-white/5 px-4
                    transition-[width,height] ease-linear
                    group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <SidebarTrigger
                        className="-ml-1 text-white/40 hover:text-white
                            hover:bg-white/5 rounded-lg transition-colors"
                    />
                    <Separator
                        orientation="vertical"
                        className="mr-2 bg-white/10 data-[orientation=vertical]:h-4"
                    />
                    <p className="text-white/30 text-xs font-mono tracking-wide">Dev Console</p>
                </header>

                {/* Page content */}
                <main className="flex flex-1 flex-col p-6 md:p-8 min-h-[calc(100vh-3.5rem)]">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}