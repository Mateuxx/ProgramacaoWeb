"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const calculate = {
    sum: (num1, num2) => num1 + num2,
    sub: (num1, num2) => num1 - num2,
    multi: (num1, num2) => num1 * num2,
    div: (num1, num2) => {
        if (num2 === 0) {
            return "Erro";
        }
        return num1 / num2;
    }
};
app.get('/:operation/:num1/:num2', (req, res) => {
    const { operation, num1, num2 } = req.params;
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    const result = calculate[operation](n1, n2);
    res.render(`Resultado: ${result}`);
});
app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});
