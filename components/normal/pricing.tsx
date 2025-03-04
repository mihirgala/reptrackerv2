import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PricingComponentProps {
    isUser: boolean
    isPremium?: boolean
}
export const PricingComponent = ({ isUser, isPremium = false }: PricingComponentProps) => {
    const FREEhref = isUser ? (isPremium ? "/dashboard" : "/dashboard") : "/auth/login"
    const PREMIUMhref = isUser ? (isPremium ? "/settings" : "/subscribe") : "/auth/login"

    const FREEtitle = isUser ? (isPremium ? "Get Started" : "Dashboard") : "Get Started"
    const PREMIUMtitle = isUser ? (isPremium ? "Settings" : "Subscribe") : "Get Started"
    return (
        <div className="grid md:grid-cols-2 gap-10 items-center">
            <Card className="px-5">
                <CardHeader>
                    <h3 className="text-2xl font-extrabold text-center">FREE PLAN</h3>
                    <p className="font-semibold text-muted-foreground text-center">Basic features</p>
                    <h2 className="text-xl font-extrabold text-center">FREE</h2>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-outside flex flex-col gap-3">
                        <li>Track workouts</li>
                        <ul className="list-disc list-inside flex flex-col gap-1">
                            <li>Use Presets</li>
                            <li>Create Your Own</li>
                        </ul>
                        <li>Nutrition Guide</li>
                        <ul className="list-disc list-inside flex flex-col gap-1">
                            <li>Calories</li>
                            <li>Macros</li>
                        </ul>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" asChild>
                        <Link href={`${FREEhref}`}>{FREEtitle}</Link>
                    </Button>
                </CardFooter>
            </Card>
            <Card className="px-5 border-primary">
                <CardHeader>
                    <h3 className="text-2xl font-extrabold text-center text-primary">PREMIUM PLAN</h3>
                    <p className="font-semibold text-muted-foreground text-center">Exclusive features</p>
                    <h2 className="text-xl font-extrabold text-center">₹50</h2>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-outside flex flex-col gap-3">
                        <li>Everything from FREE plan</li>
                        <li>Track workouts</li>
                        <ul className="list-disc list-inside flex flex-col gap-1">
                            <li>Generate with AI</li>
                            <li>Share workouts</li>
                        </ul>
                        <li>Nutrition Guide</li>
                        <ul className="list-disc list-inside flex flex-col gap-1">
                            <li>Generate meal plans with AI</li>
                        </ul>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" asChild>
                        <Link href={`${PREMIUMhref}`}>{PREMIUMtitle}</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}