import DuendeIdentityServer6 from "next-auth/providers/duende-identity-server6"
import NextAuth, {Profile} from "next-auth"
import {OIDCConfig} from "@auth/core/providers";

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        DuendeIdentityServer6({
            id: 'id-server',
            clientId: 'nextApp',
            clientSecret: 'secret',
            issuer: 'http://localhost:5000',
            authorization: {
                params: {scope: 'openid profile auctionApp'},
                url: "http://localhost:5000/connect/authorize"
            },
            token: {
                url: "http://localhost:5000/connect/token"
            },
            userinfo: {
                url: "http://localhost:5000/connect/token"
            },
            idToken: true,

        } as OIDCConfig<Omit<Profile, 'username'>>)
    ],
    callbacks: {
        async redirect({url, baseUrl}) {
            return url.startsWith(baseUrl) ? url : baseUrl
        },
        async authorized({auth}) {
            return !!auth;
        },
        async jwt({token, profile, account}) {
            if (account && account.access_token) {
                token.accessToken = account.access_token
            }
            if (profile) {
                token.username = profile.username
            }
            return token;
        },
        async session({session, token}) {
            if (token) {
                session.user.username = token.username;
                session.sessionToken = token.accessToken.toString();
            }
            return session;
        }
    }
})

