"use client"
import { changeName } from "@/actions/protected/settings/name"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { ExtendedUser } from "@/next-auth"
import { nameSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { BarLoader } from "react-spinners"
import * as z from "zod"

interface ChangeNameButtonProps {
    user: ExtendedUser
}

export const ChangeNameButton = ({ user }: ChangeNameButtonProps) => {
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<z.infer<typeof nameSchema>>({
        resolver: zodResolver(nameSchema),
        defaultValues: {
            name: user.name || "",
        }
    })

    const handleSubmit = (values: z.infer<typeof nameSchema>) => {
        startTransition(async () => {
            const data = await changeName(values, user.id!)
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
                    <DialogTitle>Change Name</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-2 mx-5" onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending} type="text" placeholder="Enter your name" />
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