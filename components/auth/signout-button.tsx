"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ExitIcon } from "@radix-ui/react-icons"

export const SignOutButton = () => {
  return (
    <Button
    className="w-full"
    onClick={()=>signOut()}
    >Signout&nbsp;<ExitIcon width={20} height={20}/></Button>
  )
}