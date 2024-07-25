import { SettingsAccount } from "@/components/protected/settings/account"
import { SettingsBilling } from "@/components/protected/settings/billing"
import { SettingsPersonal } from "@/components/protected/settings/personal-info"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPersonalInfoByUserId, getSubscriptionByUserId } from "@/data"
import { getUser } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { CreditCard, User2, WeightIcon } from "lucide-react"
import { Montserrat } from "next/font/google"
import { redirect } from "next/navigation"

const fontMontserrat = Montserrat({
    subsets: ["latin"],
    weight: ["700"]
  })

const SettingsPage = async () => {
    const user = await getUser()
    if(!user) return null
    const subscription = await getSubscriptionByUserId(user.id!)
    const personalInfo = await getPersonalInfoByUserId(user.id!)
    if(!personalInfo){
        redirect("/onboarding")
    }
    return (
        <div className="pt-10">
            <h1 className={cn("text-3xl font-bold drop-shadow-lg tracking-tight text-center",fontMontserrat.className)}>Settings</h1>
            <main className="flex justify-center ">
                <Tabs defaultValue={"account"} className="mt-10 w-full md:w-[512px]">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="account"><User2 size={20} /></TabsTrigger>
                        <TabsTrigger value="billing"><CreditCard size={20} /></TabsTrigger>
                        <TabsTrigger value="personalInfo"><WeightIcon size={20} /></TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <SettingsAccount user={user} />
                    </TabsContent>
                    <TabsContent value="billing">
                        <SettingsBilling user={user} subscription={subscription} />
                    </TabsContent>
                    <TabsContent value="personalInfo">
                        <SettingsPersonal user={user} personalInfo={personalInfo} />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}
export default SettingsPage