import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'


interface MealSheetProps {
  meal: Meal
}
export const MealSheet = ({meal}:MealSheetProps) => {
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
                        <TableHead>Protein</TableHead>
                        <TableHead>Carbs</TableHead>
                        <TableHead>Fats</TableHead>
                        <TableHead>Calories</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {meal.foods.map((food, index) => (
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
                        <TableHead>{meal.total.protein}g</TableHead>
                        <TableHead>{meal.total.carbohydrates}g</TableHead>
                        <TableHead>{meal.total.fats}g</TableHead>
                        <TableHead>{meal.total.calories}</TableHead>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  )
}
