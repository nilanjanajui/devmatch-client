"use client";
import { createContext, useContext } from "react";
import { useSession, signOut } from "@/lib/authClient";
import axiosInstance from "@/lib/axios";   

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const { data: session, isPending } = useSession();

    const user = session?.user ?? null;
    const isLoggedIn = !!user;
    const isLoading = isPending;

    const logout = async () => {
        await signOut();
        await axiosInstance.post("/auth/clear-jwt");
        // Clear the auth_status cookie used by middleware + private layout
        document.cookie = "auth_status=; path=/; max-age=0";
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, isLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}