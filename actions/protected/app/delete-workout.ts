"use server"

import { auth } from "@/auth"
import { getPersonalInfoById } from "@/data"
import { db } from "@/lib/db"
import { Workout } from "@prisma/client"

export const deleteWorkout = async (workout: Workout) => {
    try{
        const session = await auth()
        const personalInfo = await getPersonalInfoById(workout.personalInfoId)
        if(session?.user.id !== personalInfo?.userId){
            throw new Error("Unauthorized!")
        }
        await db.exercise.deleteMany({
            where:{
                workoutId: workout.id
            }
        })
        await db.workout.delete({
            where:{
                id: workout.id
            }
        })
        
        return {success: true, message: "Workout deleted successfully"}
    }catch(e){
        console.log(e)
        return {error: "Something went wrong"}
    }
}