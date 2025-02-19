import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { splits } from "../splits"
import { redirect } from "next/navigation"
import { PreviewWorkoutSheet } from "@/components/protected/app/workout/preview-workout-sheet"
import { cn } from "@/lib/utils"
import { Montserrat } from "next/font/google"

interface SplitPreviewPageProps {
  params: Promise<{ split: string }>
}

const fontMontserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"]
})

export async function generateMetadata({ params }:SplitPreviewPageProps) {
  const splitSlug = (await params).split
  const split = splits.find((split) => split.slug === splitSlug)
  return {
    title: `${split?.name}`,
  }
}

const SplitPreviewPage = async ({ params }: SplitPreviewPageProps) => {
  const splitSlug = (await params).split
  const split = splits.find((split) => split.slug === splitSlug)
  const workouts = split?.workouts
  if (!split) {
    redirect("/workout/")
  }
  return (
    <div>
      <main className="min-h-[calc(100vh-4rem)] flex flex-col my-auto gap-2">
        <h1 className={cn("text-3xl font-bold drop-shadow-lg tracking-tight text-center", fontMontserrat.className)}>Preview of {split.name}</h1>
        <Button variant={"link"} asChild><Link href={"/workout"}>Go back to workout</Link></Button>
        <Carousel className="w-full md:w-[80%] mx-auto">
          <CarouselContent>
            {workouts?.map((workout, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <PreviewWorkoutSheet workout={workout} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </main>
    </div>
  )
}
export default SplitPreviewPage