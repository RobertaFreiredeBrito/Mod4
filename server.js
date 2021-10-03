require("dotenv").config();
const express = require("express");
const routes = require ("./routes/routes")
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);


app.listen(port, () => console.info(`Servidor rodando em http://localhost:${port}`)
)