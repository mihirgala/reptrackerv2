"use server"

export const getRazorPayPublicKey = async () =>{
    return process.env.RAZORPAY_KEY_ID
}