type RazorPayHandlerResponse = {
    razorpay_payment_id: string;
    razorpay_subscription_id: string;
    razorpay_signature: string;
}

type Exercise = {
    name: string,
    sets: string,
    reps: string,
}
type Workout = {
    name: string,
    exercises: Exercise[]
}

type Meal = {
    name: string,
    Foods: Food[],
    protein: string,
    carbohydrates: string,
    fats: string
    totalCalories: string,
}


type Food = {
    name: string,
    protein: string,
    carbohydrates: string,
    fats: string,
    calories: string
}