"use server"

import { auth } from "@/auth"
import { getUserById } from "@/data"
import { db } from "@/lib/db"
import { razorpay } from "@/lib/razorpay"

export const cancelSubscription = async () => {
    try {
        const session = await auth()
        const user = await getUserById(session?.user.id!)
        if (!user) {
            return { error: "User not found" }
        }

        if (!user.subscriptionId) {
            return { error: "No subscription found" }
        }

        await razorpay.subscriptions.cancel(user.subscriptionId, false)
        await db.user.update({
            where: {
                id: user.id
            },
            data: {
                subscriptionId: null,
            }
        })
        return { success: true,message:"Subscription Cancelled" }
    } catch (e) {
        console.error(e)
        return { error: "Something went wrong!" }
    }
}