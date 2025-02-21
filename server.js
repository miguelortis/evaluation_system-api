const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

// Configurar dotenv para leer variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Importar rutas
const routes = require("./routes");

// Usar rutas
app.use("/api", routes);

connectDB();

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
