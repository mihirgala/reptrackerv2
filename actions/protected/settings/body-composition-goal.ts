"use server"

import * as z from "zod"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { bodyCompositionGoalSchema } from "@/schemas"
import { PersonalInfo } from "@prisma/client"

export const changeBodyComp = async (values: z.infer<typeof bodyCompositionGoalSchema>, personalInfo: PersonalInfo) => {
    try{
        if(!personalInfo){
            throw new Error("Personal Info is required")
        }
        const session = await auth()
        if(session?.user.id !== personalInfo.userId){
            throw new Error("Unauthorized")
        }
        const validatedFields = bodyCompositionGoalSchema.safeParse(values)
        if(!validatedFields.success){
            throw new Error(validatedFields.error.errors[0].message)
        }
        const {bodyCompositionGoal} = validatedFields.data
        await db.personalInfo.update({
            where:{
                id:personalInfo.id
            },
            data:{
                bodyCompositionGoal
            }
        })
        return {success:true,message:"Body Composition Goal updated successfully"}
    }catch(e){
        console.error(e)
        return {error:"Something went wrong"}
    }
}