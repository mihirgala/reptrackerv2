import { WeightChart } from "@/components/protected/app/dashboard/weight-chart"
import { Card } from "@/components/ui/card"
import { getMonthlyAvgWeightByPersonalInfoId, getPersonalInfoByUserId } from "@/data"
import { getUser } from "@/lib/auth"

const DashboardPage = async () => {
  const user = await getUser()
  const personalInfo = await getPersonalInfoByUserId(user?.id!)
  const chartData = await getMonthlyAvgWeightByPersonalInfoId(personalInfo?.id!)

  return (
    <div>
      <main className="min-h-[calc(100vh-11rem)]">
        <Card>
          {personalInfo && (
            <div className="grid grid-cols-3 gap-5">
            <WeightChart personalInfoId={personalInfo?.id} />
            <WeightChart personalInfoId={personalInfo?.id} />
            <WeightChart personalInfoId={personalInfo?.id} />
            </div>
          )}
        </Card>
      </main>
    </div>
  )
}
export default DashboardPage