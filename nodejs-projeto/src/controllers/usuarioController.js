import jwt from 'jsonwebtoken';
import usuario from '../models/Usuario.js';

class usuarioController {
    static login = async(req, res)=>{
        const {email, senhaHash} = req.body;
        if(!email || !senha){
            return res.status(400).json({message:"E-mail e senhas são obrigatórios."})
        }
        try{
            const 
        }
    } 
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
    static async buscarPorEmail(req, res){
        try{
            const EmailBuscado= await usuario.buscarPorEmail();
            await res.status(200).json(EmailBuscado);
        }
        catch(erro){
            res.status(500).json({message: `${erro} - falha na requisição!`})
        }
    }
}

export default usuarioController;