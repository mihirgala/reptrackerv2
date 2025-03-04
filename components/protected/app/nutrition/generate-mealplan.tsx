"use client"

import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useToast } from "@/components/ui/use-toast"
import { useState, useTransition } from "react"
import { SiGooglegemini } from "react-icons/si"
import { BarLoader } from "react-spinners"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { generateMealPlanSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"
import { generateMealPlan } from "@/actions/protected/app/ai/mealplan/generate"
import { MealSheet } from "./meal-sheet"
import { saveMealPlan } from "@/actions/protected/app/ai/mealplan/save"

interface GenerateWorkoutComponentProps {
    personalInfoId: string
    macros:{
        totalCalories: string;
        protein: string;
        carbohydrates: string;
        fat: string;
    }
}



export const GenerateMealPlan = ({ personalInfoId,macros }: GenerateWorkoutComponentProps) => {
    const [mealPlan, setMealPlan] = useState<Meal[]>([])
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof generateMealPlanSchema>>({
        resolver: zodResolver(generateMealPlanSchema),
    })
    const router = useRouter()

    const generate = (values: z.infer<typeof generateMealPlanSchema>) => {
        startTransition(async () => {
            const data = await generateMealPlan(values,macros)
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error
                })
            }
            if (data.success) {
                const mealPlan = JSON.parse(data.data)
                if (mealPlan.items) {
                    setMealPlan(mealPlan.items)
                }
                else {
                    setMealPlan(mealPlan)
                }
            }
        })
    }

    const handleSave = () => {
        startTransition(async () => {
            const data = await saveMealPlan(mealPlan, personalInfoId)
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error
                })
            }
            if (data.success) {
                router.refresh()
            }
        })
    }

    return (
        <div className="flex justify-center items-center w-full">
            <Carousel className="w-full md:w-[70%]">
                <CarouselContent>
                    {mealPlan.length === 0 && (
                        <CarouselItem className="flex justify-center">
                            <Form {...form}>
                                <form className="w-full flex flex-col justify-center space-y-2" onSubmit={form.handleSubmit(generate)}>
                                    <FormField
                                        control={form.control}
                                        name={"numberOfMeals"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Number of Meals
                                                </FormLabel>
                                                <Select onValueChange={field.onChange}>
                                                    <FormControl>
                                                        <SelectTrigger className="md:w-full" disabled={isPending}>
                                                            <SelectValue placeholder="Meals per day" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="1">1</SelectItem>
                                                        <SelectItem value="2">2</SelectItem>
                                                        <SelectItem value="3">3</SelectItem>
                                                        <SelectItem value="4">4</SelectItem>
                                                        <SelectItem value="5">5</SelectItem>
                                                        <SelectItem value="6">6</SelectItem>
                                                        <SelectItem value="7">7</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    <FormField
                                        control={form.control}
                                        name={"preference"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Preference
                                                </FormLabel>
                                                <Select onValueChange={field.onChange}>
                                                    <FormControl>
                                                        <SelectTrigger className="md:w-full" disabled={isPending}>
                                                            <SelectValue placeholder="Vegetarian without eggs" defaultValue={"VEGETARIAN_WITHOUT_EGGS"}/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="VEGAN">Vegan</SelectItem>
                                                        <SelectItem value="VEGETARIAN_WITHOUT_EGGS">Vegetarian without eggs</SelectItem>
                                                        <SelectItem value="VEGETARIAN">Vegeterian</SelectItem>
                                                        <SelectItem value="NON_VEGETARIAN">Non vegeterian</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    <FormField
                                        control={form.control}
                                        name={"note"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Note (optional)
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Any instructions or special note mention it here"
                                                        className="resize-none w-[99%] mx-auto"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    <Button className="w-full" type="submit" disabled={isPending}>
                                        {!isPending ? (
                                            <>
                                                Generate Mealplan&nbsp;
                                                <SiGooglegemini size={20} />
                                            </>
                                        ) : (<BarLoader className="dark:invert" />)}
                                    </Button>
                                </form>
                            </Form>

                        </CarouselItem>
                    )}
                    {mealPlan.length > 0 && mealPlan.map((meal, index) => (
                        <CarouselItem key={index}>
                            <MealSheet meal={meal} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden lg:flex" />
                <CarouselNext className="hidden lg:flex" />
                {mealPlan.length > 0 && (
                    <div className="flex my-5 w-full justify-end">
                        <AlertDialog>
                            <AlertDialogTrigger asChild><Button>Save</Button></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your previous meal plan.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleSave()}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                )}
            </Carousel>

        </div>
    )
}