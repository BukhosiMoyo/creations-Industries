import { UserRole } from "@prisma/client";
import "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        role: UserRole;
        companyId?: string | null;
    }

    interface Session {
        user: User & {
            id: string;
            role: UserRole;
            companyId?: string | null;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: UserRole;
        companyId?: string | null;
    }
}
