const express = require('express');
const fs =  require('fs');


class Contenedor{
  constructor(pArchivo){
    this.archivo = pArchivo;
  }

  async getAll(){
    const content = await fs.promises.readFile(this.archivo, 'utf-8');
    const contentObject = JSON.parse(content);

    return contentObject;
  }

  async getRandom(){
    const content = await fs.promises.readFile(this.archivo, 'utf-8');
    const contentObject = JSON.parse(content);

    //console.log(Math.floor(Math.random() * 3));
    let randomNumber = Math.floor(Math.random() * 3);
    console.log(randomNumber);
    let element = contentObject.find(({id}) => id == randomNumber );
    return element;
  }
}

const miContenedor = new Contenedor("./productos.txt");

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
})

server.on("error", error => console.log(`Error en servidor: ${error}`));

app.get("/", (req,res) => {
  res.send("<h1>Bienvenido al servidor Express</h1>");
})

app.get("/productos", (req,res) => {
  const prueba = async() => {
    let objeto = await miContenedor.getAll();
    await console.log(objeto);
  }
  prueba();
  res.send("<h1>Estás en productos</h1>");
})

app.get("/productosRandom", (req,res) => {
  const prueba = async() => {
    let objeto = await miContenedor.getRandom();
    await console.log("soy un",objeto);
  }
  prueba();
  res.send("<h1>Estás en productosRandom</h1>");
})
