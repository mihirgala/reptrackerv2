"use client"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { loginSchema } from "@/schemas"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { BarLoader } from "react-spinners"
import { useToast } from "@/components/ui/use-toast"
import { login } from "@/actions/auth/login"

export const LoginForm = () => {

    const [showCode, setShowCode] = useState<boolean>(false)
    const [isPending, startTranstion] = useTransition()

    const { toast } = useToast()
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            code: ""
        }
    })
    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        startTranstion(async () => {
            const res = await login(values)
            if (res?.error) {
                toast({
                    title: res?.message
                })
            }
            if (res?.success) {
                if (res?.codeSent) {
                    setShowCode(true)
                }
                toast({
                    title: res?.message
                })
            }
        })
    }

    return (
        <CardWrapper label={"A fitness tracking appplication with AI features"} showOAuth showTNC>
            <Form {...form}>
                <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
                    {!showCode && (
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel hidden>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={isPending || showCode} type="email" placeholder="Enter your personal email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    {showCode && (
                        <div className="flex justify-center">
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <InputOTP maxLength={6} {...field}>
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={0} />
                                                    <InputOTPSlot index={1} />
                                                    <InputOTPSlot index={2} />
                                                </InputOTPGroup>
                                                <InputOTPSeparator />
                                                <InputOTPGroup>
                                                    <InputOTPSlot index={3} />
                                                    <InputOTPSlot index={4} />
                                                    <InputOTPSlot index={5} />
                                                </InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>
                                        <FormLabel>Enter the code sent to your email</FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}
                    <Button className="w-full" type="submit" disabled={isPending}>
                        {!isPending && (!showCode ? "Continue with email" : "Login")}
                        {isPending && (<BarLoader className="dark:invert" />)}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}