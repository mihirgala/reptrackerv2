import { Button } from "@/components/ui/button"
import { getUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { Montserrat } from "next/font/google"
import Link from "next/link"
import { redirect } from "next/navigation"

const fontMontserrat = Montserrat({
    subsets: ["latin"],
    weight: ["700"]
})


const ChatBotPage = async () => {
    const user = await getUser()
    if (user?.plan === "FREE") {
        return (
            <div>
                <main className="min-h-[calc(100vh-4rem)] justify-center items-center flex flex-col gap-2">
                    <h1 className={cn("text-3xl font-bold drop-shadow-lg tracking-tight text-center", fontMontserrat.className)}>ChatBot</h1>
                    <div className="flex flex-col gap-2 h-full w-full items-center self-center">
                        <p className="text-sm text-muted-foreground font-semibold text-center">Subscribe to premium to access ChatBot</p>
                        <Button><Link href={"/subscribe"}>Subscribe</Link></Button>
                    </div>
                </main>
            </div>
        )
    }
    if (user?.plan === "PREMIUM") {
        const newChat = await db.chat.create({
            data: {
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        })
        revalidatePath(`/chat`)
        redirect(`/chat/${newChat.id}`)
    }
}

export default ChatBotPage