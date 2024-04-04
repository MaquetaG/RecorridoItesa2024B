const express = require("express");
const app = express();
const morgan = require("morgan");

//Configuraciones
app.set("port", process.env.PORT || 3001);
app.set("json spaces", 2);

//Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Routes

//Para las tarjetas
app.use(require("./routes/index"));

//Para las rutas y los puntos
app.use("/admin/rutas", require("./routes/administador/rutas"));
app.use("/admin/tarjetas", require("./routes/administador/tarjetas"));
app.use("/mostrarRutas", require("./routes/mostrarRutas/mostrarRutas"));

//Para el generador de QR
app.use("/generadorQR", require("./routes/administador/generadorQR"));

//Para el renderizado de la AR
app.use("/ar/renderizado", require("./routes/ar/renderizado"));

//Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});
