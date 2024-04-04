const { Router } = require("express");
const router = Router();

//Raiz
router.get("/", (req, res) => {
  //Envia json infoPuntos.json como respuesta
  const infoPuntos = require("./../../infoPuntos.json");
  res.json(infoPuntos);
});

//Get devuelve el estado de la tarjeta "Tarjeta N" que esta en el achivo infoPuntos.json
router.get("/Tarjeta/:id", (req, res) => {
  const { id } = req.params;
  //Recuperar el archivo infoPuntos.json
  const infoPuntos = require("./../../infoPuntos.json");
  //Recuperar de el listado de tarjetas el objeto que tenga el id que se envio
  const tarjeta = infoPuntos.tarjetas.find((tarjeta) => tarjeta.id == id);
  //Escribir en json ultima fecha de consulta
  tarjeta.ultimaConsulta = new Date();
  //Guardar el json con la ultima consulta
  const fs = require("fs");
  fs.writeFile(
    "./../../infoPuntos.json",
    JSON.stringify(infoPuntos),
    "utf8",
    function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
      console.log("JSON file has been saved.");
    }
  );
  //Retornar el estado de la tarjeta
  console.log(tarjeta.propiedades.estado);
  res.end(tarjeta.propiedades.estado);
});

//Post cambia el estado de la tarjeta "Tarjeta N" que esta en el achivo infoPuntos.json
router.get("/Tarjeta/:id/on", (req, res) => {
  const { id } = req.params;
  //Recuperar el archivo infoPuntos.json
  const infoPuntos = require("./../../infoPuntos.json");
  //Recuperar de el listado de tarjetas el objeto que tenga el id que se envio
  const tarjeta = infoPuntos.tarjetas.find((tarjeta) => tarjeta.id == id);
  //Cambiar el estado de la tarjeta
  tarjeta.propiedades.estado = "1";
  //Guardar el archivo infoPuntos.json
  const fs = require("fs");
  fs.writeFile(
    "./../../infoPuntos.json",
    JSON.stringify(infoPuntos),
    "utf8",
    function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
      console.log("JSON file has been saved.");
    }
  );
  //Apagar de forma asincrona el led de la tarjeta
  setTimeout(function () {
    tarjeta.propiedades.estado = "0";
    //Guardar el archivo infoPuntos.json
    const fs = require("fs");
    fs.writeFile(
      "./../../infoPuntos.json",
      JSON.stringify(infoPuntos),
      "utf8",
      function (err) {
        if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
        }
        console.log("JSON file has been saved.");
      }
    );
  }, 15000);
  //Retornar el estado de la tarjeta
  res.end(tarjeta.propiedades.estado);
});

//Post cambia el estado de la tarjeta "Tarjeta N" que esta en el achivo infoPuntos.json
router.get("/Tarjeta/:id/off", (req, res) => {
  const { id } = req.params;
  //Recuperar el archivo infoPuntos.json
  const infoPuntos = require("./../../infoPuntos.json");
  //Recuperar de el listado de tarjetas el objeto que tenga el id que se envio
  const tarjeta = infoPuntos.tarjetas.find((tarjeta) => tarjeta.id == id);
  //Cambiar el estado de la tarjeta
  tarjeta.propiedades.estado = "0";
  //Guardar el archivo infoPuntos.json
  const fs = require("fs");
  fs.writeFile(
    "./../../infoPuntos.json",
    JSON.stringify(infoPuntos),
    "utf8",
    function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
      console.log("JSON file has been saved.");
    }
  );
  //Retornar el estado de la tarjeta
  res.end(tarjeta.propiedades.estado);
});

router.get("/estado", (req,res) =>{
  const infoPuntos = require("./../../infoPuntos.json");
  //Obtener de todas las tarjetas registradas la ultima fecha de consulta y enviarlas como respuesta
  //"Tarjeta N": (ultima consulta)
  res.json(infoPuntos.tarjetas.map(tarjeta => `${tarjeta.id}: (${tarjeta.ultimaConsulta})`));
}); 


module.exports = router;
