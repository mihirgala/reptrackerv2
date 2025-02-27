import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getAccountByUserId, getLatestWeightByPersonalInfoId, getPersonalInfoByUserId, getUserById } from "@/data"
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

            if(token.weight && session.user){
                session.user.weight = token.weight
            }
            
            if (session.user) {
                session.user.name = token.name
                session.user.email = token.email
                session.user.role = token.role
                session.user.plan = token.plan
                session.user.currentEnd = token.currentEnd
            }
            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token

            const exisitingUser = await getUserById(token.sub)

            if (!exisitingUser) return token

            const personalInfoId = await getPersonalInfoByUserId(exisitingUser.id)
            if(personalInfoId){
                token.weight = await getLatestWeightByPersonalInfoId(personalInfoId.id)
            }

            if (exisitingUser.subscriptionCurrendCycleEnd) {
                const subscriptionEndDate = new Date(exisitingUser.subscriptionCurrendCycleEnd)
                const currentDate = new Date()
                const userPlan = subscriptionEndDate >= currentDate ? "PREMIUM" : "FREE";
                token.plan = userPlan
                token.currentEnd = exisitingUser.subscriptionCurrendCycleEnd
            }
            else {
                const userPlan = "FREE"
                token.plan = userPlan
            }

            token.name = exisitingUser.name
            token.email = exisitingUser.email
            token.role = exisitingUser.role
            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})