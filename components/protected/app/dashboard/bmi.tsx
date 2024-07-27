import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { calculateBMI } from "@/lib/utils"
import { PersonalInfo } from "@prisma/client"
import { Info } from "lucide-react"

interface BMIComponentProps {
  personalInfo: PersonalInfo
  weight: number
}
export const BMIComponent = ({ personalInfo, weight }: BMIComponentProps) => {
  const BMI = calculateBMI(personalInfo, weight)
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Body Mass Index</CardTitle>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button className="m-0 p-0 hover:bg-transparent" variant={"ghost"}><Info size={20} /></Button>
            </HoverCardTrigger>
            <HoverCardContent align="end" sideOffset={20}>
            <span className="text-muted-foreground text-sm font-semibold">BMI measures the ratio of your height to weight to assess overall health, calculated by dividing your weight in kilograms by your height in meters squared. However, BMI is not always accurate, as people with the same height and weight can have different BMIs due to varying lean mass. For more details, consult our AI assistant.</span>
            </HoverCardContent>
          </HoverCard>
        </div>
        <CardDescription>Calculated from your weight and height</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <h2 className={`text-6xl font-extrabold text-center`} style={{ color: BMI?.color }}>{BMI?.value}</h2>
          <p className="text-xl text-center font-bold text-muted-foreground">{BMI?.lable}</p>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-muted-foreground font-semibold text-sm text-center">BMI is not an accurate measure of health. Hover on the icon for more information.</p>
      </CardFooter>
    </Card>
  )
}