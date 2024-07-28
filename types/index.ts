export type RazorPayHandlerResponse = {
    razorpay_payment_id: string;
    razorpay_subscription_id: string;
    razorpay_signature: string;
}

export type Exercise = {
    name: string,
    sets: string,
    reps: string,
}
export type Workout = {
    name: string,
    exercises: Exercise[]
}