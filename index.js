require("dotenv").config();
const fetch = require("node-fetch");
const express = require("express");

const appKey = process.env.APP_KEY;
const appId = process.env.APP_ID;
const urlLineas = `${process.env.API_URL}?app_key=${appKey}&app_id=${appId}`;
const urlParadas = (linea) =>
  `${process.env.API_URL}${linea}/estacions?app_key=${appKey}&app_id=${appId}`;

const app = express();
app.use(express.json());
const server = app.listen(4000, () => {
  console.log("Cargando Servidor");
});

server.on("error", (error) => {
  console.log(error);
});

const getParadas = async (linea) => {
  const respuestas = await fetch(urlParadas(linia));
  const paradas = await respuestas.json();
  return respuestas;
};
