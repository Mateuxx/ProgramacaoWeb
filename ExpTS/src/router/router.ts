//Modelo de routas da aplicação!
import { Router } from 'express'
import mainController from '../controllers/main'
import majorController from "../controllers/major"
import authController from "../controllers/auth"
import { checkAuth } from "../middlewares/chechAuth"

const router = Router()

// Auth Controller
router.get("/auth/signup", authController.signup)
router.post("/auth/signup", authController.signup)
router.get("/auth/login", authController.login)
router.post("/auth/login", authController.login)
router.get("/auth/logout", authController.logout)

//Major Controller
router.get("/major",  majorController.index)
router.get("/major", majorController.index) //pagina com listagem de cursos da aplicação
router.get("/major/read/:id", majorController.read) //ler dados de um curso especifico
router.get("/major/create", checkAuth, majorController.create) //retorne para usuario um forms para colocar um novo curso
router.post("/major/create", majorController.create) //SUBMIT os dados do forms - POST
router.post("/major/update/:id", majorController.create) //salvar os dados do forms no db - Submit (POST)
router.get("/major/update/:id", majorController.update) // Retorna um forms
router.post("major/update/:id", majorController.update) //processar os dados vindo do forms
router.post("/major/remove/:id", majorController.remove) // remover (POST)
router.get("/major/update/:id", majorController.update)
router.post("/major/update/:id", majorController.update)

//From Main Controller
router.get("/", mainController.index)
router.get("/hb1", mainController.hb1)
router.get("/hb2", mainController.hb2)
router.get("/hb3", mainController.hb3)
router.get("/hb4", mainController.hb4)
router.get("/test-cookie", mainController.testCookie)



export default router