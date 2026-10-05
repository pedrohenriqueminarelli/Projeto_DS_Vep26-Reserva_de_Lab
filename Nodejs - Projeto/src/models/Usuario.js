import conectaBD from "../config/dbConnect.js";

class Usuario {
    constructor(email, senhaHash, cpf, nome, nascimento, celular) {
        this.email = email;
        this.senhaHash = senhaHash;
        this.cpf = cpf;
        this.nome = nome;
        this.nascimento = nascimento;
        this.celular = celular;
    }

    static async inserirUsuario(Usuario) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`INSERT into RSVLAB.usuario (email, senhaHash, cpf, nome, nascimento, celular) VALUES ('${Usuario.senhaHash}', ${Usuario.cpf}', ${Usuario.nome}', ${Usuario.nascimento}', ${Usuario.celular})`);
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }
}

export default Usuario;