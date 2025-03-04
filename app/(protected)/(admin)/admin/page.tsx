import { UserTable } from '@/components/protected/admin/user-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getTotalChatCount, getTotalExerciseCount, getTotalFoodCount, getTotalMealCount, getTotalMessageCount, getTotalPremiumUserCount, getTotalUserCount, getTotalWorkoutCount, getUsersByQuery } from '@/data'
import { getUser } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { Montserrat } from 'next/font/google'
import { redirect } from 'next/navigation'

const fontMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"]
})

const AdminPage = async () => {
  const user = await getUser()
  if (user?.role !== "ADMIN") {
    return redirect("/dashboard")
  }

  const [
    totalUserCount,
    dbUsers,
    totalPremiumUserCount,
    totalWorkoutCount,
    totalExerciseCount,
    totalMealCount,
    totalFoodCount,
    totalChatCount,
    totalMessageCount
  ] = await Promise.all([
    getTotalUserCount(),
    getUsersByQuery(),
    getTotalPremiumUserCount(),
    getTotalWorkoutCount(),
    getTotalExerciseCount(),
    getTotalMealCount(),
    getTotalFoodCount(),
    getTotalChatCount(),
    getTotalMessageCount()
  ])
  const totalFreeUserCount = (totalUserCount || 0) - (totalPremiumUserCount || 0)

  // console.log(dbUsers)

  return (
    <>
      <div>
        <main className="min-h-[calc(100vh-11rem)] flex gap-5 flex-col">
          <h1 className={cn("text-3xl font-bold drop-shadow-lg tracking-tight text-center mb-10", fontMontserrat.className)}>Admin Panel</h1>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            <div className='flex flex-col gap-5'>
              <Card>
                <CardHeader>
                  <CardTitle>Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex px-10 flex-row justify-between'>
                    <div>
                      <h2 className={`text-6xl font-extrabold text-center`}>{totalUserCount}</h2>
                      <p className="text-xl text-center font-bold text-muted-foreground">Total</p>
                    </div>
                    <div>
                      <h2 className={`text-6xl font-extrabold text-center text-primary`}>{totalPremiumUserCount}</h2>
                      <p className="text-xl text-center font-bold text-muted-foreground">Premium</p>
                    </div>
                    <div>
                      <h2 className={`text-6xl font-extrabold text-center`}>{totalFreeUserCount}</h2>
                      <p className="text-xl text-center font-bold text-muted-foreground">Free</p>
                    </div>
                  </div>
                  <Separator orientation='vertical' />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='flex px-10 flex-row justify-between'>
                    <div>
                      <h2 className={`text-6xl font-extrabold text-center`}>{totalWorkoutCount}</h2>
                      <p className="text-xl text-center font-bold text-muted-foreground">Workouts</p>
                      <h3 className={`text-4xl fond-semibold text-center`}>{totalExerciseCount}</h3>
                      <p className="text-xl text-center font-semibold text-muted-foreground">Excercises</p>
                    </div>
                    <div>
                      <h2 className={`text-6xl font-extrabold text-center`}>{totalMealCount}</h2>
                      <p className="text-xl text-center font-bold text-muted-foreground">Meal Plans</p>
                      <h3 className={`text-4xl fond-semibold text-center`}>{totalFoodCount}</h3>
                      <p className="text-xl text-center font-semibold text-muted-foreground">Food Items</p>
                    </div>
                    <div>
                      <h2 className={`text-6xl font-extrabold text-center`}>{totalChatCount}</h2>
                      <p className="text-xl text-center font-bold text-muted-foreground">Chats</p>
                      <h3 className={`text-4xl fond-semibold text-center`}>{totalMessageCount}</h3>
                      <p className="text-xl text-center font-semibold text-muted-foreground">Messages</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className='hidden md:col-span-2 md:block'>
              <CardHeader>
                <CardTitle>User Table</CardTitle>
              </CardHeader>
              <CardContent>
                <UserTable dbUsers={dbUsers} />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  )
}

export default AdminPage