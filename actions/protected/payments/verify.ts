"use server"
import { db } from "@/lib/db";
import { razorpay } from "@/lib/razorpay";
import crypto from "crypto"

export const verifyPayment = async (response: RazorPayHandlerResponse) => {
    try {
        const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = response

        const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(razorpay_payment_id + '|' + razorpay_subscription_id)
            .digest('hex');

        if (generatedSignature !== razorpay_signature) {
            const Errtype = "Invalid Signature"
            // redirect(`/subscribe/failure?type=${Errtype}`)
            return { error: Errtype }
        }
        const user = await db.user.findFirst({
            where: {
                subscriptionId: razorpay_subscription_id
            }
        })

        if (!user) {
            return { error: "User not found!" }
        }

        const payment = await db.payments.create({
            data: {
                razorpay_payment_id,
                razorpay_subscription_id,
                razorpay_signature
            }
        })

        // redirect(`/subscribe/success?reference_id=${payment.razorpay_payment_id}`)
        return { success: true, referenceId: payment.razorpay_payment_id }
    } catch (e) {
        console.error(e)
        return { error: "Something went wrong!" }
    }
}