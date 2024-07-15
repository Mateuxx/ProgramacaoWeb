//Modelo de routas da aplicação!
import { Router } from 'express'
import { loremIpsum } from 'lorem-ipsum';
const router = Router()

//Pagina inical 
router.get('/', (req, res) =>{
    res.send('Página principal do site')
})

//Pagina sobre
router.get('/sobre', (req, res) => {
    res.send('Página Sobre')
})

//Página lorem - Exercicio 4
router.get ('/lorem/:numParagrafos', (req, res) => {
    const numParagrafos = parseInt(req.params.numParagrafos, 10)
    const paragrafo = loremIpsum({count: numParagrafos, units: 'paragraphs'}).replace(/\n/g, '<br><br>');
    res.send(paragrafo)
})


export default router