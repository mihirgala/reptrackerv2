"use client"

import { getRazorPayPublicKey } from "@/actions/protected/payments/pub_key"
import { buySubscribe } from "@/actions/protected/payments/subscribe"
import { verifyPayment } from "@/actions/protected/payments/verify"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { ExtendedUser } from "@/next-auth"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { BarLoader } from "react-spinners"

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface SubscribeButtonProps {
    user: ExtendedUser
}
export const SubscribeButton = ({ user }: SubscribeButtonProps) => {
    const [isPending, startTransition] = useTransition()
    const [isOn, setIsOn] = useState<boolean>(false)
    const router = useRouter()
    const { toast } = useToast()
    const handleSubmit = async () => {
        startTransition(async () => {
            setIsOn(true)
            const data = await buySubscribe()
            if (data.error) {
                toast({
                    title: data.error
                })
            }
            if (data.success) {
                const options = {
                    key: await getRazorPayPublicKey(),
                    subscription_id: data.id,
                    name: "Reptracker",
                    description: "Monthly Premium Plan",
                    image: "/your_logo.jpg",
                    handler: async function (response: RazorPayHandlerResponse) {
                        const data = await verifyPayment(response)
                        if (data.error) {
                            router.push(`/subscribe/failure?type=${data.error}`)
                        }
                        if (data.success) {
                            router.push(`/subscribe/success?reference_id=${data.referenceId}`)
                        }
                    },
                    modal: {
                        ondismiss: function () {
                            toast({
                                title: "User cancelled the payment process"
                            })
                            setTimeout(() => {
                                router.push("/settings")
                            }, 5000)
                        }
                    },
                    prefill: {
                        name: user.name,
                        email: user.email,
                    },
                    theme: {
                        color: "#E1540C"
                    }
                }

                const paymentObject = new window.Razorpay(options);
                paymentObject.on('payment.failed', function (response: any) {
                    alert(response.error.description);
                })
                paymentObject.open()
            }
        })
    }
    return (
        <Button
            onClick={async () => {
                handleSubmit()
            }}
            disabled={isPending || isOn}
            className="ml-auto">
            {isPending || isOn ? (<BarLoader className="dark:invert" />) : "Subscribe"}
        </Button>
    )
}