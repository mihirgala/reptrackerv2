import { db } from "@/lib/db"
import { razorpay } from "@/lib/razorpay"
import { startOfYear, endOfYear } from 'date-fns'

export const getLoginCodeByEmail = async (email: string) => {
    try {
        if (!email) {
            throw new Error("Invalid Request")
        }
        const loginCode = await db.loginCode.findFirst({ where: { email } })
        return loginCode
    } catch (e) {
        console.error(e)
    }
}

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        if (!email) {
            throw new Error("Invalid Request")
        }
        const verificationToken = await db.verificationToken.findFirst({ where: { email } })
        return verificationToken
    } catch (e) {
        console.error(e)
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        if (!email) {
            throw new Error("Invalid Request")
        }
        const user = await db.user.findFirst({ where: { email } })
        return user
    } catch (e) {
        console.error(e)
    }
}

export const getUserById = async (id: string) => {
    try {
        if (!id) {
            throw new Error("Invalid Request")
        }
        const user = await db.user.findFirst({ where: { id } })
        return user
    } catch (e) {
        console.error(e)
    }
}

export const getAccountByUserId = async (userId: string) => {
    try {
        if (!userId) {
            throw new Error("Invalid Request")
        }
        const account = await db.account.findFirst({ where: { userId } })
        return account
    } catch (e) {
        console.error(e)
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try {
        if (!token) {
            throw new Error("Invalid Request")
        }
        const verificationToken = await db.verificationToken.findFirst({ where: { token } })
        return verificationToken
    } catch (e) {
        console.error(e)
    }
}

export const getPaymentByReferenceId = async (referenceId: string) => {
    try {
        if (!referenceId) {
            throw new Error("Invalid Request")
        }
        const payment = await db.payment.findFirst({
            where: {
                razorpay_payment_id: referenceId
            }
        })
        return payment
    } catch (e) {
        console.error(e)
    }
}

export const getSubscriptionByUserId = async (userId: string) => {
    try {
        if (!userId) {
            throw new Error("Invalid request")
        }

        const user = await db.user.findFirst({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new Error("User Not found")
        }
        if (!user.subscriptionId) {
            return null
        }

        const subscription = await razorpay.subscriptions.fetch(user.subscriptionId)
        return subscription
    } catch (e) {
        console.error(e)
    }
}

export const getUserBySubscriptionId = async (subscriptionId: string) => {
    try {
        if (!subscriptionId) {
            throw new Error("Invalid request")
        }
        const user = await db.user.findFirst({
            where: {
                subscriptionId
            }
        })
        return user
    } catch (e) {
        console.error(e)
    }
}

export const getPersonalInfoByUserId = async (userId: string) => {
    try {
        if (!userId) {
            throw new Error("Invalid request")
        }
        const personalInfo = await db.personalInfo.findFirst({ where: { userId } })
        return personalInfo
    } catch (e) {
        console.error(e)
    }
}

export const getPersonalInfoIdByUserId = async (userId: string) => {
    try {
        if (!userId) {
            throw new Error("Invalid request")
        }
        const personalInfo = await db.personalInfo.findFirst({ where: { userId }, select: { id: true } })
        return personalInfo?.id
    } catch (e) {
        console.error(e)
    }

}

export const getLatestWeightByPersonalInfoId = async (personalInfoId: string) => {
    try {
        if (!personalInfoId) {
            throw new Error("Invalid request")
        }
        const weight = await db.weight.findFirst({ where: { personalInfoId }, orderBy: { createdAt: "desc" } })
        return weight?.weight
    } catch (e) {
        console.error(e)
    }
}

export const getLatestWeightTimeByPersonalInfoId = async (personalInfoId: string) => {
    try {
        if (!personalInfoId) {
            throw new Error("Invalid request")
        }
        const weight = await db.weight.findFirst({ where: { personalInfoId }, orderBy: { createdAt: "desc" } })
        return weight?.createdAt
    } catch (e) {
        console.error(e)
    }
}

interface MonthlyAvgWeight {
    monthYear: string
    avgWeight: number
}

export const getMonthlyAvgWeightByPersonalInfoId = async (personalInfoId: string, year = new Date().getFullYear()) => {
    try {
        if (!personalInfoId) {
            throw new Error("Invalid request: personalInfoId is required")
        }

        const now = new Date()
        now.setFullYear(year)
        const startOfCurrentYear = startOfYear(now)
        const endOfCurrentYear = endOfYear(now)

        // Fetch records for the year
        const weightData = await db.weight.findMany({
            where: {
                personalInfoId,
                createdAt: {
                    gte: startOfCurrentYear,
                    lte: endOfCurrentYear
                }
            },
            select: {
                weight: true,
                createdAt: true
            }
        })

        const monthlyWeightSums: { [key: string]: { sum: number, count: number } } = {};

        weightData.forEach(record => {
            const date = new Date(record.createdAt);
            const monthKey = `${date.toLocaleString("default", { month: "long" })}`; // Format: YYYY-M

            if (!monthlyWeightSums[monthKey]) {
                monthlyWeightSums[monthKey] = { sum: 0, count: 0 };
            }

            monthlyWeightSums[monthKey].sum += record.weight;
            monthlyWeightSums[monthKey].count += 1;
        });

        // Calculate average weights for each month
        const result = Object.keys(monthlyWeightSums).map(monthKey => {
            const { sum, count } = monthlyWeightSums[monthKey];
            return {
                month: monthKey,
                weight: count > 0 ? parseFloat((sum / count).toFixed(2)) : 0
            };
        });

        return result;
    } catch (e) {
        console.error("Error fetching monthly average weight:", e)
        throw e
    }
}

export const getWorkoutsByPersonalInfoId = async (personalInfoId: string) => {
    try {
        if (!personalInfoId) {
            throw new Error("Invalid request: personalInfoId is required")
        }
        const workouts = await db.workout.findMany({
            where: {
                personalInfoId
            }
        })
        return workouts
    } catch (e) {
        console.error(e)
    }
}

export const getWorkoutCountByPersonalInfoId = async (personalInfoId: string) => {
    try {
        if (!personalInfoId) {
            throw new Error("Invalid request: personalInfoId is required")
        }
        const workouts = await db.workout.count({
            where: {
                personalInfoId
            }
        })
        return workouts
    } catch (e) {
        console.error(e)
    }
}

export const getExercisesByWorkoutId = async (workoutId: string) => {
    try {
        if (!workoutId) {
            throw new Error("Invalid request: workoutId is required")
        }
        const exercises = await db.exercise.findMany({
            where: {
                workoutId
            }
        })
        return exercises
    } catch (e) {
        console.error(e)
    }
}

export const getPersonalInfoById = async (id: string) => {
    try {
        if (!id) {
            throw new Error("Invalid request: id is required")
        }
        const personalInfo = await db.personalInfo.findFirst({
            where: {
                id
            }
        })
        return personalInfo
    } catch (e) {
        console.error(e)
    }
}

export const getWorkoutById = async (id: string) => {
    try {
        if (!id) {
            throw new Error("Invalid request: id is required")
        }
        const workout = await db.workout.findFirst({
            where: {
                id
            }
        })
        return workout
    } catch (e) {
        console.error(e)
    }
}