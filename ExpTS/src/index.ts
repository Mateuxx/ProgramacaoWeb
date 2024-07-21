import { Request, Response, NextFunction } from 'express';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path, { format } from "path";
import fs from "fs";
import router from './router/router';
import { engine } from 'express-handlebars'

dotenv.config();
const PORT = process.env.PORT ?? 3333;
const app = express();

//HandleBars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", `${__dirname}/views`)
console.log(__dirname)



//abertura de arquivo para guardar os logs
const logFolder = process.env.LOG_FOLDER || 'logs';
if (!fs.existsSync(logFolder)) {
  fs.mkdirSync(logFolder);
}

type LogFormat = 'simples' | 'completo';

const logger = (format: LogFormat = 'simples') =>
    (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  let logMessage: string;

  if (format === 'completo') {
    logMessage = `${timestamp} - ${req.url} - ${req.method} - ${req.httpVersion} - ${req.get('User-Agent')}\n`;
  } else {
    logMessage = `${timestamp} - ${req.url} - ${req.method}\n`;
  }

  const logFilePath = path.join(logFolder, 'access.log');
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });

  next();
};

//HanldeBars - Exercicio 5 
app.get('/hb1', (req, res) => {
  res.render('hb1', {
    mensagem: 'Olá, você está aprendendo Express + HBS!',
    layout: false,
  });
});

app.get('/hb2', (req, res) =>{
  res.render('hb2', {
    poweredByNodejs: true,
    name: 'Express',
    type: 'Framework',
    layout: false,
  })
})

app.get('/hb3', (req, res) => {
  const profes = [
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horácio Fernandes', sala: 1233 },
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine Harada', sala: 1231 }
  ]
  res.render('hb3' , {
    profes,
    layout:false
  })
})


//Exercicio 6
app.get('/hb4', (req, res) => {
  
  const technologies = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
    ];

    res.render('hb4', {
      technologies,
      layout:false
    })
})

//middleware de logs
app.use(logger('simples'))

//middleware de rotas
app.use(router)

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

//Helpers HandleBars 
app.engine("handlebars", engine({
  helpers: require(`${__dirname}/views/helpers/helpers.ts`)
}))


//Conexão com a porta
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});


