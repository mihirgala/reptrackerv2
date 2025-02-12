import { Chat } from "@prisma/client"
import { atom } from "jotai"

export const chatsStateAtom = atom<Chat[]>([])