import { ComparisionComponent } from "@/components/normal/compare"
import { PricingComponent } from "@/components/normal/pricing"
import { getUser } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { Montserrat } from "next/font/google"


const fontMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"]
})

export const metadata: Metadata = {
  title: `Plans & Pricing – Affordable Fitness Tracking for All Levels`,
  description:`Explore Reptracker’s flexible plans to suit your fitness needs. Start with our free plan for essential workout tracking, or upgrade to premium for AI-generated workout plans, nutrition guidance, and unlimited fitness support. Choose the plan that helps you achieve your fitness goals!`
}

const PricingPage = async () => {
  const user = await getUser()
  return (
    <div>
      <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-20">
        <div className="flex flex-col gap-5 mt-20">
          <h2 className={cn("text-5xl font-bold drop-shadow-lg tracking-tight text-center", fontMontserrat.className)}>Pricing</h2>
          <p className="text-foreground text-lg my-0 drop-shadow-lg text-center">From a newbie in the gym to that JACKED gymbro</p>
        </div>
        <div>
          <PricingComponent isUser={!!user} isPremium={user?.plan === "PREMIUM"} />
        </div>
        <div className="flex flex-col gap-5 mb-10 w-full md:w-[70%]">
          <h2 className={cn("text-5xl font-bold drop-shadow-lg tracking-tight text-center", fontMontserrat.className)}>Compare Plans</h2>
          <p className="text-foreground text-lg my-0 drop-shadow-lg text-center">Check out our plans in detail and see what&apos; the right fit for you!</p>
          <ComparisionComponent />
        </div>
      </main>
    </div>
  )
}
export default PricingPage