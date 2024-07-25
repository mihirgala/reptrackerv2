import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ExtendedUser } from "@/next-auth"
import Link from "next/link"
import { Subscriptions } from "razorpay/dist/types/subscriptions"
import { CancelSubscriptionButton } from "@/components/protected/settings/cancel-subscription-button"

interface SettingsBillingProps {
    user: ExtendedUser
    subscription: Subscriptions.RazorpaySubscription | null | undefined
}
export const SettingsBilling = ({ user, subscription }: SettingsBillingProps) => {
    const nextCycleDate = subscription?.charge_at ? new Date(subscription?.charge_at as number * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }) : null
    const cycleStartDate = subscription?.current_start ? new Date(subscription?.current_start as number * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }) : null

    const exipres = user.currentEnd ? new Date(user.currentEnd).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }) : null

    if (subscription === null || user.plan == "FREE") {
        return (
            <Card>
                <CardHeader>
                    <h2 className="text-lg text-muted-foreground font-bold text-center">Billing</h2>
                </CardHeader>
                <CardContent>
                    <p className="text-center mx-10 text-muted-foreground font-bold">You do not have any active subscriptions</p>
                    <Table className="my-5">
                        <TableBody>
                            <TableRow>
                                <TableCell>Current Plan</TableCell>
                                <TableCell>{user.plan}</TableCell>
                            </TableRow>
                            {user.plan === "PREMIUM" ? (
                                <TableRow>
                                    <TableCell>Expires</TableCell>
                                    <TableCell>{exipres}</TableCell>
                                </TableRow>
                            ) : (
                                <TableRow>
                                    <TableCell>Upgrade to Premium</TableCell>
                                    <TableCell>
                                        <Button asChild>
                                            <Link href="/subscribe">Subscribe</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    {
                        user.plan === "PREMIUM" && (
                            <p className="text-center mx-10 text-muted-foreground font-bold">
                                To start a subscription again you will have to wait for current to expire.
                            </p>
                        )
                    }
                </CardContent>
            </Card>
        )
    }
    return (
        <Card>
            <CardHeader>
                <h2 className="text-lg text-muted-foreground font-bold text-center">Billing</h2>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableHead>Razorpay</TableHead>
                            <TableCell>
                                <Button asChild>
                                    <Link className="w-full" target="_blank" href={`${subscription?.short_url}`}>Manage</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Subscription ID</TableHead>
                            <TableCell>
                                <p>{subscription?.id}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Cycle Started at</TableHead>
                            <TableCell>
                                <p>{cycleStartDate}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Next Charge Date</TableHead>
                            <TableCell>
                                <p>{nextCycleDate}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Status</TableHead>
                            <TableCell>
                                <p>{subscription?.status.toLocaleUpperCase()}</p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>{user.plan}</TableHead>
                            <TableCell>
                                <CancelSubscriptionButton />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}