"use server"

import { auth } from "@/auth"
import { getPersonalInfoByUserId, getWorkoutsByPersonalInfoId } from "@/data"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export const importGeneratedWorkouts = async (workouts: Workout[], personalInfoId: string) => {
    try {
        const session = await auth()
        const personalInfo = await getPersonalInfoByUserId(session?.user.id as string)
        if (personalInfoId !== personalInfo?.id) {
            return { error: "Unauthorized!" }
        }
        const dbWorkouts = await getWorkoutsByPersonalInfoId(personalInfo.id)
        dbWorkouts?.map(async (workout) => {
            await db.workout.delete({
                where: {
                    id: workout.id
                }
            })
        })

        for (const workout of workouts) {
            const dbworkout = await db.workout.create({
                data: {
                    name: workout.name,
                    personalInfoId: personalInfo.id,
                }
            })
            for (const exercise of workout.exercises) {
                await db.exercise.create({
                    data: {
                        name: exercise.name,
                        sets: exercise.sets,
                        reps: exercise.reps,
                        workoutId: dbworkout.id
                    }
                })
            }
        }
        
        revalidatePath("/workout")
        return { success: true }

    } catch (e) {
        console.error(e)
        return { error: "Something went wrong" }
    }
}