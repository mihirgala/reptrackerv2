import { BMIComponent } from "@/components/protected/app/dashboard/bmi"
import { TDEEComponent } from "@/components/protected/app/dashboard/tdee"
import { WeightChart } from "@/components/protected/app/dashboard/weight-chart"
import { getMonthlyAvgWeightByPersonalInfoId, getPersonalInfoByUserId } from "@/data"
import { getUser } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { Montserrat } from "next/font/google"

const fontMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"]
})

export const metadata: Metadata = {
  title: `Dashboard`,
}

const DashboardPage = async () => {

  const user = await getUser()
  const personalInfo = await getPersonalInfoByUserId(user?.id!)
  const chartData = await getMonthlyAvgWeightByPersonalInfoId(personalInfo?.id!)

  return (
    <div>
      <main className="min-h-[calc(100vh-11rem)] flex gap-5 flex-col">
        <h1 className={cn("text-3xl font-bold drop-shadow-lg tracking-tight text-center mb-10", fontMontserrat.className)}>Dashboard</h1>
        {personalInfo && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <TDEEComponent personalInfo={personalInfo} weight={user?.weight!} />
            <WeightChart chartData={chartData} />
            <BMIComponent personalInfo={personalInfo} weight={user?.weight!} />
          </div>
        )}
      </main>
    </div>
  )
}
export default DashboardPage