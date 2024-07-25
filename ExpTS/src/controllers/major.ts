import { Request, Response } from "express";
import { createMajor, getMajors } from "../services/major"

//Pagina de listagem de cursos ja cadastrados
const index = async (req:Request, res: Response) => {
    try {
        const majors = await getMajors()
        console.log(`Cursos ja cadastrados: ${majors}`)
        res.render("major/index", { majors }) //Nova pagina e passa os majors que foram recuperados
    } catch(err) {
        console.log(err)
        res.status(500).send(err) //Indica que aconteceu um erro no servidor
    }
}   


const create = async (req:Request, res: Response) => {
    if(req.method === "GET" ){
        res.render("major/create")
    } else { // ROTA DE POST --> submit forms 
        try {
            console.log(req.body); // Ver o valor da nossa requisicao
            await createMajor(req.body)
            console.log("Curso Criado!")
            res.send("criado")
        } catch(err) {
            console.log(err)
            res.status(500).send(err) //Indica que aconteceu um erro no servidor
        }
    }   
}


const read = async (req:Request, res: Response) => {}


const update  = async (req:Request, res: Response) => {}
const remove = async (req:Request, res: Response) => {}

export default { index, create, read, update, remove } 

