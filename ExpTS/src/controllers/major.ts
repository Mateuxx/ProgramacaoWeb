import { Request, Response } from "express";
import { createMajor, getMajors, getMajor, deleteMajor, updateMajor } from "../services/major"
import { constrainedMemory } from "process";

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
            res.redirect("/major")
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


const update = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (req.method === "GET") {
        try {
            const major = await getMajor(id);
            if (!major) {
                return res.status(404).send("Curso não encontrado");
            }
            res.render("major/update", { major });
        } catch (err) {
            console.log(err);
            res.status(500).send("Erro ao recuperar o curso");
        }
    } else if (req.method === "POST") {
        try {
            const updatedMajor = req.body;
            await updateMajor(Number(id), updatedMajor); // Convert id to a number
            console.log("Curso Atualizado!");
            res.redirect(`/major/${id}`);
        } catch (err) {
            console.log(err);
        }
    }
};

const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteMajor(id);
        console.log("Curso Deletado!");
        res.redirect("/major");
    } catch (err) {
        console.log(err);
        res.status(500).send(err); // Indica que aconteceu um erro no servidor
    }
};

export default { index, create, read, update, remove } 

