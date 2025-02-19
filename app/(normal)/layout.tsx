import { Footer } from "@/components/normal/footer"
import { NormalNavbar } from "@/components/normal/navbar"
import { getUser } from "@/lib/auth"

interface NormalLayoutProps {
  children: React.ReactNode
}
const NormalLayout = async ({children}:NormalLayoutProps) => {
    const user = await getUser()
  return (
    <div>
      <div className="my-2 mx-5">
        <NormalNavbar user={user}/>
      </div>
      <div className="mx-5">
        {children}
      </div>
      <Footer/>
    </div>
  )
}
export default NormalLayout