import { db } from "@/lib/db"
import { razorpay } from "@/lib/razorpay"
import { calculateMacros, calculateTDEE } from "@/lib/utils"
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
            },
            orderBy: {
                createdAt: "asc"
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

export const getLatestGeneratedWorkout = async (userId: string) => {
    try {
        if (!userId) {
            throw new Error("Invalid request: userId is required")
        }
        const lastGeneratedWorkout = await db.lastGeneratedWorkout.findFirst({
            where: {
                userId
            }
        })
        return lastGeneratedWorkout
    } catch (e) {
        console.error(e)
    }
}

export const getLatestGeneratedMealPlan = async (userId: string) => {
    try {
        if (!userId) {
            throw new Error("Invalid request: userId is required")
        }
        const lastGeneratedMealPlan = await db.lastGeneratedMealPlan.findFirst({
            where: {
                userId
            }
        })
        return lastGeneratedMealPlan
    } catch (e) {
        console.error(e)
    }
}

export const getMealPlanByPersonalInfoId = async (personalInfoId: string) => {
    try {
        if (!personalInfoId) {
            throw new Error("Invalid request: personalInfoId is required")
        }
        const mealPlan = await db.meal.findMany({
            where: {
                personalInfoId
            },
            orderBy: {
                createdAt: "asc"
            }
        })
        return mealPlan
    } catch (e) {
        console.error(e)
    }
}

export const getFoodsByMealId = async (mealId: string) => {
    try {
        if (!mealId) {
            throw new Error("Invalid request: mealId is required")
        }
        const foods = await db.food.findMany({
            where: {
                mealId
            }
        })
        return foods
    } catch (e) {
        console.error(e)
    }
}

export const getChatbyId = async (id: string) => {
    try {
        if (!id) {
            throw new Error("Invalid request: id is required")
        }
        const chat = await db.chat.findFirst({
            where: {
                id
            }
        })
        return chat
    } catch (e) {
        console.error(e)
    }
}

export const getMessagesByChatId = async (chatId: string) => {
    try {
        if (!chatId) {
            throw new Error("Invalid request: chatId is required")
        }
        const messages = await db.message.findMany({
            where: {
                chatId
            }
        })
        return messages
    } catch (e) {
        console.error(e)
    }
}

export const getChatsByUserId = async (userId: string) => {
    try {
        if (!userId) {
            throw new Error("Invalid request: userId is required")
        }
        const chats = await db.chat.findMany({
            where: {
                userId
            }
        })
        return chats
    } catch (e) {
        console.error(e)
    }
}

export const getSystemMessage = async (userId: string) => {
    try {
        if (!userId) {
            throw new Error("Invalid request: userId is required")
        }
        const personalInfo = await getPersonalInfoByUserId(userId)
        const dbworkouts = await getWorkoutsByPersonalInfoId(personalInfo?.id!)
        // console.log(dbworkouts)
        const workouts = await Promise.all(dbworkouts?.map(async (workout) => ({
            id: workout.id,
            name: workout.name,
            exercises: await db.exercise.findMany({
                where: { workoutId: workout.id },
                select: {
                    name: true,
                    sets: true,
                    reps: true,
                    intensity: true,
                    metric: true
                }
            })
        })) ?? [])
        const weight = await getLatestWeightByPersonalInfoId(personalInfo?.id!)
        const tdee = calculateTDEE(personalInfo!, weight as number)
        const macros = calculateMacros(tdee, personalInfo!.bodyCompositionGoal)
        const systemMessage = `
        user's workout plan: ${JSON.stringify(workouts)}
        user's macros: ${JSON.stringify(macros)}
        user's weight: ${weight} kgs
        user's height: ${personalInfo?.height} centimeters
        `
        return systemMessage
    } catch (e) {
        console.error(e)
        return null
    }
}

export const getChatNameById = async (id: string) => {
    try {
        if (!id) {
            throw new Error("Invalid request: chatId is required")
        }
        const chat = await db.chat.findFirst({
            where: {
                id
            },
            select: {
                name: true
            }
        })
        if (!chat) {
            return ""
        }
        return chat.name
    } catch (e) {
        console.error(e)
        return null
    }
}

export const getTotalUserCount = async () => {
    try {
        const count = await db.user.count()
        return count
    } catch (e) {
        console.error(e)
        return null
    }
}

export const getUsersByQuery = async (query?: string, page: number = 1, onlyPremium: boolean = false) => {
    const take = 5; // Number of users per page
    const skip = (page - 1) * take; // Offset for pagination

    if (onlyPremium) {

        try {
            if (!query || query.length === 0) {
                return await db.user.findMany({
                    where: {
                        subscriptionCurrendCycleEnd: {
                            gte: new Date()
                        }
                    }, take, skip
                })
            }
            const users = await db.user.findMany({
                where: {
                    OR: [
                        { email: { contains: query, mode: "insensitive" } },
                        { name: { contains: query, mode: "insensitive" } },
                    ],
                    subscriptionCurrendCycleEnd: {
                        gte: new Date()
                    }
                },
                take,
                skip,
            })
            return users
        } catch (e) {
            console.log(e)
            return null
        }
    }

    if (!query || query.length === 0) {
        return await db.user.findMany({ take, skip });
    }


    try {
        const users = await db.user.findMany({
            where: {
                OR: [
                    { email: { contains: query, mode: "insensitive" } },
                    { name: { contains: query, mode: "insensitive" } },
                ],
            },
            take,
            skip,
        });
        return users
    } catch (e) {
        console.log(e)
        return null
    }
}

export const getTotalPremiumUserCount = async () => {
    try {
        const count = await db.user.count({
            where: {
                subscriptionCurrendCycleEnd: {
                    gte: new Date()
                }
            }
        })
        return count
    } catch (e) {
        console.error(e)
        return null
    }
}

export const getTotalWorkoutCount = async () => {
    try {
        const count = await db.workout.count()
        return count
    } catch (e) {
        console.log(e)
    }
}

export const getTotalExerciseCount = async () => {
    try {
        const count = await db.exercise.count()
        return count
    } catch (e) {
        console.log(e)
    }
}

export const getTotalMealCount = async () => {
    try {
        const count = await db.meal.count()
        return count
    } catch (e) {
        console.log(e)
    }
}

export const getTotalFoodCount = async () => {
    try {
        const count = await db.food.count()
        return count
    } catch (e) {
        console.log(e)
    }
}

export const getTotalChatCount = async () => {
    try {
        const count = await db.chat.count()
        return count
    } catch (e) {
        console.log(e)
    }
}

export const getTotalMessageCount = async () => {
    try {
        const count = await db.message.count()
        return count
    } catch (e) {
        console.log(e)
    }
}