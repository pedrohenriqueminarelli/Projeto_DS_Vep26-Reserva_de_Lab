import express from 'express';
import usuarioController from '../controllers/usuarioController.js';

const routes = express.Router();

routes.get("/usuarios", usuarioController.buscarTodos);
routes.post("/usuarios", usuarioController.inserirUsuario);
routes.post("/login", usuarioController.login)

export default routes;