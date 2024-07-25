import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ExtendedUser } from "@/next-auth"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { PencilIcon } from "lucide-react"
import { ChangeNameButton } from "@/components/protected/settings/change-name-button"
import { Badge } from "@/components/ui/badge"
import { ModeToggleText } from "@/components/theme/theme-switch-button-text"

interface SettingsAccountProps {
    user: ExtendedUser
}

export const SettingsAccount = ({ user }: SettingsAccountProps) => {
    return (
        <Card>
            <CardHeader>
                <h2 className="text-lg text-muted-foreground font-bold text-center">Account</h2>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableCell colSpan={2}>{user.email}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableCell>{user.name || "Set a name!"}</TableCell>
                            <TableCell><ChangeNameButton user={user} /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Plan</TableHead>
                            <TableCell colSpan={2}><Badge variant={user.plan === "PREMIUM" ? "default" : "secondary"}>
                                {user.plan}
                            </Badge>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Theme</TableHead>
                            <TableCell colSpan={2}><ModeToggleText/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}