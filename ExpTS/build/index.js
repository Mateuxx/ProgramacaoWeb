"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router_1 = __importDefault(require("./router/router"));
const express_handlebars_1 = require("express-handlebars");
dotenv_1.default.config();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3333;
const app = (0, express_1.default)();
//HandleBars
app.engine("handlebars", (0, express_handlebars_1.engine)());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);
console.log(__dirname);
//abertura de arquivo para guardar os logs
const logFolder = process.env.LOG_FOLDER || 'logs';
if (!fs_1.default.existsSync(logFolder)) {
    fs_1.default.mkdirSync(logFolder);
}
const logger = (format = 'simples') => (req, res, next) => {
    const timestamp = new Date().toISOString();
    let logMessage;
    if (format === 'completo') {
        logMessage = `${timestamp} - ${req.url} - ${req.method} - ${req.httpVersion} - ${req.get('User-Agent')}\n`;
    }
    else {
        logMessage = `${timestamp} - ${req.url} - ${req.method}\n`;
    }
    const logFilePath = path_1.default.join(logFolder, 'access.log');
    fs_1.default.appendFile(logFilePath, logMessage, (err) => {
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
app.get('/hb2', (req, res) => {
    res.render('hb2', {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework',
        layout: false,
    });
});
app.get('/hb3', (req, res) => {
    const profes = [
        { nome: 'David Fernandes', sala: 1238 },
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 }
    ];
    res.render('hb3', {
        profes,
        layout: false
    });
});
//Exercicio 6
app.get('/hb4', (req, res) => {
    const profes = [
        { nome: 'David Fernandes', sala: 1238 },
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 },
    ];
    res.render('hb4', {
        profes,
        layout: false
    });
});
//middleware de logs
app.use(logger('simples'));
//middleware de rotas
app.use(router_1.default);
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
//Helpers HandleBars 
app.engine("handlebars", (0, express_handlebars_1.engine)({
    helpers: require(`${__dirname}/views/helpers/helpers.ts`)
}));
//Conexão com a porta
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
