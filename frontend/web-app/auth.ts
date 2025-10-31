import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
    trustHost: true,
    secret: process.env.AUTH_SECRET,
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Email and password are required");
                    }

                    const response = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_BASE_URL}/auth/login`, {
                    // const response = await fetch(`http://localhost:6001/auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    if (!response.ok) {
                        if (response.status === 401) {
                            throw new Error("Invalid email or password");
                        } else if (response.status === 400) {
                            const errorData = await response.json();
                            throw new Error(errorData.message || "Validation failed");
                        } else {
                            throw new Error("Login failed. Please try again.");
                        }
                    }

                    const data = await response.json();


                    return {
                        id: data.user?.id || data.id,
                        email: data.user?.email || data.email,
                        name: data.user?.name || data.user?.fullName || `${data.user?.firstName || ''} ${data.user?.lastName || ''}`.trim(),
                        accessToken: data.token || data.accessToken, // Use whichever your API returns
                    };

                } catch (error) {
                    console.error("Authorization error:", error);


                    return null;
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.id = user.id;
            }
            return token;
        },
        async session({ token, session }) {
            session.accessToken = token.accessToken as string;
            session.user.id = token.id as string;
            return session;
        },
        async redirect({ url, baseUrl }) {
            const base = 'https://app.carsties.local';

            if (url.startsWith("/")) return `${base}${url}`;
            else if (new URL(url).origin === base) return url;

            return base;
        }
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    session: {
        strategy: "jwt"
    }
})