import { GenerateWorkoutComponent } from "@/components/protected/app/workout/generate-workout"
import { getPersonalInfoIdByUserId } from "@/data"
import { getUser } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { Montserrat } from "next/font/google"
import { redirect } from "next/navigation"

const fontMontserrat = Montserrat({
    subsets: ["latin"],
    weight: ["700"]
})

const GenerateWorkoutPage = async () => {
    const user = await getUser()
    if (user?.plan !== "PREMIUM") {
        redirect("/workout")
    }
    const personalInfoId = await getPersonalInfoIdByUserId(user?.id!)

    return (
        <div>
            <main className="min-h-[calc(100vh-4rem)] flex flex-col gap-5">
                <h1 className={cn("text-3xl font-bold drop-shadow-lg tracking-tight text-center", fontMontserrat.className)}>
                    Generate Workout With AI
                </h1>
                <div className="w-full self-center my-auto">
                <GenerateWorkoutComponent personalInfoId={personalInfoId!}/>
                </div>
            </main>
        </div>
    )
}
export default GenerateWorkoutPage