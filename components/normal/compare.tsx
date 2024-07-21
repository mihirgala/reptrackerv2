import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons"
import { Card, CardContent, CardHeader } from "../ui/card"

export const ComparisionComponent = () => {
    return (
        <Card className="w-full">
            <CardContent className="pb-0 px-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead colSpan={2}>
                                <h3>Feature</h3>
                            </TableHead>
                            <TableHead>
                                <h3>FREE</h3>
                            </TableHead>
                            <TableHead>
                                <h3 className="text-primary">PREMIUM</h3>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableHead rowSpan={4}>Workout Sheets</TableHead>
                        </TableRow>
                        <TableRow>
                            <TableHead>Avaliable</TableHead>
                            <TableCell><CheckIcon color="green" /></TableCell>
                            <TableCell><CheckIcon color="green" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>No. of sheets</TableHead>
                            <TableCell>7</TableCell>
                            <TableCell>7</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Sharable</TableHead>
                            <TableCell><Cross1Icon color="red" /></TableCell>
                            <TableCell><CheckIcon color="green" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead rowSpan={4}>Nutrition Guide</TableHead>
                        </TableRow>
                        <TableRow>
                            <TableHead>Avaliable</TableHead>
                            <TableCell><CheckIcon color="green" /></TableCell>
                            <TableCell><CheckIcon color="green" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Calories</TableHead>
                            <TableCell><CheckIcon color="green" /></TableCell>
                            <TableCell><CheckIcon color="green" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Weight Tracking</TableHead>
                            <TableCell><CheckIcon color="green" /></TableCell>
                            <TableCell><CheckIcon color="green" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead rowSpan={5}>AI Features</TableHead>
                        </TableRow>
                        <TableRow>
                            <TableHead>Avaliable</TableHead>
                            <TableCell><Cross1Icon color="red" /></TableCell>
                            <TableCell><CheckIcon color="green" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Chat with AI</TableHead>
                            <TableCell><Cross1Icon color="red" /></TableCell>
                            <TableCell><CheckIcon color="green" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Generated Meal Plans</TableHead>
                            <TableCell><Cross1Icon color="red" /></TableCell>
                            <TableCell><CheckIcon color="green" /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Generated Workout Plans</TableHead>
                            <TableCell><Cross1Icon color="red" /></TableCell>
                            <TableCell><CheckIcon color="green" /></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}