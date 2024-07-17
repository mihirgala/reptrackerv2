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
import { FaUser } from "react-icons/fa6"
import Link from "next/link"
import { SignOutButton } from "@/components/auth/signout-button"
import { MdOutlineSettings } from "react-icons/md"
import { TbHelp } from "react-icons/tb"

interface UserButtonProps {
    user: ExtendedUser
}

export const UserButton = ({ user }: UserButtonProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage height={25} width={25} src={user?.image || ""} />
                    <AvatarFallback><FaUser size={25} /></AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={"/settings"} className="flex gap-x-2" ><MdOutlineSettings size={25}/>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={"/faq"} className="flex gap-x-2" ><TbHelp size={25}/>Help</Link>
                    </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><SignOutButton/></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >

    )
}