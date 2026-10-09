import express from 'express';
import reservaController from '../controllers/reservaController.js';

const routes = express.Router();

routes.get("/reserva", reservaController.buscarTodas);
routes.post("/reserva", reservaController.inserirReserva);

export default routes