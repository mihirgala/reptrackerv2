"use server"

import { getMonthlyAvgWeightByPersonalInfoId } from "@/data"

export const MonthlyAvgWeight = async (personalInfoId: string) => {
    try{
        if (!personalInfoId){
            throw new Error("Invalid request")
        }
        const data = await getMonthlyAvgWeightByPersonalInfoId(personalInfoId)
        return {success:true,chartData:data}
    }catch(e){
        console.error(e)
        return {error: "Something went wrong!"}
    }
}