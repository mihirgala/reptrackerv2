import { ExtendedUser } from "@/next-auth"
import { SiteLogo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { UserButton } from "../user-button"

interface NormalNavbarProps {
    user?: ExtendedUser
}

export const NormalNavbar = ({ user }: NormalNavbarProps) => {
    return (
        <header>
            <div className="flex items-center justify-between">
                <SiteLogo asLink/>
                <div className="flex items-center gap-5">
                    {!user && (<Button asChild><Link href={"/auth/login"}>Login</Link></Button>)}
                    {user && (<UserButton user={user}/>)}
                </div>
            </div>
        </header>
    )
}