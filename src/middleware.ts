import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const isAuth = !!token;
        const role = token?.role;
        const path = req.nextUrl.pathname;

        // CLIENT role restrictions
        if (role === "CLIENT") {
            if (path.startsWith("/dashboard")) {
                return NextResponse.redirect(new URL("/portal", req.url));
            }
        }

        // INTERNAL roles (ADMIN, STAFF, EMPLOYEE) restrictions
        if (role === "ADMIN" || role === "STAFF" || role === "EMPLOYEE") {
            if (path.startsWith("/portal")) {
                return NextResponse.redirect(new URL("/dashboard", req.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/dashboard/:path*", "/portal/:path*"],
};
