import express from 'express';
import recursoController from '../controllers/recursoController.js';

const routes = express.Router();

routes.get("/recursos", recursoController.buscarTodos);
routes.post("/recursos", recursoController.inserirRecurso);

export default routes;