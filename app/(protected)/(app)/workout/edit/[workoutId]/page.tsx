import { getExercisesByWorkoutId, getPersonalInfoIdByUserId, getWorkoutById } from "@/data"
import { getUser } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { redirect } from "next/navigation"
import { Montserrat } from "next/font/google"
import { EditWorkoutForm } from "@/components/protected/app/workout/edit-workout-form"

const fontMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"]
})

interface CreateWorkoutPageProps {
  params: {
    workoutId: string
  }
}

const CreateWorkoutPage = async ({ params }: CreateWorkoutPageProps) => {
  const user = await getUser()
  const personalInfoId = await getPersonalInfoIdByUserId(user?.id!)
  const workout = await getWorkoutById(params.workoutId)
  if(!workout){
    return redirect("/workout")
  }
  if(workout.personalInfoId !== personalInfoId){
    return redirect("/workout")
  }
  const exercises = await getExercisesByWorkoutId(workout.id!)

  return (
    <div>
      <main className="min-h-[calc(100vh-4rem)] flex flex-col gap-5">
        <h1 className={cn("text-3xl font-bold drop-shadow-lg tracking-tight text-center", fontMontserrat.className)}>Edit Workout</h1>
        <div>
          <EditWorkoutForm workout={workout} exercises={exercises!}/>
        </div>
      </main>
    </div>
  )
}
export default CreateWorkoutPage