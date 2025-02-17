import { getFoodsByMealId } from "@/data"
import { Meal } from "@prisma/client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'


interface dbMealSheetProps{
    meal:Meal
}
export const DBMealSheet = async ({meal}:dbMealSheetProps) => {
    const foods = await getFoodsByMealId(meal.id)
  return (
    <Card>
    <CardHeader>
        <CardTitle>{meal.name}</CardTitle>
    </CardHeader>
    <CardContent>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Food</TableHead>
                    <TableHead>P</TableHead>
                    <TableHead>C</TableHead>
                    <TableHead>F</TableHead>
                    <TableHead>Cal</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {foods?.map((food, index) => (
                    <TableRow key={index}>
                        <TableCell>{food.name}</TableCell>
                        <TableCell>{food.protein}g</TableCell>
                        <TableCell>{food.carbohydrates}g</TableCell>
                        <TableCell>{food.fats}g</TableCell>
                        <TableCell>{food.calories}</TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableHead>Total</TableHead>
                    <TableHead>{meal.protein}g</TableHead>
                    <TableHead>{meal.carbohydrates}g</TableHead>
                    <TableHead>{meal.fats}g</TableHead>
                    <TableHead>{meal.calories}</TableHead>
                </TableRow>
            </TableBody>
        </Table>
    </CardContent>
</Card>
  )
}
