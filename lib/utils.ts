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
