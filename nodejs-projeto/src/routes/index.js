import express from 'express';
import usuario from './usuarioRoutes.js';
import recurso from './recursoRoutes.js';

const routes = (app) => {
    //route e uma função pronta que vem dentro do app do express
    // a barra o corresponde ao local host 
    //req é igual ao pedido que chegou, res é igual resposta do servidor 
    //mesmo não usando o req, precisa colocalo como parâmetro, pois o servidor manda os dois como parâmetro primeiro o req e depois o res. Caso você não usar o (req,res) e usar (res) o req vai vir no lugar do res, pois o servidor sempre manda os dois nessa ordem.
    app.route("/").get((req,res) => res.status(200).json({message: "API rodando"}));

    app.use(express.json(), usuario);
    app.use(express.json(), recurso);
}

export default routes;