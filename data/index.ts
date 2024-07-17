import { db } from "@/lib/db"

export const getLoginCodeByEmail = async (email: string) => {
    try{
        const loginCode = await db.loginCode.findFirst({where:{email}})
        return loginCode
    }catch(e){
        console.error(e)
    }
}

export const getVerificationTokenByEmail = async (email: string) => {
    try{
        const verificationToken = await db.verificationToken.findFirst({where:{email}})
        return verificationToken
    }catch(e){
        console.error(e)
    }
}

export const getUserByEmail = async (email: string) => {
    try{
        const user = await db.user.findFirst({where:{email}})
        return user
    }catch(e){
        console.error(e)
    }
}

export const getUserById = async (id: string) => {
    try{
        const user = await db.user.findFirst({where:{id}})
        return user
    }catch(e){
        console.error(e)
    }
}

export const getAccountByUserId = async (userId: string) => {
    try{
        const account = await db.account.findFirst({where:{userId}})
        return account
    }catch(e){
        console.error(e)
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try{
        const verificationToken = await db.verificationToken.findFirst({where:{token}})
        return verificationToken
    }catch(e){
        console.error(e)
    }
}