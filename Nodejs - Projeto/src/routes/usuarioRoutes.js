import express from 'express';
import usuarioController from '../controllers/usuarioController.js';

const routes = express.Router();

routes.get("/usuarios", usuarioController.listarUusuarios);
routes.get("/usuarios/:id", usuarioController.listarUusuariosPorId);
routes.delete("/usuarios/:id", usuarioController.removerUusuario);
routes.post("/usuarios", usuarioController.inserirUusuario);
routes.patch("/usuarios/:id", usuarioController.alterarUusuario);

export default routes;