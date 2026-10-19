import conectaBD from "../config/dbConnect.js";
import bcrypt from "bcryptjs";
class Usuario {
    constructor(email, senhaHash, cpf, nome, nascimento, celular) {
        this.email = email;
        this.senhaHash = senhaHash;
        this.cpf = cpf;
        this.nome = nome;
        this.nascimento = nascimento;
        this.celular = celular;
    }

    static async buscarTodos() {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query("SELECT idusuario, nome, email, cpf, nascimento,celular, dataCadastro from RSVLAB.usuario ");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }

    static async inserirUsuario(usuario) {
        try {
            const salt = await bcrypt.genSalt(10);
            const senhaHash = await bcrypt.hash(usuario.senha,salt);
            const conexao = await conectaBD();
            const result = await conexao.query `INSERT into RSVLAB.usuario (email, senhaHash, cpf, nome, nascimento, celular) VALUES (${usuario.email}, ${senhaHash}, ${usuario.cpf}, ${usuario.nome}, ${usuario.nascimento}, ${usuario.celular})`;
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }
    static async login(email){
        try{
            const conexao= await conectaBD();
            const result = await conexao.query`SELECT email, senhaHash, idUsuario, nome, celular FROM RSVLAB.usuario as u  WHERE u.email=${email}`;
            return result.recordset[0];
        }
        catch(erro){
            throw new Error(`Erro na consulta ao BD  ${erro}`)
        }
    }
    static async registrarAcesso(idUsuario){
        try{
            const conexao= await conectaBD();
            await conexao.query`INSERT INTO RSVLAB.ACESSO(idUsuario) VALUES (${idUsuario})`;
            await conexao.query`UPDATE RSVLAB.usuario SET dataAcesso = SYSDATETIME() WHERE idUsuario = ${idUsuario}`;
        }catch(erro){
            throw new Error (`Erro ao registrar acesso: ${erro}`);
        }
    }
}

export default Usuario;