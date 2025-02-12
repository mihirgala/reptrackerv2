import { DBMealSheet } from "@/components/protected/app/nutrition/db-meal-sheet"
import { GenerateMealPlan } from "@/components/protected/app/nutrition/generate-mealplan"
import { MealSheet } from "@/components/protected/app/nutrition/meal-sheet"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getMealPlanByPersonalInfoId, getPersonalInfoByUserId } from "@/data"
import { getUser } from "@/lib/auth"
import { calculateMacros, calculateTDEE, cn } from "@/lib/utils"
import { Info } from "lucide-react"
import { Montserrat } from "next/font/google"
import Link from "next/link"

const fontMontserrat = Montserrat({
    subsets: ["latin"],
    weight: ["700"]
})

const NutritionPage = async () => {
    const user = await getUser()
    const personalInfo = await getPersonalInfoByUserId(user?.id!)
    const tdee = calculateTDEE(personalInfo!, user?.weight!)
    const mealPlan = await getMealPlanByPersonalInfoId(personalInfo?.id!)
    const macros = calculateMacros(tdee, personalInfo?.bodyCompositionGoal!)
    const hasmealPlan = !!mealPlan?.length
    return (
        <div>
            <main className="min-h-[calc(100vh-4rem)] flex flex-col gap-2">
                <h1 className={cn("text-3xl font-bold drop-shadow-lg tracking-tight text-center mb-10", fontMontserrat.className)}>Nutrition</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                    <Card className="md:col-span-2 w-full">
                        <CardHeader>
                            <div className="flex justify-between">
                                <CardTitle>Meal Plans</CardTitle>
                                <HoverCard>
                                    <HoverCardTrigger asChild>
                                        <Button className="m-0 p-0 hover:bg-transparent" variant={"ghost"}><Info size={20} /></Button>
                                    </HoverCardTrigger>
                                    <HoverCardContent align="end" sideOffset={20}>
                                        <span className="text-muted-foreground text-sm font-semibold">Get personalized meal plans tailored to your specific macronutrient goals and dietary preferences. Whether you're aiming to build muscle, lose weight, or maintain your current fitness level, our AI-powered system crafts meal plans that align with your nutritional needs. Simply input your desired macros and preferences, and let the AI do the rest, ensuring you get the right balance of proteins, fats, and carbohydrates for optimal health and fitness results.</span>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                            <CardDescription>AI generated meal plans according to the given macros & your preferences </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {user?.plan === "FREE" && (
                                <div className="flex flex-col h-full gap-10 justify-center items-center">
                                    <span className="text-xl">Subscibe to premium to get meal plans</span>
                                    <Button><Link href={"/subscribe"}>Subscribe</Link></Button>
                                </div>
                            )}
                            {user?.plan === "PREMIUM" && (
                                <Tabs defaultValue={hasmealPlan ? "meals" : "generate"} className="">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger disabled={!hasmealPlan} value="meals">Meals</TabsTrigger>
                                        <TabsTrigger value="generate">Generate</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="meals">
                                        <Carousel>
                                            <CarouselContent>
                                                {mealPlan?.map((meal, index) => (
                                                    <CarouselItem key={index}>
                                                        <DBMealSheet meal={meal} />
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>
                                                <p className="text-center font-semibold text-sm text-secondary-foreground">Slide to view</p>
                                        </Carousel>
                                    </TabsContent>
                                    <TabsContent value="generate">
                                        <GenerateMealPlan personalInfoId={personalInfo?.id!} macros={macros} />
                                    </TabsContent>
                                </Tabs>
                            )}
                        </CardContent>
                    </Card>
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <div className="flex justify-between">
                                <CardTitle>Macro nutrients</CardTitle>
                                <HoverCard>
                                    <HoverCardTrigger asChild>
                                        <Button className="m-0 p-0 hover:bg-transparent" variant={"ghost"}><Info size={20} /></Button>
                                    </HoverCardTrigger>
                                    <HoverCardContent align="end" sideOffset={20}>
                                        <span className="text-muted-foreground text-sm font-semibold">The calculateMacros function calculates your macronutrient needs based on your Total Daily Energy Expenditure TDEE and body composition goal such as losing, gaining, or maintaining weight. It determines the appropriate distribution of protein, carbohydrates, and fat in your diet by adjusting your TDEE according to your goal. While this tool provides helpful guidance for daily nutrient intake, individual needs may vary based on factors like metabolism and activity level. For more personalized advice, consult our AI assistant.</span>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                            <CardDescription>This is a general guide for macro nutrients based on major studies but it may vary from person to person</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Values</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Protein</TableCell>
                                        <TableCell>{macros.protein}g</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Carbohydrates</TableCell>
                                        <TableCell>{macros.carbohydrates}g</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Fats</TableCell>
                                        <TableCell>{macros.fat}g</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Calories</TableCell>
                                        <TableCell>{macros.totalCalories}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </main >
        </div >
    )
}

export default NutritionPage