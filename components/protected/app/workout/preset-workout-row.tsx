"use client"

import { Split } from "@/app/(protected)/(app)/workout/preset/splits"
import { TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { BeatLoader } from "react-spinners"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
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
import Link from "next/link"
import { importGeneratedWorkouts } from "@/actions/protected/app/ai/workout/import"
import { useToast } from "@/components/ui/use-toast"

interface PresetWorkoutRowProps {
    split: Split
    personalInfoId?: string
}

export const PresetWorkoutRow = ({ split, personalInfoId }: PresetWorkoutRowProps) => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const { toast } = useToast()
    const handleImport = () => {
        startTransition(async () => {
            const data = await importGeneratedWorkouts(split.workouts!, personalInfoId as string)
            if (data.error) {
                toast({
                    title: "Error",
                    description: data.error
                })
            }
            if (data.success) {
                router.push("/workout")
            }
        })
    }
    return (
        <TableRow>
            <TableCell className="font-medium">{split.name}</TableCell>
            {isPending && (
                <TableCell colSpan={2}><BeatLoader className="dark:invert" /></TableCell>
            )}
            {!isPending && (
                <>
                    <TableCell>
                        <Button variant={"outline"} asChild>
                            <Link href={`/workout/preset/${split.slug}`}>Preview</Link>
                        </Button>
                    </TableCell>
                    <TableCell>
                        <AlertDialog>
                            <AlertDialogTrigger asChild><Button>Import</Button></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your previous workouts.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleImport()}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </TableCell>
                </>
            )}

        </TableRow>
    )
}