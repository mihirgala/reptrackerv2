import { ActivityLevel, BodyCompositionGoal, PersonalInfo } from "@prisma/client"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateAge = (birthDate: Date | undefined) => {
  if (!birthDate) {
    return null
  }
  const currentDate = new Date()
  const yearDiff = currentDate.getFullYear() - birthDate.getFullYear()
  const monthDiff = currentDate.getMonth() - birthDate.getMonth()
  const dayDiff = currentDate.getDate() - birthDate.getDate()

  // If the current month and day are before the birth month and day, subtract one year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    return yearDiff - 1
  } else {
    return yearDiff
  }
}

export const calculateTDEE = (personalInfo: PersonalInfo, weight: number) => {
  const age = calculateAge(new Date(personalInfo.dob))
  const { sex, height, activityLevel } = personalInfo
  let bmr: number

  if (sex === 'MALE') {
    bmr = 10 * weight + 6.25 * height - 5 * age! + 5
  } else if (sex === 'FEMALE') {
    bmr = 10 * weight + 6.25 * height - 5 * age! - 161
  } else {
    bmr = 1200
  }

  const activityLevels: { [key in ActivityLevel]: number } = {
    "SEDENTARY": 1.2,
    "LIGHT": 1.375,
    "MODERATE": 1.55,
    'ACTIVE': 1.725,
    'VERY_ACTIVE': 1.9
  }


  const tdee = bmr * activityLevels[activityLevel]
  return parseInt(tdee.toFixed(0))
}

export const bodyCompositionGoalCalories = (bodyCompositionGoal: BodyCompositionGoal) => {
  switch (bodyCompositionGoal) {
    case "LOSE": return { lable: "Lose fat", calories: "-500 KCAL/Day" }
    case "GAIN": return { lable: "Gain muscle", calories: "+300 KCAL/Day" }
    case "MAINTAIN": return { lable: "Maintenance", calories: "0 KCAL/day" }
  }
}  