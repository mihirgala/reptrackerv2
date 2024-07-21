import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FaDumbbell } from "react-icons/fa6"
import { MdFoodBank } from "react-icons/md"
import { SiGooglegemini } from "react-icons/si"

export const Features = () => {
    return (
        <div className="mx-20 grid gap-5 md:grid-cols-3">
            <Card>
                <CardHeader>
                    <MdFoodBank size={40} />
                    <h3 className="font-bold text-xl">Nutrition guide</h3>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm font-semibold">
                    <p>Receive daily macronutrient recommendations to optimize your diet.</p>
                    <p>Calculate your TDEE, BMI, and BMR for comprehensive nutritional insights.</p>
                    <p>Achieve your fitness goals with personalized and actionable nutrition advice.</p>
                </CardContent>
            </Card>
            <Card className="border-primary">
                <CardHeader>
                    <SiGooglegemini size={40} />
                    <h3 className="font-bold text-xl">AI Features</h3>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm font-semibold">
                    <p>Engage with our AI to get answers to your fitness and nutrition questions.</p>
                    <p>Enjoy the convenience of up to 10 inquiries per day on the free plan.</p>
                    <p>Premium users can save their chat history for future reference and deeper insights.</p>
                </CardContent>
            </Card >
            <Card>
                <CardHeader>
                    <FaDumbbell size={40} />
                    <h3 className="font-bold text-xl">Track Your Workouts</h3>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm font-semibold">
                    <p>Effortlessly log your sets, reps, and weights for each exercise.</p>
                    <p>Access and utilize a variety of preset workout sheets tailored to your goals.</p>
                    <p>Create and customize your own workout plans to suit your unique fitness journey.</p>
                </CardContent>
            </Card>
        </div >
    )
}