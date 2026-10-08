import 'dotenv/config';
import express from 'express';
import routes from './routes/index.js';
import cors from 'cors'


// configurações
//express cria um servidor novo e guarda em app
const app = express()
app.use(cors());
//serve para instalar um ajudante no servidor que lê o json e traduz para lermos no req.boddy
app.use(express.json());
//passo o app(o servidor) para routes 
routes(app);

export default app;