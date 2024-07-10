const http = require('http')
const fs  = require('fs')
const linkHelper = require('./createLink')
const path = require('path');

const dotenv = require("dotenv")
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const directory = process.argv[2]

//Tentar acessar essa porta caso
const PORT = process.env.PORT ?? 8080

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/') {
        // Listar arquivos no diretório
        fs.readdir(directory, (err, files) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
                res.end('Erro ao ler o diretório');
                return;
            }

            res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        
            files.forEach(file => {
                const link = linkHelper.createLink(file);
                res.write(link);
            });

            res.write('</ul>');
            res.end();
        });
    } else if (url.startsWith('/file')) {
        const queryParams = new URLSearchParams(url.split('?')[1]);
        const fileName = queryParams.get('name');

        if (!fileName) {
            res.writeHead(400, { "Content-Type": "text/html;charset=utf-8" });
            res.end('Nome do arquivo não especificado');
            return;
        }

        const filePath = path.join(directory, fileName);

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
                res.end('Arquivo não encontrado');
                return;
            }

            res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
            res.write(`<h1>Conteúdo do Arquivo: ${fileName}</h1>`);
            res.write('<pre>' + data + '</pre>');
            res.write('<br><a href="/">Voltar</a>');
            res.end();
        });
    } else {
        res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
        res.end('Página não encontrada');
    }
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});