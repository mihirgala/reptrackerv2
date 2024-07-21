"use server"
import { auth } from "@/auth"
import { getUserById } from "@/data"
import { db } from "@/lib/db"
import { nameSchema } from "@/schemas"
import * as z from "zod"

export const changeName = async (values: z.infer<typeof nameSchema>,userId:string) => {
    const validatedFields = nameSchema.safeParse(values)
    if(!validatedFields.success){
        return {error:"Invalid fields!"}
    }
    const session = await auth()
    const dbUser = await getUserById(userId)
    if(session?.user.id !== dbUser?.id){
        return {error:"Unauthorized!"}
    }
    await db.user.update({
        where:{
            id:userId
        },
        data:{
            name:values.name
        }
    })
    return {success:true,message:"Name updated successfully!"}
}