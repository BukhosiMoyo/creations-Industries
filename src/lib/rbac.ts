import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { redirect } from "next/navigation";

export async function getSession() {
    return await getServerSession(authOptions);
}

export async function getCurrentUser() {
    const session = await getSession();
    return session?.user;
}

export async function requireAuth() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/auth/login");
    }
    return user;
}

export async function requireRole(roles: string[]) {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/auth/login");
    }

    const userRole = user.role;
    if (!roles.includes(userRole)) {
        redirect("/unauthorized");
    }
    return user;
}

export function isAdmin(user: { role: string }) {
    return user?.role === "ADMIN";
}

export function isAccountant(user: { role: string }) {
    return user?.role === "ADMIN" || user?.role === "ACCOUNTANT";
}
