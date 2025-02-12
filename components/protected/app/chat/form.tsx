"use client"
import * as z from "zod"
import { ChatBotSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { HistoryIcon, SendIcon } from "lucide-react"
import { StopIcon } from "@radix-ui/react-icons"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { ChatHistory } from "./chat-history"
import { User } from "next-auth"
import { Chat } from "@prisma/client"
import { newChat } from "@/actions/protected/app/ai/chat/new-chat"
import { useRouter } from "next/navigation"

interface ChatBoxFormProps {
    onSubmit: (values: z.infer<typeof ChatBotSchema>) => void
    isPending: boolean
    isFetching: boolean
    abortFetch: () => void
    chats?: Chat[]
    user?: User
}

export const ChatBotForm = ({ onSubmit, isPending, abortFetch, isFetching, user, chats }: ChatBoxFormProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const router = useRouter()
    const form = useForm<z.infer<typeof ChatBotSchema>>({
        resolver: zodResolver(ChatBotSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const handleInput = () => {
        if (textareaRef.current) {
            const textarea = textareaRef.current
            textarea.style.height = 'auto' // Reset height to auto to correctly calculate new height
            textarea.style.height = `${Math.min(textarea.scrollHeight, 7 * 16)}px` // 24px per line, 7 lines max
        }
    }
    const onSubmitHandler = (values: z.infer<typeof ChatBotSchema>) => {
        onSubmit(values)
        form.reset()
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 768) {
            e.preventDefault();
            form.handleSubmit(onSubmitHandler)()
        }
    }

    const handleNewChat = async () => {
        const newchat = await newChat(user?.id!)
        if (newchat.success) {
            router.push(`/chat/${newchat.chat?.id}`)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={(form.handleSubmit(onSubmitHandler))} className="pt-1 w-full">
                <div className="absolute inset-y-1 left-[-4] ml-2 flex items-center pr-2">
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button variant="outline" size={"icon"}><HistoryIcon /></Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="mx-auto w-full max-w-sm">
                                <DrawerHeader>
                                    <DrawerTitle>Chat history</DrawerTitle>
                                </DrawerHeader>
                                <div>
                                    <ChatHistory user={user} chats={chats} />
                                </div>
                                <DrawerFooter>
                                    <Button onClick={() => handleNewChat()}>New Chat</Button>
                                    <DrawerClose asChild>
                                        <Button variant="outline">Close</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
                <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel hidden={true}>Prompt</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Enter your prompt"
                                    className="min-h-[30px] h-auto resize-none pl-20 pr-20 text-[16px] whitespace-pre-wrap"
                                    rows={1} // Initial rows
                                    ref={textareaRef}
                                    onInput={handleInput}
                                    onKeyDown={handleKeyPress}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="absolute inset-y-1 right-4 flex items-center pr-2">
                    <Button
                        type="submit"
                        onClick={() => {
                            if (isPending || isFetching) {
                                abortFetch()
                            }
                        }}
                        variant={"ghost"}
                    >
                        {!(isPending || isFetching) ? <SendIcon size={20} /> : <StopIcon />}
                    </Button>
                </div>
            </form>
        </Form>
    )
}