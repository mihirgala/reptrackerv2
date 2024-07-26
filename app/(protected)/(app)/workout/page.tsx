import { Button } from "@/components/ui/button"
import { getPersonalInfoIdByUserId, getWorkoutsByPersonalInfoId } from "@/data"
import { getUser } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { List, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Montserrat } from "next/font/google"
import Link from "next/link"
import { SiGooglegemini } from "react-icons/si"

const fontMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"]
})


const WorkoutPage = async () => {

  const user = await getUser()
  const personalInfoId = await getPersonalInfoIdByUserId(user?.id!)
  const workouts = await getWorkoutsByPersonalInfoId(personalInfoId!)
  const sheetsRemaining = workouts ? 7 - workouts?.length : 7
  const disableCreateWorkout = workouts ? (workouts?.length > 6 ? true : false) : false

  return (
    <div>
      <main className="min-h-[calc(100vh-4rem)] flex flex-col gap-5">
        <h1 className={cn("text-3xl font-bold drop-shadow-lg tracking-tight text-center", fontMontserrat.className)}>Workouts</h1>
        <div className="flex gap-2 items-center self-end">
          <p className="text-sm text-muted-foreground font-semibold">Sheets remaining</p><Badge>{sheetsRemaining}</Badge>
        </div>
        <div className="flex gap-5 self-center my-10">
          <Button disabled={disableCreateWorkout} className="p-0 m-0 aspect-square" variant={"outline"} asChild={!disableCreateWorkout}>
            {!disableCreateWorkout ? (
              <Link href={"/workout/create"}>
                <Plus size={20} />
              </Link>
            ) : (<Plus size={20} />)}

          </Button>
          <Button className="p-0 m-0 aspect-square" variant={"outline"}><List size={20} /></Button>
          <Button disabled className="p-0 m-0 aspect-square border-primary" variant={"outline"}><SiGooglegemini size={20} /></Button>
        </div>
        {workouts?.length === 0 && <div className="flex justify-center items-center">
          <div className="text-center">
            <p className="text-xl font-bold">No workouts yet</p>
            <p className="text-sm">Create your first workout to get started</p>
          </div>
        </div>}
        {workouts && workouts.map((workout) => (
          <div key={workout.id}>
            <h2>{workout.name}</h2>
          </div>
        ))}
      </main>
    </div>
  )
}
export default WorkoutPage