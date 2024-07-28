"use server"

import * as z from "zod"
import { generateWorkoutSchema } from "@/schemas"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { getLatestGeneratedWorkout } from "@/data"
import { JSONmodel } from "@/lib/google-generative-ai"
export const generateWorkouts = async (values: z.infer<typeof generateWorkoutSchema>) => {
  try {
    const session = await auth()
    if (!session) {
      return { error: "You need to be logged in to access this feature" }
    }
    if (session?.user.plan !== "PREMIUM") {
      return { error: "You need a premium plan to access this feature" }
    }
    const lastGeneratedWorkout = await getLatestGeneratedWorkout(session?.user.id as string)
    const expiresAt = new Date(Date.now() + (1000 * 60 * 5))

    if (lastGeneratedWorkout && new Date(lastGeneratedWorkout.expiresAt) > new Date()) {
      const now = new Date()
      const expiresAtTime = new Date(lastGeneratedWorkout.expiresAt).getTime()
      const diff = expiresAtTime - now.getTime()
      const fiveMins = 1000 * 60 * 5

      if (diff > 0 && diff < fiveMins) {
        const timeRemaining = diff
        const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60)
        const seconds = Math.floor((timeRemaining / 1000) % 60)

        return { error: `You can only generate workout every 5 minutes. Try again in ${minutes} minutes, and ${seconds} seconds.` }
      }
    }


    if (lastGeneratedWorkout) {
      await db.lastGeneratedWorkout.update({
        where: {
          id: lastGeneratedWorkout.id
        },
        data: {
          expiresAt
        }
      })
    } else {
      await db.lastGeneratedWorkout.create({
        data: {
          userId: session?.user.id as string,
          expiresAt
        }
      })
    }

    const validatedFields = generateWorkoutSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: "Invalid request" }
    }
    const { numberOfDays, note } = validatedFields.data
    const prompt = `
    Generate Workout Plan (${numberOfDays} Day)
    Note : ${note} 
    in JSON format using this schema
          {
    "type": "array",
    "minItems": ${numberOfDays},
    "maxItems":${numberOfDays},
    "items": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "Workout Name (e.g., Day 1, Chest & Triceps)"
        },
        "exercises": {
          "type": "array",
          "minItems": 1,
          "maxItems":6,
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string",
                "description": "Exercise Name (e.g., Bench Press)"
              },
              "sets": {
                "type": "string",
                "title": "Sets (e.g., 3)"
              },
              "reps": {
                "type": "string",
                "description": "Reps (e.g., 10,12-15)"
              },
            }
          }
        }
      }
    }
  }
          `
    const result = await JSONmodel.generateContent(prompt)
    const content = result?.response.text()
    return { success: true, data: content }
  } catch (e) {
    console.error(e)
    return { error: "Something went wrong" }
  }
}