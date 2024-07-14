"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lorem_ipsum_1 = require("lorem-ipsum");
const router = (0, express_1.Router)();
//Pagina inical 
router.get('/', (req, res) => {
    res.send('Página principal do site');
});
//Pagina sobre
router.get('/sobre', (req, res) => {
    res.send('Página Sobre');
});
//Página lorem - Exericio 4
router.get('/lorem/:numParagrafos', (req, res) => {
    const numParagrafos = parseInt(req.params.numParagrafos, 10);
    const paragrafo = (0, lorem_ipsum_1.loremIpsum)({ count: numParagrafos, units: 'paragraphs' });
    res.send(paragrafo);
});
exports.default = router;
