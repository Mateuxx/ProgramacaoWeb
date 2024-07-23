import express, { Request, Response } from 'express';

const app = express()
const port = 3003

const calculate = {
    sum: (num1: number, num2: number) => num1 + num2,
    sub: (num1: number, num2: number) => num1 - num2,
    multi: (num1: number, num2: number) => num1 * num2,
    div: (num1: number, num2: number) => {
    if(num2 === 0) {
        return "Erro"
    }
    return num1/num2
    }
}

app.get('/:operation/:num1/:num2', (req: Request, res: Response) => {
    const {operation, num1, num2} = req.params

    const n1 = parseFloat(num1)
    const n2 = parseFloat(num2)

    const result = (calculate as any)[operation](n1, n2);

    res.send(`${result}`)
    
})

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta: ${port}`)
})
