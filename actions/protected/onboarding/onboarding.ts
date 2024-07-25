"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { onboardingSchema } from "@/schemas"
import * as z from "zod"

export const onboarding = async (values: z.infer<typeof onboardingSchema>, userId: string) => {
    try {
        if (!userId) {
            throw new Error("User not found")
        }
        const validatedFields = onboardingSchema.safeParse(values)
        if (!validatedFields.success) {
            throw new Error(validatedFields.error.errors[0].message)
        }

        const session = await auth()
        if (session?.user.id !== userId) {
            throw new Error("Unauthorized")
        }
        const { name, sex, day, month, year, weight, height, bodyCompositionGoal, activityLevel } = validatedFields.data
        const dateOfBirth = new Date(`${year}-${month}-${day}`)
        await db.user.update({
            where: {
                id: userId
            },
            data: {
                name
            }
        })
        const personalInfo = await db.personalInfo.create({
            data: {
                userId,
                dob: dateOfBirth,
                sex: sex,
                height: parseFloat(height),
                activityLevel: activityLevel,
                bodyCompositionGoal: bodyCompositionGoal,
            }
        })

        await db.weight.create({
            data: {
                personalInfoId: personalInfo.id,
                weight: parseFloat(weight)
            }
        })
        return { success: true }
    } catch(e) {
        console.error(e)
        return { error: "something went wrong"}
    }
}