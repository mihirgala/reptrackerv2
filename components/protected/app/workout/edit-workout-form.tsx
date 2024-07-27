"use client"

import { useEffect, useTransition } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { workoutSchema } from "@/schemas"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Exercise, intensityMetric, Workout } from "@prisma/client"
import { createWorkout } from "@/actions/protected/app/create-workout"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { BarLoader } from "react-spinners"
import { editWorkout } from "@/actions/protected/app/edit-workout"


interface EditWorkoutFormProps {
    workout: Workout
    exercises: Exercise[]
}
export const EditWorkoutForm = ({ workout, exercises }: EditWorkoutFormProps) => {
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<z.infer<typeof workoutSchema>>({
        resolver: zodResolver(workoutSchema),
        defaultValues: {
            name: workout.name || "",
        }
    })
    const control = form.control
    const { fields, append, remove } = useFieldArray({
        control,
        name: "exercises", // unique name for your Field Array
    })

    const handleSubmit = (values: z.infer<typeof workoutSchema>) => {
        startTransition(async () => {
            const data = await editWorkout(values, workout)
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error,
                })
            }
            if (data.success) {
                router.push("/workout")
            }
        })
    }

    useEffect(() => {
        exercises.map(exercise => {
            append({
                name: exercise.name,
                intensity: exercise.intensity || "",
                intensityMetric: exercise.metric || undefined,
                reps: exercise.reps,
                sets: exercise.sets,
            })
        })
    }, [])

    return (
        <Card>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <CardHeader>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Workout Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                            placeholder="Monday"
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        {fields.map((fielD, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <h2 className="font-bold">Exercise {index + 1}</h2>
                                </CardHeader>
                                <CardContent>
                                    <div key={fielD.id} className="flex w-full flex-col md:flex-row gap-2 md:gap-5">
                                        <FormField
                                            control={form.control}
                                            name={`exercises.${index}.name`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Excercise Name
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field}
                                                            placeholder="Bicep Curl"
                                                            disabled={isPending}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        <FormField
                                            control={form.control}
                                            name={`exercises.${index}.intensity`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Intensity
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field}
                                                            inputMode="numeric"
                                                            placeholder="Weight or Time"
                                                            disabled={isPending}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        <FormField
                                            control={form.control}
                                            name={`exercises.${index}.intensityMetric`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Metric
                                                    </FormLabel>
                                                    <Select onValueChange={field.onChange}>
                                                        <FormControl>
                                                            <SelectTrigger className="md:w-[120px]" disabled={isPending}>
                                                                <SelectValue defaultValue={undefined} placeholder="Pick any" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value={intensityMetric.KG}>KG</SelectItem>
                                                            <SelectItem value={intensityMetric.LBS}>LBS</SelectItem>
                                                            <SelectItem value={intensityMetric.SECONDS}>Secs</SelectItem>
                                                            <SelectItem value={intensityMetric.MINUTES}>Mins</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        <FormField
                                            control={form.control}
                                            name={`exercises.${index}.sets`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Sets
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field}
                                                            inputMode="numeric"
                                                            placeholder="Number of sets"
                                                            disabled={isPending}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        <FormField
                                            control={form.control}
                                            name={`exercises.${index}.reps`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Rep Range
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field}
                                                            placeholder="12-15"
                                                            disabled={isPending}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        <div className="self-end">
                                            {/* <h1 className="text-transparent">delete</h1> */}
                                            <Button variant={"destructive"} disabled={index < 1} onClick={() => remove(index)}>Delete</Button>
                                        </div>
                                        <Separator className="md:hidden" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </CardContent>
                    <CardFooter>
                        <div className="flex gap-2 ml-auto">
                            <Button variant={"secondary"}
                                type="button"
                                onClick={() => {
                                    append({
                                        name: "",
                                        intensity: "",
                                        reps: "",
                                        sets: "",
                                    })
                                }}
                                disabled={isPending} className="w-full">
                                Add Exercise
                            </Button>
                            <Button type="submit" disabled={isPending || !form.formState.isValid} className="w-full">
                                {isPending ? (<BarLoader className="dark:invert" />) : "Save"}
                            </Button>
                        </div>
                    </CardFooter>
                </form>
            </Form>
        </Card >
    )
}