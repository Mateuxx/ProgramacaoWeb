// Service p/ Operações para chamadas de Banco de Dados
import { PrismaClient, Major } from "@prisma/client";
import { CreateMajorDto } from "../types/major";

const prisma = new PrismaClient()

//Recebe um major e insere no DB
export const createMajor = async(major: CreateMajorDto): Promise<Major> => { 
    return prisma.major.create({ data: major }) 
}

//Recuperar todos os cursos(majors) que ja existem no banco
export const getMajors = async(): Promise<Major[]> => {
    return prisma.major.findMany()
}

//Retorna o major que contem essa id especifico passado como parametro
export const getMajor = async(id: string): Promise<Major | null> => {
    return prisma.major.findUnique({ where: { id } }) 
}