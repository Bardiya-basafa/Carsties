//
// export const authOptions: NextAuthOptions = NextAuth({
//     providers: [
//         DuendeIdentityServer6({
//             id: 'id-server',
//             clientId: 'nextApp',
//             clientSecret: 'secret',
//             issuer: 'http://localhost:5001',
//             authorization: {params: {scope: 'openid profile auctionApp'}},
//             idToken: true
//         } as OIDCConfig<Omit<Profile, 'username'>>)
//     ],
//     callbacks: {
//         async authorized({auth}) {
//             return !!auth;
//         },
//         async jwt({token, profile, account}) {
//
//             if (profile) {
//                 token.username = profile.username;
//             }
//             if (account) {
//                 token.access_token = account.access_token;
//             }
//             return token;
//         },
//         async session({session, token}) {
//             if (token) {
//                 session.user.username = token.username;
//             }
//             return session;
//         }
//     }
// })


// const halder = NextAuth(authOptions)