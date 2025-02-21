const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// Enable CORS with specific configuration
app.use(cors());

const routes = require("./routes");
app.use("/api", routes);

app.use(errorHandler);

connectDB();

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
