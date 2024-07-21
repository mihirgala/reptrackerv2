import * as z from "zod"

export const loginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }).transform((email) => email.toLowerCase()),
    code: z.optional(z.string())
})

export const nameSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters"
    }).max(50, {
        message: "Name can be at most 50 characters"
    })
})