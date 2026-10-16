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
}
export default Reserva;