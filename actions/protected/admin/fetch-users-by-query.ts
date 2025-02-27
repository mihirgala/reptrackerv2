"use server"

import { getUsersByQuery } from "@/data"

export const fetchUsersByQuery = async (query: string) => {
    return await getUsersByQuery(query)
}