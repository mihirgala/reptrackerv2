import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const ErrorPage = () => {
    return (
        <div>
            <main className="min-h-[calc(100vh-4rem)] flex justify-center items-center">
                <div>
                    <CardWrapper label="Something went wrong!">
                        <Button className="w-full" asChild><Link href={"/auth/login"}>Go back to login!</Link></Button>
                    </CardWrapper>
                </div>
            </main>
        </div>
    )
}
export default ErrorPage