import { TDEEComponent } from "@/components/protected/app/dashboard/tdee"
import { WeightChart } from "@/components/protected/app/dashboard/weight-chart"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getMonthlyAvgWeightByPersonalInfoId, getPersonalInfoByUserId } from "@/data"
import { getUser } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { Montserrat } from "next/font/google"

const fontMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"]
})

const DashboardPage = async () => {
  const user = await getUser()
  const personalInfo = await getPersonalInfoByUserId(user?.id!)
  const chartData = await getMonthlyAvgWeightByPersonalInfoId(personalInfo?.id!)

  return (
    <div>
      <main className="min-h-[calc(100vh-11rem)]">
        <h1 className={cn("text-3xl font-bold drop-shadow-lg tracking-tight text-center mb-10", fontMontserrat.className)}>Dashboard</h1>
        {personalInfo && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <TDEEComponent personalInfo={personalInfo} weight={user?.weight!} />
            <WeightChart personalInfoId={personalInfo?.id} />
          </div>
        )}
      </main>
    </div>
  )
}
export default DashboardPage