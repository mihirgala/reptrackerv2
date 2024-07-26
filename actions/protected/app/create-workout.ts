"use server"

import { auth } from "@/auth"
import { getPersonalInfoByUserId } from "@/data"
import { db } from "@/lib/db"
import { workoutSchema } from "@/schemas"
import * as z from "zod"

export const createWorkout = async (values: z.infer<typeof workoutSchema>, personalInfoId: string) => {
    try {
        const session = await auth()
        const personalInfo = await getPersonalInfoByUserId(session?.user?.id!)

        if (session?.user?.id !== personalInfo?.userId) {
            return { error: "Unauthorized!" }
        }

        const validatedFields = workoutSchema.safeParse(values)
        if (!validatedFields.success) {
            return { error: "Invalid fields" }
        }
        const { name, exercises } = validatedFields.data

        const workout = await db.workout.create({
            data: {
                name,
                personalInfoId
            }
        })

        exercises.map(async (exercise) => {
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
        })

        return {success:true}

    } catch (e) {
        console.error(e)
        return { error: "Something went wrong" }
    }

}