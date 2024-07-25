import { OnboardingComponent } from "@/components/protected/onboarding/onboarding"
import { getPersonalInfoByUserId } from "@/data"
import { getUser } from "@/lib/auth"
import { redirect } from "next/navigation"

const OnboardingPage = async () => {
    const user = await getUser()
    if(!user) return null
    const personalInfo = await getPersonalInfoByUserId(user?.id!)
    if(personalInfo){
        redirect("/settings")
    }
    return (
        <div>
            <main className="min-h-[calc(100vh-4rem)] flex justify-center items-center">
            <OnboardingComponent user={user}/>
            </main>
        </div>
    )
}
export default OnboardingPage