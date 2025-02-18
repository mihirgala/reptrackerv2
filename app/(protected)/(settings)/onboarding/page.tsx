import { OnboardingComponent } from "@/components/protected/onboarding/onboarding"
import { getPersonalInfoByUserId } from "@/data"
import { getUser } from "@/lib/auth"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
    title: `Onboarding – Set Up Your Fitness Profile`,
    description:`Welcome! Set up your account by entering key details to personalize your fitness journey. Tailor workout plans, set nutrition goals, and prepare to track your progress with AI-powered features.`
  }

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