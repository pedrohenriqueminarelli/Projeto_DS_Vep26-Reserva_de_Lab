import 'dotenv/config';
import app from './src/app.js';

const porta = process.env.PORTA;

// colocar servidor para atender requisições
app.listen(porta, () => console.log(`API funcionando!\nServidor rodando em: http://localhost:${porta}`));

