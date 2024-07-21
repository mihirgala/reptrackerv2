import { Button } from "@/components/ui/button"
import { getUser } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { Montserrat } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import hero from "@/assets/hero.svg"
import { Features } from "@/components/normal/features"

const fontMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"]
})

const HomePage = async () => {
  const user = await getUser()
  return (
    <div>
      <main className="flex flex-col">
        <div className="relative min-h-[calc(100vh-4rem)] bg-background/60 dark:bg-background/80 flex flex-col md:flex-row justify-center gap-10 items-center">
          <div className="flex flex-col text-center gap-y-5 drop-shadow-md">
            <h1 className={cn("text-5xl font-bold drop-shadow-lg tracking-tight", fontMontserrat.className)}>Sculpting Success with Every Set</h1>
            <p className="text-foreground text-lg my-0 drop-shadow-lg">Crafted with OnlyGains in Mind Your Ultimate Gym Companion for Progress Tracking</p>
            <div className="flex gap-x-5 justify-center">
              <Button size={"lg"} asChild><Link href={!user && "/auth/login" || "/dashboard"}>Get Started</Link></Button>
              <Button size={"lg"} variant={"secondary"} asChild><Link href={"#features"}>Learn More</Link></Button>
            </div>
          </div>
          <div className="block absolute top-50 z-[-1]">
            <Image alt="heroimg" className="object-cover" width={800} src={hero} />
          </div>
        </div>
        <div id="features" className="min-h-screen flex flex-col justify-center items-center">
          <div className="flex flex-col gap-5 mb-10">
          <h2 className={cn("text-5xl font-bold drop-shadow-lg tracking-tight text-center", fontMontserrat.className)}>Features</h2>
          <p className="text-foreground text-lg my-0 drop-shadow-lg text-center">Discover the tools to help you achieve your fitness goals.</p>
          </div>
          <Features />
        </div>
      </main>
    </div>
  )
}
export default HomePage