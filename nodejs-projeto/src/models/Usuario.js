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
            const senhaHash = await bcrypt.hash(usuario.senha,10);
            const conexao = await conectaBD();
            const result = await conexao.query `INSERT into RSVLAB.usuario (email, senhaHash, cpf, nome, nascimento, celular) VALUES (${usuario.email}, ${senhaHash}, ${usuario.cpf}, ${usuario.nome}, ${usuario.nascimento}, ${usuario.celular})`;
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }
}

export default Usuario;