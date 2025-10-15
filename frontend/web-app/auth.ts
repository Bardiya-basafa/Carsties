import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const {handlers, auth, signIn, signOut} = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Email and password are required");
                    }

                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
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
                        // Handle different error statuses
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

                    // Log the response for debugging
                    console.log("Login API Response:", data);

                    // Return the user object that will be stored in the token
                    return {
                        id: data.user?.id || data.id,
                        email: data.user?.email || data.email,
                        name: data.user?.name || data.user?.fullName || `${data.user?.firstName || ''} ${data.user?.lastName || ''}`.trim(),
                        accessToken: data.token || data.accessToken, // Use whichever your API returns
                    };

                } catch (error) {
                    console.error("Authorization error:", error);

                    // Return null to indicate authentication failure
                    // NextAuth will handle displaying the error
                    return null;
                }
            },
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.accessToken = user.accessToken;
                token.id = user.id;
            }
            return token;
        },
        async session({token, session}) {
            session.accessToken = token.accessToken;
            session.user.id = token.id as string;
            return session;
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