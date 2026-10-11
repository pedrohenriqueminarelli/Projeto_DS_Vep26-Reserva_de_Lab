import express from 'express';
import reservaController from '../controllers/reservaController.js';

const routes = express.Router();

routes.get("/reservas", reservaController.buscarTodas);
routes.post("/reservas", reservaController.inserirReserva);

export default routes