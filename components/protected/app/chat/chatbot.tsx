"use client"

import { useAtom } from "jotai"
import { ChatBotMessages } from "./chat-bot-message"
import { ChatBotForm } from "./form"
import { chatsStateAtom } from "@/utils/store"
import { useMemo, useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { ChatBotSchema } from "@/schemas"
import * as z from "zod"
import { newMessage } from "@/actions/protected/app/ai/chat/new-message"
import { deleteLatestMessage } from "@/actions/protected/app/ai/chat/delete-latest-message"
import { newLatestFeedback } from "@/actions/protected/app/ai/chat/latest-message-feedback"
import { Chat } from "@prisma/client"
import { generateTitle } from "@/actions/protected/app/ai/chat/generate-title"
import { User } from "next-auth"

export interface Message {
  id?: string
  role: "user" | "model" | string
  parts: { text: string }[]
}

interface ChatBotComponentProps {
  chatId: string
  dbMessages?: Message[]
  isChatName?: boolean
  chats?: Chat[]
  user: User
}

export const ChatBotComponent = ({ chatId, dbMessages, isChatName,chats,user }: ChatBotComponentProps) => {
  const [chatsState, setChatsState] = useAtom(chatsStateAtom)
  const [messages, setMessages] = useState<Message[]>(dbMessages || [])
  const memoizedMessages = useMemo(() => messages, [messages])
  const [updatingText, setUpdatingText] = useState<string>("")
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const responseRef = useRef<string>("")
  const [isPending, startTransition] = useTransition()
  const controllerRef = useRef<AbortController | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const refreshLatest = () => {
    const refreshMessages = messages.filter((message, index) => index !== messages.length - 1)
    setMessages(refreshMessages)
    deleteLatestMessage(chatId)
    fetchStream(messages.filter((message, index) => index !== messages.length - 1))
  }

  const feedbackLatest = (feedback: "GOOD" | "BAD") => {
    newLatestFeedback(feedback,chatId)
      .then((data) => {
        if (data.success) {
          toast({
            title: "Feedback submitted",
            description: "Thank you for your feedback!",
          })
        }
        else {
          toast({
            title: "Error",
            description: "An error occurred while submitting your feedback. Please try again.",
          })
        }
      })
  }

  const fetchStream = async (newMessages: Message[]) => {
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal
    responseRef.current = ""
    setIsFetching(true);
    try {
      const response = await fetch('/api/chat/response', {
        signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newMessages, chatId, })
      })
      const reader = response.body!.getReader()
      const decoder = new TextDecoder('utf-8')

      while (true) {
        const { value, done } = await reader.read()
        if (done) {
          break
        }
        const chunk = decoder.decode(value, { stream: true });
        setUpdatingText((prevText) => prevText + chunk)
        responseRef.current = responseRef.current + chunk
      }

      setIsFetching(false)
      setUpdatingText("")
      setMessages((prevMessages) => [...prevMessages, { role: "model", parts: [{ text: responseRef.current }] }])
      newMessage(chatId, "model", responseRef.current)
      if (!isChatName && messages.length > 3) {
        generateTitle(chatId, messages)
          .then((data) => {
            if (data) {
              const newChats = chatsState.map((chat) => {
                if (chat.id === chatId) {
                  chat.name = `${data.name}`
                }
                return chat
              })
              setChatsState(newChats)
              router.refresh()
            }
          })
      }
    } catch (e) {
      console.error("Error fetching response:", e);
      setIsFetching(false);
    }
  }

  const abortFetch = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      setUpdatingText("")
      setIsFetching(false)
      setMessages((prevMessages) => [...prevMessages, { role: "model", parts: [{ text: responseRef.current }] }])
      newMessage(chatId, "model", responseRef.current)
    }
  }

  const onSubmit = (values: z.infer<typeof ChatBotSchema>) => {
    startTransition(() => {
      const userMessage: Message = {
        role: "user",
        parts: [{text:values.prompt},]
      }
      setMessages((prevMessages) => [...prevMessages, userMessage])
      newMessage(chatId, "user", values.prompt)
      fetchStream([...messages, { role: "user", parts:[{text:values.prompt}]}])
    })
  }

  return (
    <div className="relative flex flex-col">
      <div className="flex-1 overflow-y-auto py-4 md:p-4">
        <ChatBotMessages refreshLatest={refreshLatest} feedbackLatest={feedbackLatest} response={updatingText} messages={memoizedMessages} />
      </div>
      <div className="sticky bottom-0 md:bottom-[25px] py-4 md:p-4">
        <ChatBotForm onSubmit={onSubmit} abortFetch={abortFetch} user={user} isPending={isPending} chats={chats} isFetching={isFetching} />
      </div>
    </div>
  )
}
