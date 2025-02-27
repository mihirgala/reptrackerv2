import { BottomNav } from "@/components/normal/bottom-navbar"
import { NormalNavbar } from "@/components/normal/navbar"
import { getUser } from "@/lib/auth"
import { redirect } from "next/navigation"

interface AdminLayoutProps {
    children: React.ReactNode
}
const AdminLayout = async ({ children }: AdminLayoutProps) => {
    const user = await getUser()
    if (user?.role !== "ADMIN") return redirect("/dashboard")
    return (
        <>
            <div className="my-2 mx-5">
                <NormalNavbar user={user} />
            </div>
            <div className="mx-5">
                {children}
            </div>
            <BottomNav/>
        </>
    )
}

export default AdminLayout