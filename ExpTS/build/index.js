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
dotenv_1.default.config();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3333;
const app = (0, express_1.default)();
const LOG_DIRE = process.env.LOG_DIR;
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
// Use o middleware com formato 'simples'
app.use(logger('simples'));
// Defina suas rotas aqui
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
