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
app.get('/hb1', (req, res) => {
    res.render('hb1', {
        mensagem: 'Olá, você está aprendendo Express + HBS!',
        layout: false,
    });
});
//middleware de logs
app.use(logger('simples'));
//middleware de rotas
app.use(router_1.default);
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
//Conexão com a porta
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
