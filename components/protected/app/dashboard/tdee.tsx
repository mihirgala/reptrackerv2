import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { bodyCompositionGoalCalories, calculateTDEE } from "@/lib/utils"
import { PersonalInfo } from "@prisma/client"

interface TDEEComponentProps {
    personalInfo: PersonalInfo
    weight: number
}
export const TDEEComponent = ({ personalInfo, weight }: TDEEComponentProps) => {
    const TDEE = calculateTDEE(personalInfo, weight)
    const bodyCompGoal = bodyCompositionGoalCalories(personalInfo.bodyCompositionGoal)
    return (
        <Card>
            <CardHeader>
                <CardTitle>Total Daily Energy Expenditure</CardTitle>
                <CardDescription>Acount of calories consumed by you each day</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                <div>
                    <h2 className="text-6xl font-extrabold text-center text-foreground">{TDEE}</h2>
                    <h2 className="text-xl text-center font-bold text-muted-foreground">KCAL/Day</h2>
                </div>
                <div>
                    <h3 className="text-sm text-muted-foreground font-bold text-center">Your Goal</h3>
                    <p className="text-xl font-bold text-center">{bodyCompGoal.lable}</p>
                    <p className="font-extrabold text-center text-foreground">{bodyCompGoal.calories}</p>
                </div>
            </CardContent>
        </Card>
    )
}