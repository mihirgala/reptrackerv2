"use client"

import { fetchUsersByQuery } from "@/actions/protected/admin/fetch-users-by-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { User } from "@prisma/client"
import { RefreshCcw } from "lucide-react"
import { useEffect, useState, useTransition } from "react"
import { UserActions } from "./user-actions"
import { Badge } from "@/components/ui/badge"


interface UserTableProps {
  dbUsers?: User[] | null
}

export const UserTable = ({ dbUsers }: UserTableProps) => {
  const [users, setUsers] = useState<User[]>(dbUsers || [])
  const [query, setQuery] = useState<string>("")
  const [isPending, startTransition] = useTransition()
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const { toast } = useToast()
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 1500)
    return () => clearTimeout(handler)
  }, [query])

  useEffect(() => {
    startTransition(async () => setUsers(await fetchUsersByQuery(debouncedQuery) || []))
  }, [debouncedQuery])

  const refresh = async () => {
    startTransition(async () => setUsers(await fetchUsersByQuery(debouncedQuery) || []))
  }

  return (
    <>
      <div className="flex justify-between items-center gap-10">
        <Input placeholder="Search by email or name" value={query} onChange={e => setQuery(e.target.value)} />
        <Button onClick={() => refresh()}><RefreshCcw /></Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Expiry</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending && <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow>}
          {users.length > 0 ? users.map((user) => {
            const isPremium = user?.subscriptionCurrendCycleEnd && (user.subscriptionCurrendCycleEnd >= new Date())
            return (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell colSpan={user.subscriptionCurrendCycleEnd ? 1 : 2}>
                  <Badge variant={isPremium ? "default" : "secondary"}>
                    {isPremium ? "Premium" : "Free"}
                  </Badge>
                </TableCell>
                {user.subscriptionCurrendCycleEnd && (<TableCell>{user.subscriptionCurrendCycleEnd.toDateString()}</TableCell>)}
                <TableCell><UserActions user={user} /></TableCell>
              </TableRow>
            )
          }) : (
            <TableRow><TableCell colSpan={4} className="text-center">No users found for the following query</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
