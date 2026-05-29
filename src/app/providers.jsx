"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/queryClient";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

export default function Providers({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                {children}
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        style: {
                            background: "#0d1421",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "#fff",
                            fontFamily: "monospace",
                            fontSize: "13px",
                        },
                    }}
                />
            </AuthProvider>
        </QueryClientProvider>
    );
}