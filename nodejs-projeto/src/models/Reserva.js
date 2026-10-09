import conectaBD from "../config/dbConnect.js";

class Reserva{
    constructor(codReserva, idUsuario, codStatus, codRecurso, dataInicial, dataFinal, horaInicial, horaFinal, dataCriacao){
        this.codReserva=codReserva;
        this.idUsuario=idUsuario;
        this.codStatus=codStatus;
        this.codRecurso=codRecurso;
        this.dataInicial=dataInicial;
        this.dataFinal=dataFinal;
        this.horaInicial=horaInicial;
        this.horaFinal=horaFinal
        this.dataCriacao=dataCriacao;
    }

    static async buscarTodas(){
        try{
            const conexao= await conectaBD();
            const result= await conexao.query("select * from RSVLAB.reserva");
            return result;
        }catch(erro){
            throw new Error(`Erro na consulta ao BD, ${erro}`);
        }
    }

    static async inserirReserva(reserva){
        try{
            const conexao= await conectaBD();
        const result= await conexao.query`INSERT INTO RSVLAB.reserva (idUsuario, codStatus, codRecurso, dataInicial, dataFinal, horaInicial, horaFinal) values(${reserva.codRReserva}, ${reserva.idUsuario}, ${reserva.codStatus}, ${reserva.codRecurso}, ${reserva.dataInicial}, ${reserva.dataFinal}, ${reserva.horaInicial}, ${reserva.horaFinal}, ${reserva.dataCriacao})`;
        return result
        }catch(erro){
            throw new Error(`Erro na consulta ao BD, ${erro}`)
        }
    }
}
export default Reserva;