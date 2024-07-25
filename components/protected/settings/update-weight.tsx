"use client"

import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { weightSchema } from "@/schemas"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { Input } from "@/components/ui/input"
import { BarLoader } from "react-spinners"
import { PersonalInfo } from "@prisma/client"
import { updateWeight } from "@/actions/protected/settings/weight"

interface UpdateWeightProps {
    personalInfo: PersonalInfo
}
export const UpdateWeight = ({ personalInfo }: UpdateWeightProps) => {
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof weightSchema>>({
        resolver: zodResolver(weightSchema),
        defaultValues: {
            weight: "",
        }
    })

    const handleSubmit = (values: z.infer<typeof weightSchema>) => {
        startTransition(async () => {
            const data = await updateWeight(values, personalInfo)
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error,
                })
            }
            if(data.success){
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
                    <DialogTitle>Update Weight</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-2 mx-5" onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField
                            control={form.control}
                            name="weight"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Weight</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} type="text" placeholder="In Kilograms" />
                                    </FormControl>
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