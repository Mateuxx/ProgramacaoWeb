import { Request, Response } from "express";
import { createMajor, getMajors, getMajor } from "../services/major"

//Pagina de listagem de cursos ja cadastrados
const index = async (req:Request, res: Response) => {
    try {
        const majors = await getMajors() //recebe a lista que contem todos os majors
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

//ler do BD um major que foi solicitado
const read = async (req: Request, res: Response) => {
    const { id } = req.params //id definido nas routas
    try {
        const major = await getMajor(id)
        console.log(`Major recebido ${major}`)
        res.render("major/read", { major }) //para para view o major que acabamos de pegar
    }
    catch(err) {
        console.log(err)
        res.status(500).send(err) //Indica que aconteceu um erro no servidor
    }
}


const update  = async (req:Request, res: Response) => {}
const remove = async (req:Request, res: Response) => {}

export default { index, create, read, update, remove } 

