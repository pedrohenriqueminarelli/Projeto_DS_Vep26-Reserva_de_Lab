import express from 'express';
import reservaController from '../controllers/reservaController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const routes = express.Router();

routes.get("/reservas",authMiddleware, reservaController.buscarTodas);
routes.post("/reservas",authMiddleware, reservaController.inserirReserva);
routes.get("/hora",authMiddleware, reservaController.buscarHorario);
routes.get("/reservas/detalhadas",authMiddleware, reservaController.pegarOsDadosDaReserva);
routes.get("/reservas/status", reservaController.pegarStatus)
routes.get("/reservas/minhas",authMiddleware, reservaController.pegarAsMinhasReservas);


export default routes