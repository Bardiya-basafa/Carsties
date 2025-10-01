import DuendeIdentityServer6 from "next-auth/providers/duende-identity-server6"
import NextAuth, {Profile} from "next-auth"
import {OIDCConfig} from "@auth/core/providers";

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        DuendeIdentityServer6({
            id: 'id-server',
            clientId: 'nextApp',
            clientSecret: 'secret',
            issuer: 'http://localhost:5001',
            authorization: {params: {scope: 'openid profile auctionApp'}},
            idToken: true
        } as OIDCConfig<Omit<Profile, 'username'>>)
    ],
    callbacks: {
        async authorized({auth}) {
            return !!auth;
        },
        async jwt({token, profile, account}) {

            if (profile) {
                token.username = profile.username;
            }
            if (account) {
                token.access_token = account.access_token;
            }
            return token;
        },
        async session({session, token}) {
            if (token) {
                session.user.username = token.username;
            }
            return session;
        }
    }
})

