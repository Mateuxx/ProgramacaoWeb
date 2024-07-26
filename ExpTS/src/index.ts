import { Request, Response, NextFunction } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import path, { format } from "path";
import fs from "fs";
import router from './router/router';
import { engine } from 'express-handlebars'
import cookieParser from 'cookie-parser';
import session from "express-session"
import {v4 } from "uuid"

declare module "express-session" {
  interface SessionData {
    uid: string
  }
}


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

//Middleware
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

//middleware de logs
app.use(logger('simples'))

//Middleware para formatar a requisição do body da API de forma mais limpa
app.use(express.urlencoded( { extended: false }))

//Middleware para cookies -> return a  middleware
app.use(cookieParser())

//Middleware de session
app.use(session({
  genid: () => v4(),
  secret: "MASKWOWQW##QW2sakda@",
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: 360000 }
}))

//middleware de rotas
app.use(router)




//Helpers HandleBars 
app.engine("handlebars", engine({
  helpers: require(`${__dirname}/views/helpers/helpers.ts`)
}))


//Conexão com a porta
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});


