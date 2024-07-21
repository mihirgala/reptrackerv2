import { SiteLogo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { ExtendedUser } from "@/next-auth"
import Link from "next/link"
import { SubscribeButton } from "./subscribe-button"

interface SubscribeComponentProps {
  user: ExtendedUser
  hasSubscription?: boolean
}
export const SubscribeComponent = ({ user, hasSubscription }: SubscribeComponentProps) => {
  return (
    <Card>
      <CardHeader>
        <SiteLogo />
        <h1 className="text-lg md:text-xl font-semibold">You&apos;re about to subscribe to <span className="text-primary font-bold">PREMIUM</span> plan</h1>
        <h2 className="font-bold">Account Email : {user.email}</h2>
        <div className="flex w-full">
          {hasSubscription && (<Button variant={"outline"} asChild><Link className="ml-auto" href="/settings">Manage in settings</Link></Button>)}
          {!hasSubscription && (<SubscribeButton user={user}/>)}
        </div>
      </CardHeader>
    </Card>
  )
}