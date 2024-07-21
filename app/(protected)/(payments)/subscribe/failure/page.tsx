import { SiteLogo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Link from "next/link"

interface SubscribeFailurePageProps {
    searchParams: { [key: string]: string | string | string[] | undefined }
}
const SubscribeFailurePage = ({searchParams}:SubscribeFailurePageProps) => {
    const errorType = searchParams.type
  return (
    <div>
        <main className="min-h-[calc(100vh-4rem)] flex justify-center items-center">
            <Card className="border-destructive min-w-96">
                <CardHeader>
                    <SiteLogo/>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">Payment Failed</h1>
                        <p className="font-semibold text-muted-foreground">Reason: {errorType}</p>
                        <Button asChild><Link className="ml-auto" href="/dashboard">Go to dashboard</Link></Button>
                    </CardContent>
            </Card>
        </main>
    </div>
  )
}
export default SubscribeFailurePage