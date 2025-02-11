import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React from 'react'
import { splits } from "@/app/(protected)/(app)/workout/preset/splits"
import { PresetWorkoutRow } from "./preset-workout-row"

interface WorkoutPresetListProps {
    personalInfoId?: string
}

export const WorkoutPresetList = ({personalInfoId}:WorkoutPresetListProps) => {
  return (
    <Table>
    <TableHeader>
        <TableRow>
            <TableHead>Split</TableHead>
            <TableHead colSpan={2}>Action</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {splits.map((split, index) => (
            <PresetWorkoutRow personalInfoId={personalInfoId} split={split} key={index} />
        ))}
    </TableBody>
</Table>
  )
}
