import { ExtendedUser } from "@/next-auth"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import Link from "next/link"
import { SignOutButton } from "@/components/auth/signout-button"
import { MdAdminPanelSettings, MdChatBubble, MdOutlineSettings } from "react-icons/md"
import { TbHelp } from "react-icons/tb"
import { DumbbellIcon, User2, UtensilsCrossed } from "lucide-react"
import { Button } from "./ui/button"
import { DashboardIcon } from "@radix-ui/react-icons"

interface UserButtonProps {
    user: ExtendedUser
}

export const UserButton = ({ user }: UserButtonProps) => {
    if (!user) {
        return <Button asChild><Link href={"/auth/login"}>Login</Link></Button>
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="select-none">
                    <AvatarImage height={25} width={25} src={user?.image || ""} />
                    <AvatarFallback><User2 size={25} /></AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.role === "ADMIN" && (
                    <DropdownMenuItem asChild>
                        <Link href={"/admin"} className="flex gap-x-2" ><MdAdminPanelSettings size={25} />Admin Panel</Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                    <Link href={"/settings"} className="flex gap-x-2" ><MdOutlineSettings size={25} />Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><SignOutButton /></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >

    )
}