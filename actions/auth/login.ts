"use server"
import * as z from "zod"
import { loginSchema } from "@/schemas"
import { db } from "@/lib/db"
import { sendLoginCodeEmail, sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/verification-token"
import { generateLoginCode } from "@/lib/login-code"
import { getLoginCodeByEmail } from "@/data"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"

export const login = async (values: z.infer<typeof loginSchema>) => {
    try {
        const validatedFields = loginSchema.safeParse(values)
        if (!validatedFields.success) {
            return { error: true, message: "Invalid fields!" }
        }
        const { email, code } = validatedFields.data
        if (!code) {
            const user = await db.user.findFirst({ where: { email } })
            if (!user || !user.emailVerified) {
                if (!user) {
                    await db.user.create({ data: { email } })
                }
                const verificationToken = await generateVerificationToken(email)
                await sendVerificationEmail(email, verificationToken!)
                return { success: true, message: "Verification email sent!" }
            }
            const loginCode = await generateLoginCode(email)
            await sendLoginCodeEmail(email, loginCode!)
            return { success: true, message: "Code sent on email!", codeSent: true }
        }
        const dbCode = await getLoginCodeByEmail(email)
        if(code !== dbCode?.token){
            return { error: true, message: "Invalid code!" }
        }
        await signIn("credentials", {
            email: email,
            code: code,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
        return
    } catch (e) {
        if (e instanceof AuthError) {
            switch (e.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }
        throw e
    }
}