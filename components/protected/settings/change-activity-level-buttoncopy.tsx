"use client"

import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { activityLevelSchema } from "@/schemas"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { BarLoader } from "react-spinners"
import { ActivityLevel, PersonalInfo } from "@prisma/client"
import { changeBodyComp } from "@/actions/protected/settings/body-composition-goal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { changeActivityLevel } from "@/actions/protected/settings/activity-level"

interface ChangeActivityLevelProps {
    personalInfo: PersonalInfo
}

export const ChangeActivityLevel = ({ personalInfo }: ChangeActivityLevelProps) => {
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof activityLevelSchema>>({
        resolver: zodResolver(activityLevelSchema),
        defaultValues: {
            activityLevel: personalInfo.activityLevel,
        }
    })

    const handleSubmit = (values: z.infer<typeof activityLevelSchema>) => {
        startTransition(async () => {
            const data = await changeActivityLevel(values, personalInfo)
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error,
                })
            }
            if (data.success) {
                toast({
                    title: "Success",
                    description: data.message
                })
                router.refresh()
            }
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><Pencil1Icon height={20} width={20} /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Activity Level</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-2 mx-5" onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField
                            control={form.control}
                            name="activityLevel"
                            render={({ field }) => (
                                <FormItem>
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
                        <DialogFooter>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? (<BarLoader className="dark:invert" />) : "Save"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}