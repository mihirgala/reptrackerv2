import { givePremiumAccess } from '@/actions/protected/admin/give-premium-access'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'
import { User } from '@prisma/client'
import { MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

interface UserActionsProps {
  user: User
  refresh: () => void
}

export const UserActions = ({ user,refresh }: UserActionsProps) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { toast } = useToast()
  const handleGivePremiumAccess = () => {
    startTransition(async () => {
      try {
        await givePremiumAccess(user.id)
        toast({
          title: "Success",
          description: `Premium access given successfully to ${user.name}`,
        })
        refresh()
        router.refresh()
      }
      catch {
        toast({
          title: "Error",
          description: "An error occurred while giving premium access. Please try again.",
        })
      }
    })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(user.id)}
        >
          Copy User ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {user.subscriptionId && (
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(user?.subscriptionId as string)}
          >
            Copy Razorpay Subscription ID
          </DropdownMenuItem>
        )}
        {(!user.subscriptionId && !user.subscriptionCurrendCycleEnd) && (
          <DropdownMenuItem
            onClick={() => handleGivePremiumAccess()}
          >
            Give premium access
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
