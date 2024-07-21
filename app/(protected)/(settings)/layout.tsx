import { NormalNavbar } from "@/components/normal/navbar"
import { getUser } from "@/lib/auth"

interface SettingsLayoutProps {
  children: React.ReactNode
}
const SettingsLayout = async ({ children }: SettingsLayoutProps) => {
  const user = await getUser()
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
export default SettingsLayout