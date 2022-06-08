const express = require('express');
const fs =  require('fs');

class Contenedor{
  constructor(pArchivo){
    this.archivo = pArchivo;
  }

  async getAll(){
    try{
      const content = await fs.promises.readFile(this.archivo, 'utf-8');
      const contentObject = JSON.parse(content);

      return contentObject;
    } catch(err){
      console.log(err);
    }
  }

  async getRandom(){
    try{
      const content = await fs.promises.readFile(this.archivo, 'utf-8');
      const contentObject = JSON.parse(content);


      let randomNumber = Math.floor(Math.random() * 3);

      let element = contentObject.find(({id}) => id == randomNumber );
      return element;

    } catch(err){
      console.log(err);
    }
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
