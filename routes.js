const express = require('express');
const routes = express.Router();

const cadastroControllers = require("../cadastroControllers");

routes.get("/cadastro", cadastroControllers.getAll);
routes.get("/cadastro/:id", clienteDataBase.validaID, cadastroControllers.getById);
routes.post("/cadastro", cadastroControllers.create);
routes.put("/cadastro/:id", cadastroDataBase.validaID, cadastroControllers.update);
routes.delete("/cadastro/:id", cadastroDataBase.validaID, cadastroControllers.del);
routes.get("/filter", cadastroControllers.filter );

module.exports = routes