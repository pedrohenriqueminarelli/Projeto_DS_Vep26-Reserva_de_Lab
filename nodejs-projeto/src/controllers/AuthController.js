import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

class AuthController{
    static login = async (req, res)=>{

        const { email, senha } = req.body;

        if(!email || !senha){
        return res.status(400).json({message:"E-mail e senhas são obrigatórios!"});
    }
    try{
        const usuarioEncontrado= await Usuario.login(email);
        if(!usuarioEncontrado){
            return res.status(401).json({message: "E-mail ou senha inválidos!"})
        }

        const senhaValida= await bcrypt.compare(senha, usuarioEncontrado.senhaHash);
        if (!senhaValida){
            return res.status(401).json({message:"E-mail ou senha inválidos"})
        } 

        await Usuario.registrarAcesso(usuarioEncontrado.idUsuario);

        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(
            {
                idUsuario: usuarioEncontrado.idUsuario,
                email: usuarioEncontrado.email
            },secret,
            {expiresIn: '8h'}
        );
        return res.status(200).json({
            message: "login realizado com sucesso!",
            token: token,
            usuario:{
                idUsuario : usuarioEncontrado.idUsuario,
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email,
                celular: usuarioEncontrado.celular
            }
        })
    }catch(erro){
        return res.status(500).json({message:`${erro}- falha no login`});
    }
    }
    
}
export default AuthController;