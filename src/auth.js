import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import axios from "axios";
import { backendUrl } from "./json-data/backendServer";

export const { handlers: { GET, POST },
    auth,
    signIn,
    signOut } = NextAuth({
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                authorization: {
                    params: {
                        prompt: 'consent',
                        access_type: "offline",
                        response_type: "code",
                    },
                },
            })
        ],
        session: {
            strategy: "jwt", // Required for access token storage
        },
        jwt: {
            secret: process.env.AUTH_SECRET,
            encryption: true, // if using encryption
        },
        callbacks: {
            async signIn({ user, account, profile }) {
                // Send user data to your backend
                try {
                    const data = {
                        fullName: user.name,
                        userEmail: user.email,
                        provider: account.provider,
                        providerId: String(account.providerAccountId)

                    }
                    await axios.post(`${backendUrl}api/social-signin`, data)



                    console.log("session", user.name, user.email, account.provider, account.providerAccountId)
                } catch (err) {
                    console.error('Failed to save user to backend:', err);
                }

                return true;
            },
            async jwt({ token, account }) {
                if (account) {
                    // Save the access token (and optionally refresh token)
                    token.accessToken = account.access_token;
                    token.refreshToken = account.refresh_token;
                    token.expiresAt = account.expires_at; // optional
                }
                console.log("token", token)
                return token;
            },
            async session({ session, token }) {
                // Make accessToken available in client & server
                session.accessToken = token.accessToken;
                return session;
            },

        },
    })

// http://localhost:3000/api/auth/callback/google