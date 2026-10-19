import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import usuario from '../models/Usuario.js';

class usuarioController {
    static async buscarTodos (req, res) {
        try {
            const buscarTodos = await usuario.buscarTodos();
            res.status(200).json(buscarTodos);
        }
        catch (error) {
            res.status(500).json({message: `${error} - falha na requisição!`});
        }
    }

    static async inserirUsuario (req, res) {

        const usuarioNovo = req.body;
        try {
            await usuario.inserirUsuario(usuarioNovo);
            res.status(200).json({message: "Inserido com sucesso!"});
        }
        catch (error) {
            res.status(500).json({message: `${error} - falha na requisição!`});
        }
    }
    static async login(req, res){
        try{
            const EmailBuscado= await usuario.login(req.params.email);
            if(!EmailBuscado){
                return res.status(404).json({message:"usuario não encontrado" })
            }

            await res.status(200).json(EmailBuscado);
        }
        catch(erro){
            res.status(500).json({message: `${erro} - falha na requisição!`})
        }
    }
}

export default usuarioController;