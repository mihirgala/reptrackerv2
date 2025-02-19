import { SiteLogo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getPaymentByReferenceId } from "@/data"
import Link from "next/link"
import { redirect } from "next/navigation"
import {use} from "react"

interface SubscriptionSuceessPageProps {
    searchParams: Promise<{ [key: string]: string | string | string[] | undefined }>

}
const SubscriptionSuceessPage = async ({
    searchParams
}: SubscriptionSuceessPageProps) => {
    const referenceId = use(searchParams).reference_id
    if (!referenceId) {
        const Errtype = "Invalid Request"
        redirect(`/subscribe/failure?type=${Errtype}`)
    }
    const payment = await getPaymentByReferenceId(`${referenceId}`)
    if (!payment) {
        const ErrType = "Payment not found"
        redirect(`/subscribe/failure?type=${ErrType}`)
    }
    return (
        <div>
            <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
                <Card className="border-primary">
                    <CardHeader>
                        <SiteLogo />
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Payment Successful</h1>
                        <p className="font-semibold text-muted-foreground">Your payment was successfully Captured. Your reference ID is {referenceId}</p>
                        <p>Please wait a few minuites for everything to get processed. You will receive and email when your payment is 100% confirmed</p>
                        <Button asChild><Link className="ml-auto" href="/dashboard">Go to dashboard</Link></Button>
                    </CardContent>
                </Card>
            </main>
        </div >
    )
}
export default SubscriptionSuceessPage