import express from 'express';
import usuarioController from '../controllers/usuarioController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const routes = express.Router();

routes.get("/usuarios",authMiddleware, usuarioController.buscarTodos);
routes.post("/usuarios", usuarioController.inserirUsuario);

export default routes;