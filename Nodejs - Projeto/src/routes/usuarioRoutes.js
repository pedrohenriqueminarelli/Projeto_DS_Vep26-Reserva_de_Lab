import express from 'express';
import usuarioController from '../controllers/usuarioController.js';

const routes = express.Router();

routes.post("/usuarios", usuarioController.inserirUsuario);

export default routes;