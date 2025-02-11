"use client"

import { generateWorkouts } from "@/actions/protected/app/ai/workout/generate"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { useState, useTransition } from "react"
import { SiGooglegemini } from "react-icons/si"
import { BarLoader } from "react-spinners"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { generateWorkoutSchema } from "@/schemas"
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

import { importGeneratedWorkouts } from "@/actions/protected/app/ai/workout/import"
import { useRouter } from "next/navigation"

interface GenerateWorkoutComponentProps {
    personalInfoId: string
}



export const GenerateWorkoutComponent = ({ personalInfoId }: GenerateWorkoutComponentProps) => {
    const [workouts, setWorkouts] = useState<Workout[]>([])
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof generateWorkoutSchema>>({
        resolver: zodResolver(generateWorkoutSchema),
    })
    const router = useRouter()

    const generate = (values: z.infer<typeof generateWorkoutSchema>) => {
        startTransition(async () => {
            const data = await generateWorkouts(values)
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error
                })
            }
            if (data.success) {
                const workouts = JSON.parse(data.data)
                if(workouts.items){
                    setWorkouts(workouts.items)
                }
                else{
                    setWorkouts(workouts)
                }
            }
        })
    }

    const handleImport = () => {
        startTransition(async () => {
            const data = await importGeneratedWorkouts(workouts, personalInfoId)
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error
                })
            }
            if(data.success){
                router.push("/workout")
            }
        })
    }

    return (
        <div className="flex justify-center items-center">
            <Carousel className="w-full md:w-[70%]">
                <CarouselContent>
                    {workouts.length === 0 && (
                        <CarouselItem className="flex justify-center">
                            <Form {...form}>
                                <form className="w-full flex flex-col justify-center space-y-2" onSubmit={form.handleSubmit(generate)}>
                                    <FormField
                                        control={form.control}
                                        name={"numberOfDays"}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Number of days
                                                </FormLabel>
                                                <Select onValueChange={field.onChange}>
                                                    <FormControl>
                                                        <SelectTrigger className="md:w-full" disabled={isPending}>
                                                            <SelectValue placeholder="Days" />
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
                                                Generate Workouts&nbsp;
                                                <SiGooglegemini size={20} />
                                            </>
                                        ) : (<BarLoader className="dark:invert" />)}
                                    </Button>
                                </form>
                            </Form>

                        </CarouselItem>
                    )}
                    {workouts.length > 0 && workouts.map((workout, index) => (
                        <CarouselItem key={index}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{workout.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Exercise</TableHead>
                                                <TableHead>Intensity</TableHead>
                                                <TableHead>Metric</TableHead>
                                                <TableHead>Sets</TableHead>
                                                <TableHead>Reps</TableHead>

                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {workout.exercises.map((exercise, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{exercise.name}</TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell>{exercise.sets}</TableCell>
                                                    <TableCell>{exercise.reps}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden lg:flex" />
                <CarouselNext className="hidden lg:flex" />
                {workouts.length > 0 && (
                    <div className="flex my-5 w-full justify-end">
                        <AlertDialog>
                            <AlertDialogTrigger asChild><Button>Import</Button></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your previous workouts.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleImport()}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                )}
            </Carousel>

        </div>
    )
}