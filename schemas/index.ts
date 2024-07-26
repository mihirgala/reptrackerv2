import { ActivityLevel, BodyCompositionGoal, intensityMetric, Sex } from "@prisma/client";
import * as z from "zod"

export const loginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }).transform((email) => email.toLowerCase()),
    code: z.optional(z.string())
})

export const nameSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters"
    }).max(50, {
        message: "Name can be at most 50 characters"
    })
})

export const onboardingSchema = z.object({
    name: z.string()
        .min(3, { message: "Name must be at least 3 characters" })
        .max(50, { message: "Name can be at most 50 characters" }),
    day: z.string()
        .refine(value => {
            const day = parseInt(value)
            return day > 0 && day < 32
        }, { message: "Day must be a number between 1 and 31" }),
    month: z.string()
        .refine(value => {
            const month = parseInt(value)
            return month > 0 && month < 13
        }, { message: "Month must be a number between 1 and 12" }),
    year: z.string()
        .refine(value => {
            const year = parseInt(value)
            return year > 1900 && year < new Date().getFullYear()
        }, { message: "Year must be a number after 1900 and before the current year" }),
    sex: z.enum([Sex.MALE, Sex.FEMALE]),
    weight: z.string()
        .refine(value => parseFloat(value) > 0, { message: "Weight must be a positive number" }),
    height: z.string()
        .refine(value => parseFloat(value) > 0, { message: "Height must be a positive number" }),
    bodyCompositionGoal: z.enum([BodyCompositionGoal.GAIN, BodyCompositionGoal.LOSE, BodyCompositionGoal.MAINTAIN]),
    activityLevel: z.enum([ActivityLevel.SEDENTARY, ActivityLevel.LIGHT, ActivityLevel.MODERATE, ActivityLevel.ACTIVE, ActivityLevel.VERY_ACTIVE])
}).refine((data) => {
    const { day, month, year } = data
    const parsedDay = parseInt(day)
    const parsedMonth = parseInt(month)
    const parsedYear = parseInt(year)
    const date = new Date(parsedYear, parsedMonth - 1, parsedDay)
    return date.getDate() === parsedDay && date.getMonth() === parsedMonth - 1 && date.getFullYear() === parsedYear
}, { message: "Invalid date. Please provide a valid date." })


export const weightSchema = z.object({
    weight: z.string()
        .refine(value => parseFloat(value) > 0, { message: "Weight must be a positive number" })
})

export const heightSchema = z.object({
    height: z.string()
        .refine(value => parseFloat(value) > 0, { message: "Height must be a positive number" })
})

export const bodyCompositionGoalSchema = z.object({
    bodyCompositionGoal: z.enum([BodyCompositionGoal.GAIN, BodyCompositionGoal.LOSE, BodyCompositionGoal.MAINTAIN])
})

export const activityLevelSchema = z.object({
    activityLevel: z.enum([ActivityLevel.SEDENTARY, ActivityLevel.LIGHT, ActivityLevel.MODERATE, ActivityLevel.ACTIVE, ActivityLevel.VERY_ACTIVE])
})

export const exerciseSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters"
    }).max(50, {
        message: "Name can be at most 50 characters"
    }),
    sets: z.string().min(1, {
        message: "Minimum 1 character"
    }).max(10, {
        message: "Maximum 10 characters"
    }),
    reps: z.string().min(1, {
        message: "Minimum 1 character"
    }).max(10, {
        message: "Maximum 10 characters"
    }),
    intensity: z.string().min(1, {
        message: "Minimum 1 character"
    }).max(10, {
        message: "Maximum 10 characters"
    }),
    intensityMetric: z.optional(z.enum([intensityMetric.KG, intensityMetric.LBS, intensityMetric.SECONDS, intensityMetric.MINUTES],))
})

export const workoutSchema = z.object({
    name: z.string().min(3, {
        message: "Name must be at least 3 characters"
    }).max(50, {
        message: "Name can be at most 50 characters"
    }),
    exercises: z.array(exerciseSchema).min(1, {
        message: "Exercises must be add least 1 exercise"
    })
})