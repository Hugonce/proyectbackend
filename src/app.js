const http = require("http");

const server = http.createServer((request, response)=>{

    console.log("Se realizo un pedido al servidor");
    response.end("Hola Mundo");
});

const PUERTO = 8080;

server.listen(PUERTO, ()=>{
    console.log("El servidor no se que 8080")
})