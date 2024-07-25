"use server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { heightSchema } from "@/schemas"
import { PersonalInfo } from "@prisma/client"
import * as z from "zod"

export const changeHeight = async (values:z.infer<typeof heightSchema>,personalInfo:PersonalInfo) => {
    try{
        if(!personalInfo){
            throw new Error("Personal Info is required")
        }
        const session = await auth()
        if(session?.user.id !== personalInfo.userId){
            throw new Error("Unauthorized")
        }
        const validatedFields = heightSchema.safeParse(values)
        if(!validatedFields.success){
            throw new Error(validatedFields.error.errors[0].message)
        }
        const {height} = validatedFields.data
        await db.personalInfo.update({
            where:{
                id:personalInfo.id
            },
            data:{
                height:parseFloat(height)
            }
        })
        return {success:true,message:"Height updated successfully"}
    }catch(e){
        console.error(e)
        return {error:"Something went wrong"}
    }
}