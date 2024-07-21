"use client"

import { cancleSubscription } from "@/actions/protected/payments/cancel"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

export const CancelSubscriptionButton = () => {
    const router = useRouter()
    const { toast } = useToast()
    const handleClick = async () => {
        const data = await cancleSubscription()
        if (data?.error) {
            toast({
                title: data.error
            })
        }
        if (data.success) {
            toast({
                title: data.message
            })
            router.refresh()
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="w-full" variant="destructive">Cancel</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will cancel your subscription from next cycle.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Go back</AlertDialogCancel>
                    <Button variant={"destructive"} asChild>
                        <AlertDialogAction onClick={async () => await handleClick()}>Confirm</AlertDialogAction>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}