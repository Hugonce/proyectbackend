
const PUERTO = 8080;

const express = require("express");

const app = express();

app.get("/",(req, res)=>{
    res.send("Mi respuetita");
})

app.get("/products",(req, res)=>{
    res.send("Productos");
})

app.listen(PUERTO,()=>{
    console.log("escuchando bla bla")
})