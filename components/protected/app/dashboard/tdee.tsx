import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { bodyCompositionGoalCalories, calculateTDEE } from "@/lib/utils"
import { PersonalInfo } from "@prisma/client"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"

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
                <div className="flex justify-between">
                    <CardTitle>Total Daily Energy Expenditure</CardTitle>
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Button className="m-0 p-0 hover:bg-transparent" variant={"ghost"}><Info size={20} /></Button>
                            </HoverCardTrigger>
                        <HoverCardContent align="end" sideOffset={20}>
                        <span className="text-muted-foreground text-sm font-semibold">TDEE (Total Daily Energy Expenditure) is the energy needed to maintain your weight. Based on your fitness goals, you're assigned a target calorie intake or burn. For example, if your TDEE is 2000 KCAL and your goal is -500 KCAL/day, you should aim to burn or eat 500 KCAL less daily, resulting in a 1500 KCAL/day intake.</span>
                        </HoverCardContent>
                    </HoverCard>
                </div>
                <CardDescription>Acount of calories required by you each day</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                <div>
                    <h2 className="text-6xl font-extrabold text-center text-primary">{TDEE}</h2>
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