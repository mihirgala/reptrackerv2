"use server"

import { getUsersByQuery } from "@/data"

export const fetchUsersByQuery = async (query: string,page:number,onlyPremium:boolean) => {
    return await getUsersByQuery(query,page,onlyPremium)
}