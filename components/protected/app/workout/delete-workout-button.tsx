"use client"
import { deleteWorkout } from "@/actions/protected/app/delete-workout"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Workout } from "@prisma/client"
import { TrashIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

interface DeleteWorkoutButtonProps {
    workout: Workout
}
export const DeleteWorkoutButton = ({ workout }: DeleteWorkoutButtonProps) => {
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()
    const router = useRouter()
    const handleClick = () => {
        startTransition(async () => {
            const data = await deleteWorkout(workout)
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error,
                })
            }
            if (data.success) {
                toast({
                    title: "Success",
                    description: data.message
                })
                router.refresh()
            }
        })
    }
    return (

        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"destructive"} className="p-0 m-0 aspect-square" aria-label="Delete workout">
                    <TrashIcon height={20} width={20} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will delete your workout from your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Go back</AlertDialogCancel>
                    <Button variant={"destructive"} asChild>
                        <AlertDialogAction onClick={() => handleClick()}>Confirm</AlertDialogAction>
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}