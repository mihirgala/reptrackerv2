import { ChatBotComponent } from '@/components/protected/app/chat/chatbot'
import { getChatbyId, getChatsByUserId, getMessagesByChatId, getSystemMessage } from '@/data'
import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'


interface ChatbotIdPageProps {
    params: {
        id: string
    }
}

function convertMessage(messages: { role: "user" | "model" | string; content: string }[]){
    return messages.map(message => {
      return {
        role: message.role,
        parts: [{ text: message.content }],
      }
    })
  }

const ChatbotIdPage = async ({ params }: ChatbotIdPageProps) => {
    const user = await getUser()
    const chatId = params.id
    const chat = await getChatbyId(chatId)
    if (!chat || user?.id !== chat.userId) return redirect("/dashboard")
    const dbMessages = await getMessagesByChatId(chatId)
    const chats = await getChatsByUserId(user?.id!)
    const convertDbMessages = convertMessage(dbMessages!)
    return (
        <div>
            <div className="md:w-[80%] md:mx-auto">
                <ChatBotComponent chatId={chatId} user={user} chats={chats} isChatName={!!chat?.name} dbMessages={convertDbMessages!} />
            </div>
        </div>
    )
}

export default ChatbotIdPage