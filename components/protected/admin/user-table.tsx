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
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"


interface UserTableProps {
  dbUsers?: User[] | null
}

export const UserTable = ({ dbUsers }: UserTableProps) => {
  const [users, setUsers] = useState<User[]>(dbUsers || [])
  const [query, setQuery] = useState<string>("")
  const [onlyPremium, setOnlyPremium] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [page, setPage] = useState(1)
  const { toast } = useToast()
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
      setPage(1)
    }, 1500)
    return () => clearTimeout(handler)
  }, [query])

  useEffect(() => {
    startTransition(async () => setUsers(await fetchUsersByQuery(debouncedQuery, page, onlyPremium) || []))
  }, [debouncedQuery, page,onlyPremium])

  const refresh = async () => {
    startTransition(async () => setUsers(await fetchUsersByQuery(debouncedQuery, page,onlyPremium) || []))
  }

  return (
    <>
      <div className="flex justify-between items-center gap-10">
        <Input placeholder="Search by email or name" value={query} onChange={e => setQuery(e.target.value)} />
        <div className="flex items-center gap-1">
        <Switch
        id="onlyPremium"
          checked={onlyPremium}
          onCheckedChange={(e) => setOnlyPremium(e.valueOf())}
        />
        <Label htmlFor="onlyPremium">Premium</Label>
        </div>
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
          {isPending && (
            <>
              {users.map((_, index) => (
                <TableRow key={index}>
                  {Array(4).fill(null).map((_, i) => (
                    <TableCell key={i} className="text-center">
                      <Skeleton className="w-full h-[30px] rounded-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          )}
          {!isPending && users.length > 0 && users.map((user) => {
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
          })}
          {users.length === 0 && (
            <TableRow><TableCell colSpan={4} className="text-center">No users found for the following query</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
        <span>Page {page}</span>
        <Button disabled={users.length < 5} onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </>
  )
}
