import { deleteChat } from '@/actions/protected/app/ai/chat/delete-chat'
import { updateChatName } from '@/actions/protected/app/ai/chat/update-chat-name'
import { useToast } from '@/components/ui/use-toast'
import { chatsStateAtom } from '@/utils/store'
import { Chat } from '@prisma/client'
import { useAtom } from 'jotai'
import { User } from 'next-auth'
import { usePathname, useRouter } from 'next/navigation'
import React, { startTransition, useEffect, useTransition } from 'react'
import { ChatButton } from './chat-button'

interface ChatHistoryProps {
    user?: User
    chats?: Chat[]
}
export const ChatHistory = ({user,chats}:ChatHistoryProps) => {
    const { toast } = useToast()
    const [isPending, setIsPending] = useTransition()
    const [chatsState, setChatsState] = useAtom(chatsStateAtom)
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        if(chats) setChatsState(chats)
            console.log(chats)
    }, [])

    const handleDelete = (chatId: string) => {
        const isCurrentChat = pathname === `/chat/${chatId}`
        if (isCurrentChat) {
            toast({
                title: "You cannot delete the chat you are currently in",
            })
            return
        }
        startTransition(() => {
            deleteChat(chatId)
                .then((data) => {
                    if (data.success) {
                        const newChats = chatsState.filter((chat) => chat.id !== chatId)
                        setChatsState(newChats.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()))
                        toast({
                            title: data.success,
                        })
                        router.refresh()
                    }
                    if (data.error) {
                        toast({
                            title: data.error,
                        })
                    }
                })
        })
    }

    const handleNameChange = (chatId: string, name: string) => {
        startTransition(() => {
            updateChatName(chatId, name)
                .then((data) => {
                    if (data.success) {
                        toast({
                            title: data.success
                        })
                        const newChats = chatsState.map((chat) => {
                            if (chat.id === chatId) {
                                chat.name = name
                            }
                            return chat
                        })
                        setChatsState(newChats)
                        router.refresh()
                    }
                    if (data.error) {
                        toast({
                            title: data.error
                        })
                    }
                })
        })

    }
  return (
    <div className='w-full'>
    {chatsState.map((chat, index) => (
        <ChatButton key={index} isPending={isPending} chat={chat} handleNameChange={handleNameChange} handleDelete={handleDelete} />
    ))}
</div>
  )
}
