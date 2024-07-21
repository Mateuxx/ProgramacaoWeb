//Modelo de routas da aplicação!
import { Router } from 'express'
import { loremIpsum } from 'lorem-ipsum';
import mainController from '../controllers/main'

const router = Router()

//From Main Controller
router.get("/", mainController.index)
router.get("/hb1", mainController.hb1)
router.get("/hb2", mainController.hb2)
router.get("/hb3", mainController.hb3)
router.get("/hb4", mainController.hb4)

export default router