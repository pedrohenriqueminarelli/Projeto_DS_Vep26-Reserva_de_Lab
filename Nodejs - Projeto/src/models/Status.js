import conectaBD from "../config/dbConnect";
class Status{
    constructor(nome){
        this.nome=nome;
    }
    static async inserirStatus(status){
        try{
            const conexao= await conectaBD();
            const result= await conexao.query(`INSERT INTO RSVLAB.status(nome) VALUES('${status.nome}')`);
            return result;
        }catch(error){
            throw new Error(`Erro na consulta ao BD:${error}`);
        }
    }
}
export default Status;