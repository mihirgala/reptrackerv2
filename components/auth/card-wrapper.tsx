import { SiteLogo } from "@/components/logo"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { OAuthButtons } from "./oauth-buttons"

interface CardWrapperProps {
    children: React.ReactNode
    label: string
    showOAuth?: boolean
    showTNC?: boolean
}
export const CardWrapper = ({ children, label, showOAuth = false, showTNC = false }: CardWrapperProps) => {
    return (
        <Card className="select-none dark:border-primary">
            <CardHeader>
                <div className="space-y-2">
                    <div className="w-full text-center">
                        <SiteLogo />
                    </div>
                    <h2 className="text-muted-foreground text-sm font-semibold text-center">{label}</h2>
                    {/* <Button variant={"link"} className="px-0" asChild><Link href={"/"}>{">"}Return to home</Link></Button> */}
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {children}
                    {showOAuth && (
                        <>
                            <h3 className="text-sm font-bold text-muted-foreground text-center">OR</h3>
                            <OAuthButtons />
                        </>
                    )}
                </div>
            </CardContent>
            {showTNC && (
                <CardFooter className="flex flex-col justify-center">
                    <Separator className="mb-5" />
                    <p className="text-sm text-muted-foreground text-center">
                        By continuing, you agree to our </p>
                    <p className="text-sm text-muted-foreground text-center">
                        <Button className="px-0" asChild variant={"link"}>
                            <Link href={"/legal/tos"}>Terms of Service</Link>
                        </Button> and <Button className="px-0" asChild variant={"link"}>
                            <Link href={"/legal/privacy"}>Privacy Policy</Link>
                        </Button>.
                    </p>
                </CardFooter>
            )}
        </Card>
    )
}