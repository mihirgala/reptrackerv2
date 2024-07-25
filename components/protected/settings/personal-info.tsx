import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { calculateAge } from "@/lib/utils"
import { ExtendedUser } from "@/next-auth"
import { PersonalInfo } from "@prisma/client"
import { UpdateWeight } from "@/components/protected/settings/update-weight"
import { ChangeHeight } from "@/components/protected/settings/change-height"
import { ChangeBodyCompButton } from "@/components/protected/settings/change-body-goal-button"
import { ChangeActivityLevel } from "@/components/protected/settings/change-activity-level-buttoncopy"

interface SettingsPersonalProps {
    user: ExtendedUser
    personalInfo?: PersonalInfo | null | undefined
}

export const SettingsPersonal = ({ user, personalInfo }: SettingsPersonalProps) => {
    if (!personalInfo) return null
    const age = calculateAge(personalInfo?.dob)
    return (
        <Card>
            <CardHeader>
                <h2 className="text-lg text-muted-foreground font-bold text-center">Personal Info</h2>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableHead>Age</TableHead>
                            <TableCell colSpan={2}>{age || "Please set of Date of birth"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Sex</TableHead>
                            <TableCell colSpan={2}>{personalInfo?.sex || "Please pick your sex"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Weight</TableHead>
                            <TableCell>{user?.weight || "Please set of your weight"} KGs</TableCell>
                            <TableCell>
                                <UpdateWeight personalInfo={personalInfo} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Height</TableHead>
                            <TableCell>{personalInfo?.height || "Please set of your height"} CMs</TableCell>
                            <TableCell>
                                <ChangeHeight personalInfo={personalInfo} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Goal</TableHead>
                            <TableCell>{personalInfo?.bodyCompositionGoal || "Please pick a goal"}</TableCell>
                            <TableCell>
                                <ChangeBodyCompButton personalInfo={personalInfo} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Activity Level</TableHead>
                            <TableCell>{personalInfo?.activityLevel || "Please pick your activity level"}</TableCell>
                            <TableCell>
                                <ChangeActivityLevel personalInfo={personalInfo} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}