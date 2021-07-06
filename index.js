require("dotenv").config();
const fetch = require("node-fetch");
const express = require("express");

const appKey = process.env.APP_KEY;
const appId = process.env.APP_ID;
const urlLineas = `${process.env.API_URL}?app_key=${appKey}&app_id=${appId}`;
// const urlParadas =`${process.env.API_URL}${lineas}/estacions?app_key=${appKey}&app_id=${appId}`;

const app = express();
app.use(express.json());
app.use(express.static("./recursosEstaticos"))
const server = app.listen(4000, () => {
  console.log("SERVIDOR CARGADO!");
});


server.on("error", (error) => {
  console.log(error);
});
const getLineas = async () => {
  const resp = await fetch(urlLineas);
  const { features } = await resp.json();
  return features;
};
const getInfoLineas = async () => {
  const lineas = await getLineas();
  const guardaLineas = lineas.map((linea) => {
    const {properties:{ID_LINIA, NOM_LINIA, DESC_LINIA}} = linea;
    return {id: ID_LINIA};
  })
  console.log(guardaLineas);
  return guardaLineas;
};

app.get("/metro/lineas", async (re, resp, next) => {
  const response = await getInfoLineas();
  console.log(response);

})



// const getParadas = async () => {
//   const respuestas = await fetch();
//   const paradas = await respuestas.json();
//   return paradas;
// };
// module.exports = {
//   getLineas,
//   getParadas,
// };
const buscarLinea = (color, linea, features, errores) => {
  const lineaEncontrada = features.find(
    (lineaBuscada) =>
      lineaBuscada.properties.NOM_LINIA.toLowerCase() === linea.toLowerCase()
  );
   if (!lineaEncontrada) {
    if (errores) {
      console.log(`No existe la línea ${linea}.`);
    }
    process.exit(0);
  }
  imprimeInfoLinea(color, lineaEncontrada);
  return lineaEncontrada;
};