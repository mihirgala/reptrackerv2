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

type bmicolors = "#ef4444" | "#22c55e" | "#ea580c" | "#dc2626"
export const calculateBMI = (personalInfo: PersonalInfo, weight: number): { lable: string, value: number, color: bmicolors } | undefined => {

  let BMI = weight / ((personalInfo.height / 100) * (personalInfo.height / 100))
  BMI = parseFloat(BMI.toFixed(2))
  if (BMI < 18.5) {
    return { lable: "Underweight", value: BMI, color: "#ef4444" }
  }
  else if (BMI < 25 && BMI >= 18.5) {
    return { lable: "Normal", value: BMI, color: "#22c55e" }
  }
  else if (BMI < 30 && BMI >= 25) {
    return { lable: "Overweight", value: BMI, color: "#ea580c" }
  }
  else if (BMI >= 30) {
    return { lable: "Obese", value: BMI, color: "#dc2626" }
  }
}

export const calculateMacros = (tdee: number, bodyCompositionGoal: BodyCompositionGoal) => {
  let adjustedTDEE = tdee

  if (bodyCompositionGoal === "LOSE") {
    adjustedTDEE = tdee - (tdee * 0.15)
  } else if (bodyCompositionGoal === "GAIN") {
    adjustedTDEE = tdee + (tdee * 0.15)
  }

  const proteinRatio = 0.3
  const carbRatio = 0.4
  const fatRatio = 0.3

  const protein = (adjustedTDEE * proteinRatio) / 4
  const carbohydrates = (adjustedTDEE * carbRatio) / 4
  const fat = (adjustedTDEE * fatRatio) / 9

  const totalCalories = (protein * 4) + (carbohydrates * 4) + (fat * 9)

  return {
    totalCalories: totalCalories.toFixed(0),
    protein: protein.toFixed(0),
    carbohydrates: carbohydrates.toFixed(0),
    fat: fat.toFixed(0),
  }
}
