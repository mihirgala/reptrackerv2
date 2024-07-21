import { SubscribeComponent } from "@/components/protected/payments/subscribe"
import { getSubscriptionByUserId } from "@/data"
import { getUser } from "@/lib/auth"

const SubscribePagee = async () => {
  const user = await getUser()
  const subscription = await getSubscriptionByUserId(user?.id!)
  const hasSubscription = subscription && (subscription?.status !== "created") || user?.plan === "PREMIUM"
  return (
    <div>
      <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
        <SubscribeComponent user={user!} hasSubscription={hasSubscription} />
      </main>
    </div>
  )
}
export default SubscribePagee