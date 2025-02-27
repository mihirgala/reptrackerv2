"use client"

import { DumbbellIcon, UtensilsCrossed } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { DashboardIcon } from "@radix-ui/react-icons"
import { MdChatBubble } from "react-icons/md"

const navItems = [
    { name: "Dashboard", icon: DashboardIcon, href: "/dashboard" },
    { name: "Workouts", icon: DumbbellIcon, href: "/workout" },
    { name: "Nutrition", icon: UtensilsCrossed, href: "/nutrition" },
    { name: "Chatbot", icon: MdChatBubble, href: "/chat" },
]

const isActive = (pathname: string, itemHref: string) => {
    if (itemHref === "/") return pathname === "/"
    return pathname.startsWith(itemHref)
  }

export function BottomNav() {
    const pathname = usePathname()
    if (pathname.startsWith("/chat")) {
        return <></>
    }

    return (
        <div className="mt-[4rem]">
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
                <div className="grid h-16 grid-cols-4 max-w-md mx-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center",
                                isActive(pathname,item.href) ? "text-primary" : "text-muted-foreground",
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="text-xs">{item.name}</span>
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    )
}

