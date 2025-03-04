"use server"
import * as z from "zod"
import { auth } from "@/auth"
import { workoutSchema } from "@/schemas"
import { Workout } from "@prisma/client"
import { getPersonalInfoById } from "@/data"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export const editWorkout = async (values: z.infer<typeof workoutSchema>, workout: Workout) => {
    try {
        const session = await auth()
        const personalInfo = await getPersonalInfoById(workout.personalInfoId!)
        if (session?.user.id !== personalInfo?.userId) {
            throw new Error("Unauthorized!")
        }
        const validatedFields = workoutSchema.safeParse(values)
        if (!validatedFields.success) {
            throw new Error("Invalid fields")
        }
        const { name, exercises } = values

        await db.workout.update({
            where: {
                id: workout.id
            },
            data: {
                name: name
            }
        })

        await db.exercise.deleteMany({
            where: {
                workoutId: workout.id!
            }
        })
        for (const exercise of exercises) {
            await db.exercise.create({
                data: {
                    name: exercise.name,
                    workoutId: workout.id,
                    sets: exercise.sets,
                    reps: exercise.reps,
                    intensity: exercise.intensity,
                    metric: exercise.intensityMetric,
                }
            })
        }
        revalidatePath("/workout")
        return { success: true, message: "Workout edited successfully" }
    } catch (e) {
        console.error(e)
        return { error: "Something went wrong!" }
    }
}