"use client"

import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { bodyCompositionGoalSchema } from "@/schemas"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { BarLoader } from "react-spinners"
import { BodyCompositionGoal, PersonalInfo } from "@prisma/client"
import { changeBodyComp } from "@/actions/protected/settings/body-composition-goal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ChangeBodyCompButtonProps {
    personalInfo: PersonalInfo
}
export const ChangeBodyCompButton = ({ personalInfo }: ChangeBodyCompButtonProps) => {
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof bodyCompositionGoalSchema>>({
        resolver: zodResolver(bodyCompositionGoalSchema),
        defaultValues: {
            bodyCompositionGoal: personalInfo.bodyCompositionGoal,
        }
    })

    const handleSubmit = (values: z.infer<typeof bodyCompositionGoalSchema>) => {
        startTransition(async () => {
            const data = await changeBodyComp(values, personalInfo)
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
                <Button aria-label="Update fitness goal" variant="outline"><Pencil1Icon height={20} width={20} /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Fitness Goal</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-2 mx-5" onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField
                            control={form.control}
                            name="bodyCompositionGoal"
                            render={({ field }) => (
                                <FormItem>
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