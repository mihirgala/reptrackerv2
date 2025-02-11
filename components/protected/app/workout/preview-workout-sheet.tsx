import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
interface Workout {
    name: string
    exercises: Exercise[]
}
interface Exercise {
    name: string
    sets: string
    reps: string
}

interface WorkoutSheetProps {
    workout: Workout
    personalInfoId?: string
}
export const PreviewWorkoutSheet = ({ workout }: WorkoutSheetProps) => {
    if (!workout.exercises) {
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
                            <TableHead>Sets</TableHead>
                            <TableHead>Reps</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {workout.exercises.map((exercise, index) => (
                            <TableRow key={index}>
                                <TableCell>{exercise.name}</TableCell>
                                <TableCell>{exercise.sets}</TableCell>
                                <TableCell>{exercise.reps}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}