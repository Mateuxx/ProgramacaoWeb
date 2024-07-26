import { Prisma, PrismaClient, User } from "@prisma/client";
import brcypt from 'bcryptjs'
import { LoginDto } from "../types/auth";


const prisma  = new PrismaClient()

export const checkAuth = async (credentials: LoginDto): Promise<User | null>  => {
    const user = await prisma.user.findFirst( {where: { email: credentials.email}})
    if(!user) return null
    const ok = await brcypt.compare(credentials.password, user.password)
    if(ok) return user
    return null
}   