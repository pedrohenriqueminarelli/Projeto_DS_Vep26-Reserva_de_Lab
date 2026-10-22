import conectaBD from "../config/dbConnect.js";

class Reserva{
    constructor(idUsuario, codStatus, codRecurso, dataInicial, dataFinal, horaInicial, horaFinal){
        this.idUsuario=idUsuario;
        this.codStatus=codStatus;
        this.codRecurso=codRecurso;
        this.dataInicial=dataInicial;
        this.dataFinal=dataFinal;
        this.horaInicial=horaInicial;
        this.horaFinal=horaFinal
    }

    static async buscarTodas(){
        try{
            const conexao= await conectaBD();
            const result= await conexao.query(`SELECT codreserva, idusuario, codstatus, codrecurso,
            CONVERT(varchar(10), dataInicial, 103) AS dataInicial,
            CONVERT(varchar(10), dataFinal, 103)   AS dataFinal,
            CONVERT(varchar(5), horaInicial, 108)  AS horaInicial,
            CONVERT(varchar(5), horaFinal, 108)    AS horaFinal,
            FORMAT(dtCriacao, 'dd/MM/yyyy HH:mm')  AS dtCriacao
            FROM RSVLAB.reserva`);
            return result.recordset;
        }catch(erro){
            throw new Error(`Erro na consulta ao BD, ${erro}`);
        }
    }

    static async inserirReserva(reserva){
        try{
            const conexao= await conectaBD();
            const result= await conexao.query`INSERT INTO RSVLAB.reserva (idUsuario, codStatus, codRecurso, dataInicial, dataFinal, horaInicial, horaFinal) values(${reserva.idUsuario}, ${reserva.codStatus}, ${reserva.codRecurso}, ${reserva.dataInicial}, ${reserva.dataFinal}, ${reserva.horaInicial}, ${reserva.horaFinal})`;
            return result
        }catch(erro){
            throw new Error(`Erro na consulta ao BD, ${erro}`)
        }
    }

    static async verificadorDeConflito(reserva){
        try{
            const conexao = await conectaBD();
            const result = await conexao.query`SELECT codReserva FROM RSVLAB.reserva WHERE codRecurso=${reserva.codRecurso} and horaInicial<${reserva.horaFinal} and horaFinal>${reserva.horaInicial} and dataInicial<=${reserva.dataFinal} and dataFinal>= ${reserva.dataInicial} `;
            return result.recordset;
        }catch(erro){
            throw new Error(`Erro na consulta ao banco de dados - ${erro}`);
        }
    }
    static async horaAtual(){
        try{
            const conexao = await conectaBD();
            const result = await conexao.query`SELECT FORMAT(GETDATE(), 'yyyy-MM-dd') AS data, FORMAT(GETDATE(), 'HH:mm') AS hora`;
            return result.recordset[0];
        }
        catch (erro){
            throw new Error(`Erro na consulta ao BD, ${erro}`)
        }
    }
    static async verificaOcorrenciaDeTempo(reserva){
        try{
            const conexao = await conectaBD();
            const result = await conexao.query`SELECT CASE WHEN CONVERT(DATETIME, ${reserva.dataInicial} + 'T' + ${reserva.horaInicial}, 126) <= GETDATE() THEN 1 ELSE 0 END AS passado`;
            return result.recordset[0];
        }
        catch(erro){
            throw new Error(`Erro na consulta ao BD, ${erro}`)
        }
    }
    static async pegarOsDadosDaReserva(){
        const conexao = await conectaBD();
        const result = await conexao.query`SELECT codReserva, idUsuario, codStatus, codRecurso, dataInicial, dataFinal, horaInicial, horaFinal, rec.nome as NomeRecurso, r.codrecurso FROM RSVLAB.recusro as rec RSVLAB.codrecurso as r 
        INNER JOIN `
    }
}
export default Reserva;