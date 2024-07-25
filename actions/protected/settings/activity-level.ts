"use server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { activityLevelSchema } from "@/schemas"
import { PersonalInfo } from "@prisma/client"
import * as z from "zod"

export const changeActivityLevel = async (values: z.infer<typeof activityLevelSchema>, personalInfo: PersonalInfo) => {
    try {
        if (!personalInfo) {
            throw new Error("Personal Info is required")
        }
        const session = await auth()
        if (session?.user.id !== personalInfo.userId) {
            throw new Error("Unauthorized")
        }
        const validatedFields = activityLevelSchema.safeParse(values)
        if (!validatedFields.success) {
            throw new Error(validatedFields.error.errors[0].message)
        }
        const { activityLevel } = validatedFields.data
        await db.personalInfo.update({
            where: {
                id: personalInfo.id
            },
            data: {
                activityLevel
            }
        })
        return { success: true, message: "Activity Level updated successfully" }
    } catch (e) {
        console.error(e)
        return { error: "Something went wrong" }
    }
}