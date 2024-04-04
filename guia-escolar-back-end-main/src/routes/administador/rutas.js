const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  //Envia json infoPuntos.json el objeto "rutas" como respuesta
  const infoPuntos = require("./../../../infoPuntos.json");
  res.json(infoPuntos.rutas);
});

//Metodo para agregar una nueva ruta
router.post("/agregar", (req, res) => {
  //Obtiene el objeto "rutas" del archivo infoPuntos.json
  const infoPuntos = require("./../../../infoPuntos.json");
  const rutas = infoPuntos.rutas;
  //Obtiene el objeto "ruta" que se envia desde el front-end
  const nuevaRuta = req.body;
  console.log(nuevaRuta);
  //Agrega el objeto "ruta" al objeto "rutas"
  rutas.push(nuevaRuta);
  //Escribe el objeto "rutas" en el archivo infoPuntos.json
  const fs = require("fs");
  fs.writeFile(
    "./infoPuntos.json",
    JSON.stringify(infoPuntos, null, 2),
    (err) => {
      if (err) throw err;
      console.log("Archivo modificado");
    }
  );
  //responder codigo 200
  res.status(200).send("Ruta agregada");
});

//Metodo para eliminar una ruta
router.delete("/eliminar/:id", (req, res) => {
  //Obtiene el id de la ruta a eliminar
  const id = req.params.id;
  //Obtiene el archivo infoPuntos.json
  const infoPuntos = require("./../../../infoPuntos.json");
  //Filtra el arreglo de tarjetas para eliminar la tarjeta con el id recibido
  infoPuntos.rutas = infoPuntos.rutas.filter((ruta) => {
    return ruta.id !== id;
  });
  //Escribe el archivo infoPuntos.json sin la tarjeta eliminada
  const fs = require("fs");
  fs.writeFile(
    "./infoPuntos.json",
    JSON.stringify(infoPuntos),
    "utf8",
    (err) => {
      if (err) {
        console.log(err);
        //Envia un codigo de error 500
        res.status(500).send("Error al eliminar ruta");
      }
    }
  );
  //Envia un codigo 200 como respuesta
  res.sendStatus(200);
});

//Metodo para obtener una ruta especifica
router.get("/:id", (req, res) => {
  //Obtiene el id de la ruta a obtener
  const id = req.params.id;
  //Obtiene el archivo infoPuntos.json
  const infoPuntos = require("./../../../infoPuntos.json");
  //Filtra el arreglo de rutas para obtener la ruta con el id recibido
  const ruta = infoPuntos.rutas.filter((ruta) => {
    return ruta.id === id;
  });
  //Si la ruta existe, la envia como respuesta, de lo contrario envia un codigo 404
  if (ruta.length > 0) {
    res.json(ruta[0]);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
