const http = require('http')
const fs  = require('fs')
require ('dotenv').config()

const directory = process.argv[2]

//Tentar acessar essa porta caso
const PORT = process.env.PORT ?? 8080


const server = http.createServer(function(req,res){
    fs.readdir(directory, (err, files) => { 
        if (err) 
        console.log(err); 
        else {
        res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"})

        files.forEach(file => { 
            console.log(file);
            res.write(file +"<br>")         
            }) 
        }
        res.end();
    }) 

});

server.listen(PORT);