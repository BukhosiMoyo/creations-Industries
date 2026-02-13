import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                console.log("Authorize called with:", {
                    email: credentials?.email,
                    passwordLength: credentials?.password?.length,
                });

                if (!credentials?.email || !credentials?.password) {
                    console.log("Missing credentials");
                    throw new Error("Invalid credentials");
                }

                try {
                    console.log("Attempting prisma.user.findUnique for email:", credentials.email);
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email },
                    });
                    console.log("User found:", user ? "YES" : "NO");

                    if (!user || !user.password) {
                        console.log("User not found or no password");
                        throw new Error("Invalid credentials");
                    }

                    const isValid = await bcrypt.compare(credentials.password, user.password);

                    if (!isValid) {
                        console.log("Password invalid");
                        throw new Error("Invalid credentials");
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        companyId: user.companyId,
                    };
                } catch (error) {
                    console.error("Authorize error:", error);
                    throw error;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
                token.companyId = user.companyId;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
                session.user.companyId = token.companyId;
            }
            return session;
        },
    },
};
