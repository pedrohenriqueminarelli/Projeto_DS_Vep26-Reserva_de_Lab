import express from 'express';
import recursoController from '../controllers/recursoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const routes = express.Router();

routes.get("/recursos",authMiddleware, recursoController.buscarTodos);
routes.post("/recursos",authMiddleware, recursoController.inserirRecurso);

export default routes;