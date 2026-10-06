import conectaBD from "../config/dbConnect.js";
class Recurso{
    constructor(tipo, nome, capacidade, localizacao){
        this.tipo=tipo;
        this.nome=nome;
        this.capacidade=capacidade;
        this.localizacao=localizacao;
    }
    static async inserirRecurso(recurso){
        try{
            const conexao = await conectaBD();
            const result = await conexao.query(`INSERT INTO RSVLAB.recurso(tipo, nome, capacidade, localizacao) VALUES('${recurso.tipo}','${recurso.nome}','${recurso.capacidade}','${recurso.localizacao}')`)
            return result; 
        }catch(error){
            throw new Error(`Erro na consulta ao BD:${error}`);
        }
    }
}
export default Recurso;