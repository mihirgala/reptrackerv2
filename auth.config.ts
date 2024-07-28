import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { loginSchema } from "@/schemas"
import { getUserByEmail, getLoginCodeByEmail } from "@/data"
import { db } from "@/lib/db"

export default {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            allowDangerousEmailAccountLinking: true
        },
    ),
        Credentials({
            async authorize(credentials) {
                const validatedFields = loginSchema.safeParse(credentials)
                if (validatedFields.success) {
                    const { email, code } = validatedFields.data
                    const user = await getUserByEmail(email)
                    if (!user) return null
                    const dbCode = await getLoginCodeByEmail(email)
                    if (code === dbCode?.token) {
                        await db.loginCode.deleteMany({ where: { email: email } })
                        return user
                    }
                }
                return null
            }

        })]
} satisfies NextAuthConfig