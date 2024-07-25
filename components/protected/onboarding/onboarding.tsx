"use client"
import { SiteLogo } from "@/components/logo"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ExtendedUser } from "@/next-auth"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"
import { useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { onboardingSchema } from "@/schemas"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ActivityLevel, BodyCompositionGoal, Sex } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { BarLoader } from "react-spinners"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { onboarding } from "@/actions/protected/onboarding/onboarding"

interface OnboardingComponentProps {
    user: ExtendedUser
}
export const OnboardingComponent = ({ user }: OnboardingComponentProps) => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const {toast} = useToast()
    const form = useForm<z.infer<typeof onboardingSchema>>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            name: user.name || "",
            sex: undefined,
            day: "",
            month: "",
            year: "",
            weight: "",
            height: "",
            bodyCompositionGoal: undefined,
            activityLevel: undefined,
        }
    })

    const handleSubmit = (values: z.infer<typeof onboardingSchema>) => {
        startTransition(async () => {
            const data = await onboarding(values,user.id!)
            if(data.error){
                toast({
                    title: "Error",
                    description: data.error,
                })
            }
            if(data.success){
                router.push("/settings")
            }
        })
    }

    useEffect(() => {
        if (!api) {
            return
        }
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])
    return (
        <div>
            <h2 className="text-lg mb-5 text-muted-foreground font-bold text-center">Onboarding</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <Carousel onKeyDownCapture={() => { }} setApi={setApi} className="w-full max-w-xs">
                        <CarouselContent>
                            <CarouselItem>
                                <Card>
                                    <CardContent className="flex flex-col gap-5 aspect-square items-center justify-center p-6">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} disabled={isPending} type="text" placeholder="Enter your name" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="sex"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel>Sex</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a sex" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value={Sex.MALE}>MALE</SelectItem>
                                                            <SelectItem value={Sex.FEMALE}>FEMALE</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div>
                                            <p className="font-bold text-muted-foreground">Date of birth</p>
                                            <div className="flex gap-5">
                                                <FormField
                                                    control={form.control}
                                                    name="day"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>DD</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} disabled={isPending} type="text" placeholder="DD" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="month"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>MM</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} disabled={isPending} type="text" placeholder="MM" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="year"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>YYYY</FormLabel>
                                                            <FormControl>
                                                                <Input {...field} disabled={isPending} type="text" placeholder="YYYY" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                            <CarouselItem>
                                <Card>
                                    <CardContent className="flex flex-col gap-5 aspect-square items-center justify-center p-6">
                                        <FormField
                                            control={form.control}
                                            name="height"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel>Height (CM)</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} disabled={isPending} type="text" placeholder="In Centimeters" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="weight"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel>Weight (KG)</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} disabled={isPending} type="text" placeholder="In Kilograms" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                            <CarouselItem>
                                <Card>
                                    <CardContent className="flex flex-col gap-5 aspect-square items-center justify-center p-6">
                                        <FormField
                                            control={form.control}
                                            name="bodyCompositionGoal"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel>Fitness Goal</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Pick a goal" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value={BodyCompositionGoal.MAINTAIN}>MAINTENANCE</SelectItem>
                                                            <SelectItem value={BodyCompositionGoal.LOSE}>LOSE FAT</SelectItem>
                                                            <SelectItem value={BodyCompositionGoal.GAIN}>GAIN MUSCLE</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="activityLevel"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel>What&apos;s your activity level?</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Pick your fitness level" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value={ActivityLevel.SEDENTARY}>SEDENTARY</SelectItem>
                                                            <SelectItem value={ActivityLevel.LIGHT}>LIGHTLY ACTIVE</SelectItem>
                                                            <SelectItem value={ActivityLevel.MODERATE}>MODERATELY ACTIVE</SelectItem>
                                                            <SelectItem value={ActivityLevel.ACTIVE}>ACTIVE</SelectItem>
                                                            <SelectItem value={ActivityLevel.VERY_ACTIVE}>VERY ACTIVE</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" disabled={isPending || !form.formState.isValid} className="w-full">
                                            {isPending ? (<BarLoader className="dark:invert"/>) : "Finish"}
                                        </Button>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        </CarouselContent>
                        <div className="hidden md:block">
                            <CarouselPrevious />
                            <CarouselNext />
                        </div>
                    </Carousel>
                </form>
            </Form>
            <div className="py-2 text-center text-sm text-muted-foreground">
                Part {current} of {count}
                <p className="md:hidden text-sm font-semibold text-muted-foreground">Slide left or right to scroll</p>
            </div>
        </div>
    )
}