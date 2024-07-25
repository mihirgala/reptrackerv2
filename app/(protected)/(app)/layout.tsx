import { NormalNavbar } from "@/components/normal/navbar"
import { getPersonalInfoIdByUserId } from "@/data"
import { getUser } from "@/lib/auth"
import { redirect } from "next/navigation"

interface AppLayoutProps {
  children: React.ReactNode
}
const AppLayout = async ({ children }: AppLayoutProps) => {
  const user = await getUser()
  const personalInfoId = await getPersonalInfoIdByUserId(user?.id!)
  if(!personalInfoId){
    redirect("/onboarding")
  }
  return (
    <>
      <div>
        <div className="my-2 mx-5">
          <NormalNavbar user={user} />
        </div>
        <div className="mx-5">
          {children}
        </div>
      </div>
    </>
  )
}
export default AppLayout