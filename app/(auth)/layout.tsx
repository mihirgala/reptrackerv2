import { AuthNavbar } from "@/components/auth/navbar"


interface AuthLayoutProps {
  children: React.ReactNode
}
const AuthLayout = ({children}:AuthLayoutProps) => {
  return (
    <div>
      <div className="my-2 mx-5">
        <AuthNavbar/>
      </div>
      <div className="mx-5">
        {children}
      </div>
    </div>
  )
}
export default AuthLayout