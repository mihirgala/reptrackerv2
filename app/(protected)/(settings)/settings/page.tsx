import { SettingsAccount } from "@/components/protected/settings/account"
import { SettingsBilling } from "@/components/protected/settings/billing"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getSubscriptionByUserId } from "@/data"
import { getUser } from "@/lib/auth"
import { CreditCard, User2 } from "lucide-react"

const SettingsPage = async () => {
    const user = await getUser()
    if(!user) return null
    const subscription = await getSubscriptionByUserId(user.id!)
    return (
        <div>
            <main className="flex justify-center pt-[100px]">
                <Tabs defaultValue="account">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="account"><User2 size={20} /></TabsTrigger>
                        <TabsTrigger value="billing"><CreditCard size={20} /></TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <SettingsAccount user={user} />
                    </TabsContent>
                    <TabsContent value="billing">
                        <SettingsBilling user={user} subscription={subscription} />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}
export default SettingsPage