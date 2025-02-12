"use server"

import * as z from "zod"
import { generateMealPlanSchema } from "@/schemas"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { getLatestGeneratedMealPlan, getLatestGeneratedWorkout } from "@/data"
import { JSONmodel } from "@/lib/google-generative-ai"

export const generateMealPlan = async (values: z.infer<typeof generateMealPlanSchema>,
  macros: { protein: string, carbohydrates: string, fat: string, totalCalories: string }) => {
  try {
    const session = await auth()
    if (!session) {
      return { error: "You need to be logged in to access this feature" }
    }
    if (session?.user.plan !== "PREMIUM") {
      return { error: "You need a premium plan to access this feature" }
    }

    const lastGeneratedMealPlan = await getLatestGeneratedMealPlan(session?.user.id as string)
    const expiresAt = new Date(Date.now() + (1000 * 60 * 3600))

    if (lastGeneratedMealPlan && new Date(lastGeneratedMealPlan.expiresAt) > new Date()) {
      const now = new Date()
      const expiresAtTime = new Date(lastGeneratedMealPlan.expiresAt).getTime()
      const diff = expiresAtTime - now.getTime()
      const oneHour = 1000 * 60 * 3600

      if (diff > 0 && diff < oneHour) {
        const timeRemaining = diff
        const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60)
        const seconds = Math.floor((timeRemaining / 1000) % 60)

        return { error: `You can only generate a meal plan every hour. Try again in ${minutes} minutes, and ${seconds} seconds.` }
      }
    }

    let lastGeneratedMealPlanId
    if (lastGeneratedMealPlan) {
      await db.lastGeneratedMealPlan.update({
        where: {
          id: lastGeneratedMealPlan.id
        },
        data: {
          expiresAt
        }
      })
      lastGeneratedMealPlanId = lastGeneratedMealPlan.id
    } else {
      const newLastGeneratedMealPlan = await db.lastGeneratedMealPlan.create({
        data: {
          userId: session?.user.id as string,
          expiresAt
        }
      })
      lastGeneratedMealPlanId = newLastGeneratedMealPlan.id
    }

    const validatedFields = generateMealPlanSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: "Invalid request" }
    }
    const { numberOfMeals, preference, note } = validatedFields.data
    const prompt = `
    Generate Meal Plan (${numberOfMeals} meals per day).
    macros: protein: ${macros.protein}g, carbohydrates: ${macros.carbohydrates}g, fat: ${macros.fat}g, total calories: ${macros.totalCalories} kcal.
    System note: The macros can be slightly up or down, they do not have to be 100% perfect but must be close to the provided macros.
    User's Note: ${note}.
    Preference: ${preference}.
    
    Generate the response in JSON format using this schema:
    
    {
      "type": "array",
      "minItems": ${numberOfMeals},
      "maxItems": ${numberOfMeals},
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Meal name (e.g., Breakfast, Lunch, Mid-morning snack, etc.)"
          },
          "foods": {
            "type": "array",
            "minItems": 1,
            "maxItems": 6,
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "description": "Food Name (e.g., Banana, Milk, Oatmeal, etc.)"
                },
                "protein": {
                  "type": "string",
                  "description": "Protein in grams (e.g., 10)"
                },
                "carbohydrates": {
                  "type": "string",
                  "description": "Carbohydrates in grams (e.g., 10)"
                },
                "fats": {
                  "type": "string",
                  "description": "Fats in grams (e.g., 10)"
                },
                "calories": {
                  "type": "string",
                  "description": "Total Calories (e.g., 230)"
                }
              },
              "required": ["name", "protein", "carbohydrates", "fats", "calories"]
            }
          },
          "total": {
            "type": "object",
            "properties": {
              "protein": {
                "type": "string",
                "description": "Total Protein in grams for the meal"
              },
              "carbohydrates": {
                "type": "string",
                "description": "Total Carbohydrates in grams for the meal"
              },
              "fats": {
                "type": "string",
                "description": "Total Fats in grams for the meal"
              },
              "calories": {
                "type": "string",
                "description": "Total Calories for the meal"
              }
            },
            "required": ["protein", "carbohydrates", "fats", "calories"]
          }
        },
        "required": ["name", "Foods", "total"]
      }
    }
    `
    
    const result = await JSONmodel.generateContent(prompt)
    const content = result?.response.text()
    if (!content) {
      await db.lastGeneratedWorkout.delete({
        where: {
          id: lastGeneratedMealPlanId
        }
      })
      return { error: "Something went wrong" }
    }
    return { success: true, data: content }
  } catch (e) {
    console.error(e)
    return { error: "Something went wrong" }
  }
}