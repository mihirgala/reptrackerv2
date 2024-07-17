import { SignOutButton } from "@/components/auth/signout-button"
import { Button } from "@/components/ui/button"
import { getUser } from "@/lib/auth"
import { Sign } from "crypto"
import Link from "next/link"

const HomePage = async () => {
  const user = await getUser()
  return (
    <div className="flex justify-center items-center">
      Home page
    </div>
  )
}
export default HomePage