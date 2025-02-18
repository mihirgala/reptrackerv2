import { BottomNav } from "@/components/normal/bottom-navbar"

interface ProtectedLayoutProps {
    children: React.ReactNode
  }

const ProtectedLayout = ({children}:ProtectedLayoutProps) => {
  return (
    <>
        <div>
            {children}
        </div>
        <BottomNav/>
    </>
  )
}

export default ProtectedLayout
