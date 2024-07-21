import { db } from "@/lib/db"
import { razorpay } from "@/lib/razorpay"

export const getLoginCodeByEmail = async (email: string) => {
    try {
        const loginCode = await db.loginCode.findFirst({ where: { email } })
        return loginCode
    } catch (e) {
        console.error(e)
    }
}

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({ where: { email } })
        return verificationToken
    } catch (e) {
        console.error(e)
    }
}

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findFirst({ where: { email } })
        return user
    } catch (e) {
        console.error(e)
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findFirst({ where: { id } })
        return user
    } catch (e) {
        console.error(e)
    }
}

export const getAccountByUserId = async (userId: string) => {
    try {
        const account = await db.account.findFirst({ where: { userId } })
        return account
    } catch (e) {
        console.error(e)
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try {
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
        const payment = await db.payments.findFirst({
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