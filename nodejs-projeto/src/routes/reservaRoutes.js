import express from 'express';
import reservaController from '../controllers/reservaController.js';

const routes = express.Router();

routes.get("/reservas", reservaController.buscarTodas);
routes.post("/reservas", reservaController.inserirReserva);
routes.get("/hora", reservaController.buscarHorario);
routes.get("/reservas/detalhadas", reservaController.pegarOsDadosDaReserva);
routes.get("/reservas/:id", reservaController.pegarAsMinhasReservas);

export default routes