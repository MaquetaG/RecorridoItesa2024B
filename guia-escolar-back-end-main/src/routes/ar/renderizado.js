const { Router } = require("express");
const router = Router();
const path = require("path");
const fs = require("fs");
//En este caso, el archivo html se encuentra en la carpeta public, la petición se hace a la ruta /ar/renderizado y devuelve el archivo html y sus recursos (css, js, img) que se encuentran en la carpeta public/assets
router.get("/IZQ", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/izquierda.html"));
});
router.get("/DER", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/derecha.html"));
});
router.get("/REC", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/frente.html"));
});
router.get("/FIN", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/llegaste.html"));
});
router.get("/assets/:file", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/assets/" + req.params.file));
});
module.exports = router;
