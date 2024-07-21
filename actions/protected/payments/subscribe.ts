"use server"

import { auth } from "@/auth"
import { getUserById } from "@/data"
import { db } from "@/lib/db"
import { razorpay } from "@/lib/razorpay"

export const buySubscribe = async () => {
    try {
        const session = await auth()
        const user = await getUserById(session?.user.id!)
        if (!user) {
            return { error: "User not found" }
        }
        if(session?.user.plan === "PREMIUM"){
            return {error:"You already have a subscription"}
        }
        if (user.subscriptionId) {
            const subscription = await razorpay.subscriptions.fetch(user.subscriptionId)
            if(subscription.status !== "created"){
                return {error:"Manage subscription from Billings"}
            }
            return {success:true, id:subscription.id}
        }

        const subscription = await razorpay.subscriptions.create({
            plan_id: process.env.PLAN_ID || "plan_OaAdsfA7X9k9kZ",
            customer_notify: true,
            total_count: 12,
        })

        if (!subscription) {
            return { error: "Something went wrong!" }
        }

        await db.user.update({
            where: {
                id: user.id
            },
            data: {
                subscriptionId: subscription.id,
            }
        })
        return { success: true, id:subscription.id }
    } catch (e) {
        console.error(e)
        return { error: "Something went wrong!" }
    }
}