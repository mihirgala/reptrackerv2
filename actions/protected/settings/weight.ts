"use server"

import { auth } from "@/auth"
import { getLatestWeightTimeByPersonalInfoId } from "@/data"
import { db } from "@/lib/db"
import { weightSchema } from "@/schemas"
import { PersonalInfo } from "@prisma/client"
import * as z from "zod"

export const updateWeight = async (values: z.infer<typeof weightSchema>, personalInfo: PersonalInfo) => {
    try {
        if (!personalInfo) {
            throw new Error("Personal Info is required")
        }
        const session = await auth()
        if (session?.user.id !== personalInfo.userId) {
            throw new Error("Unauthorized")
        }
        const validatedFields = weightSchema.safeParse(values)
        if (!validatedFields.success) {
            throw new Error(validatedFields.error.errors[0].message)
        }
        const existingWeightCreatedAt = await getLatestWeightTimeByPersonalInfoId(personalInfo.id)
        if (existingWeightCreatedAt) {
            const diff = new Date().getTime() - new Date(existingWeightCreatedAt).getTime();
            const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
            const timeRemaining = oneDay - diff;

            if (diff < oneDay) {
                const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
                const seconds = Math.floor((timeRemaining / 1000) % 60);

                return { error: `You can only update your weight once a day. Try again in ${hours} hours, ${minutes} minutes, and ${seconds} seconds.` };
            }
        }
        const { weight } = validatedFields.data
        await db.weight.create({
            data: {
                weight: parseFloat(weight),
                personalInfoId: personalInfo.id
            }
        })
        return { success: true, message: "Weight updated successfully" }
    } catch (e) {
        console.error(e)
        return { error: "Something went wrong" }
    }
}