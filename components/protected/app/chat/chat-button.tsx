"use client"
import { Chat } from "@prisma/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { TrashIcon } from "@radix-ui/react-icons"
import { usePathname } from "next/navigation"
import { EditChatNameButton } from "./edit-chat-name-button"

interface ChatButtonProps {
    chat: Chat
    handleDelete: (chatId: string) => void
    handleNameChange: (chatId: string, name: string) => void
    isPending: boolean
}
export const ChatButton = ({ chat, handleDelete,handleNameChange, isPending }: ChatButtonProps) => {
    const pathname = usePathname()
    const isCurrentChat = pathname === `/chat/${chat.id}`
    return (
        <div className="flex w-full justify-between gap-10">
            <Button className="text-black self-start dark:text-white" variant={`${isCurrentChat ? "default" : "link"}`} asChild>
                <Link href={`/chat/${chat.id}`}>
                    {chat.name || `untitled ${new Date(chat.updatedAt).toDateString()}`}
                </Link>
            </Button>
            <div className="self-end">
            <EditChatNameButton isPending={isPending} chatId={chat.id} handleNameChange={handleNameChange}/>
            {!isCurrentChat && (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button size={"icon"} variant="ghost"><TrashIcon width={15} height={15} /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                chat from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction disabled={isPending} onClick={() => handleDelete(chat.id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
            </div>
        </div>
    )
}