import { BottomNav } from "@/components/normal/bottom-navbar"
import { Suspense } from "react"
import LoadingPage from "./loading"

interface ProtectedLayoutProps {
    children: React.ReactNode
  }

const ProtectedLayout = ({children}:ProtectedLayoutProps) => {
  return (
    <>
        <div>
        <Suspense fallback={<LoadingPage/>}>
          {children}
          </Suspense>
        </div>
        <BottomNav/>
    </>
  )
}

export default ProtectedLayout
