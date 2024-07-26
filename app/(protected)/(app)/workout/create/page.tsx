import { Badge } from "@/components/ui/badge"
import { getPersonalInfoIdByUserId, getWorkoutCountByPersonalInfoId } from "@/data"
import { getUser } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { redirect } from "next/navigation"
import { Montserrat } from "next/font/google"
import { CreateWorkoutForm } from "@/components/protected/app/workout/create-workout-form"

const fontMontserrat = Montserrat({
    subsets: ["latin"],
    weight: ["700"]
  })

const CreateWorkoutPage = async () => {
    const user = await getUser()
    const personalInfoId = await getPersonalInfoIdByUserId(user?.id!)
    const WorkoutCount = await getWorkoutCountByPersonalInfoId(personalInfoId!)
    const sheetsRemaining = WorkoutCount ? 7 - WorkoutCount : 7
    if(sheetsRemaining === 0){
        return (redirect("/workout"))
    }
    
  return (
    <div>
        <main className="min-h-[calc(100vh-4rem)] flex flex-col gap-5">
        <h1 className={cn("text-3xl font-bold drop-shadow-lg tracking-tight text-center", fontMontserrat.className)}>Create Workout</h1>
        <div className="flex gap-2 items-center self-end">
          <p className="text-sm text-muted-foreground font-semibold">Sheets remaining</p><Badge>{sheetsRemaining}</Badge>
        </div>
        <div>
            <CreateWorkoutForm personalInfoId={personalInfoId!}/>
        </div>
        </main>
    </div>
  )
}
export default CreateWorkoutPage