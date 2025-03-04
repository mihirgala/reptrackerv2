"use server"

import { db } from "@/lib/db"

export const givePremiumAccess = async (userId: string) => {
    try {
        await db.user.update({
            where: {
                id: userId
            },
            data: {
                subscriptionCurrendCycleEnd: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
            }
        })
    } catch (e) {
        console.log(e)
    }
}