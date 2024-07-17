import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getAccountByUserId, getUserById } from "@/data"
import authConfig from "@/auth.config"
import { db } from "@/lib/db"
import { sendVerificationSuccessEmail } from "@/lib/mail"

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
            await sendVerificationSuccessEmail(user?.email!)
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.type !== "credentials") return true

            const exisitingUser = await getUserById(user.id!)

            if (!exisitingUser?.emailVerified) return false

            return true
        },
        async session({ session, token }: any) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }


            if (session.user) {
                session.user.name = token.name
                session.user.email = token.email
                session.user.plan = token.plan
            }
            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token

            const exisitingUser = await getUserById(token.sub)

            if (!exisitingUser) return token

            const existingAccount = await getAccountByUserId(exisitingUser.id)

            token.isOAuth = !!existingAccount
            token.name = exisitingUser.name
            token.email = exisitingUser.email
            token.plan = exisitingUser.plan
            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})