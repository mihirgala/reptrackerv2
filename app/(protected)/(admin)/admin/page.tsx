import { UserTable } from '@/components/protected/admin/user-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getTotalUserCount } from '@/data'
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

  const totalUserCount = await getTotalUserCount()

  return (
    <div>
      <main className="min-h-[calc(100vh-11rem)] flex gap-5 flex-col">
        <h1 className={cn("text-3xl font-bold drop-shadow-lg tracking-tight text-center mb-10", fontMontserrat.className)}>Admin Panel</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{totalUserCount}</p>
          </CardContent>
        </Card>
        <Card className='md:col-span-2'>
          <CardHeader>
            <CardTitle>User Table</CardTitle>
          </CardHeader>
          <CardContent>
            <UserTable/>
          </CardContent>
        </Card>
      </div>
      </main>
    </div>
  )
}

export default AdminPage