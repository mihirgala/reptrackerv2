import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getExercisesByWorkoutId } from "@/data"
import { Workout } from "@prisma/client"
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons"
import { DeleteWorkoutButton } from "@/components/protected/app/workout/delete-workout-button"
import Link from "next/link"

interface WorkoutSheetProps {
    workout: Workout
    personalInfoId?: string
}
export const WorkoutSheet = async ({ workout, personalInfoId }: WorkoutSheetProps) => {
    const exercises = await getExercisesByWorkoutId(workout.id!)
    const showActions = workout.personalInfoId === personalInfoId
    if (!exercises) {
        return null
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>{workout.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Exercise</TableHead>
                            <TableHead>Intensity</TableHead>
                            <TableHead>Metric</TableHead>
                            <TableHead>Sets</TableHead>
                            <TableHead>Reps</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {exercises.map((exercise) => (
                            <TableRow key={exercise.id}>
                                <TableCell>{exercise.name}</TableCell>
                                <TableCell>{exercise.intensity}</TableCell>
                                <TableCell>{exercise.metric}</TableCell>
                                <TableCell>{exercise.sets}</TableCell>
                                <TableCell>{exercise.reps}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            {showActions && (
                <CardFooter className="flex justify-end gap-2">
                    <Button className="p-0 m-0 aspect-square" variant={"outline"}  aria-label="Edit workout" asChild>
                        <Link  href={`/workout/edit/${workout.id}`}>
                        <Pencil1Icon height={20} width={20} />
                        </Link>
                    </Button>
                    <DeleteWorkoutButton workout={workout} />
                </CardFooter>
            )}
        </Card>
    )
}