"use client"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { FcGoogle } from "react-icons/fc"
import { BarLoader } from "react-spinners"
import {signIn} from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export const OAuthButtons = () => {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      onClick={() =>
        startTransition(() => {
          signIn("google",{
            redirectTo:DEFAULT_LOGIN_REDIRECT
          })
        })
      }
      disabled={isPending}
      variant="outline" className="w-full">{!isPending ? <>Continue with &nbsp;<FcGoogle size={20} /></>:
      (<BarLoader className="dark:invert" />)
      }</Button>
  )
}