import conectaBD from "../config/dbConnect.js";

/*class Usuario {
    constructor(id, nome, codcurso) {
        this.id = id;
        this.nome = nome;
        this.codcurso = codcurso;
    }

    static async buscarTodos() {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query("SELECT * from nodejs.curso");
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }
    static async buscaUsuarioPorId(idCurso) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`SELECT * from nodejs.curso WHERE id = ${idCurso}`);
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }
    static async removerUsuario(idCurso) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`DELETE from nodejs.curso WHERE id = ${idCurso}`);
            return result;
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }
    static async inserirUsuario(curso) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`INSERT into nodejs.curso (nome, codcurso) VALUES ('${curso.nome}', ${curso.codcurso})`);
            return result.recordset;
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }
    static async alterarUsuario(id,curso) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`UPDATE nodejs.curso SET nome='${curso.nome}', codcurso=${curso.codcurso} WHERE id=${id}`);
            if (result.rowsAffected[0] == 0) throw new Error ("ID inválido!");
            return result;
        }
        catch (error) {
            throw new Error(`Erro na consulta ao BD: ${error}`);
        }
    }
}*/

export default Usuario;