import { Request, Response } from "express";


const index = async (req:Request, res: Response) => {}  //Listar os cursos existentes 


const create = async (req:Request, res: Response) => {
    if(req.method === "GET" ){
        res.render("major/create")
    }
    
}


const read = async (req:Request, res: Response) => {}


const update  = async (req:Request, res: Response) => {}
const remove = async (req:Request, res: Response) => {}

export default { index, create, read, update, remove } 

