"use server"

import { auth } from "@/auth"
import { getMealPlanByPersonalInfoId, getPersonalInfoByUserId } from "@/data"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export const saveMealPlan = async (mealPlan: Meal[], personalInfoId: string) => {
    try {
        const session = await auth()
        const personalInfo = await getPersonalInfoByUserId(session?.user.id as string)
        if (personalInfoId !== personalInfo?.id) {
            return { error: "Unauthorized!" }
        }
        const dbMealPlan = await getMealPlanByPersonalInfoId(personalInfo.id)
        dbMealPlan?.map(async (meal) => {
            await db.meal.delete({
                where: {
                    id: meal.id
                }
            })
        })

        for (const meal of mealPlan) {
            const dbMealPlan = await db.meal.create({
                data: {
                    name: meal.name,
                    personalInfoId: personalInfo.id,
                    protein: meal.total.protein,
                    carbohydrates: meal.total.carbohydrates,
                    fats: meal.total.fats,
                    calories: meal.total.calories
                }
            })
            for (const food of meal.foods) {
                await db.food.create({
                    data: {
                        name: food.name,
                        protein:food.protein,
                        carbohydrates: food.carbohydrates,
                        fats: food.fats,
                        calories: food.calories,
                        mealId: dbMealPlan.id
                    }
                })
            }
        }
        
        revalidatePath("/nutrition")
        return { success: true }
    } catch (e) {
        console.error(e)
        return { error: "Something went wrong" }
    }
}