import * as z from "zod"

export const loginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }).transform((email) => email.toLowerCase()),
    code: z.optional(z.string())
})