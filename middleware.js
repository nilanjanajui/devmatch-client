import { NextResponse } from "next/server";

export function middleware(request) {
    const { pathname } = request.nextUrl;

    const authStatus = request.cookies.get("auth_status")?.value;
    const isAuthenticated = authStatus === "1";

    // Protect private routes — redirect to login if not authenticated
    const isPrivatePage = pathname.startsWith("/dashboard");
    if (isPrivatePage && !isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};