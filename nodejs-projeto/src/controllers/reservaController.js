import Reserva from "../models/Reserva.js";

class reservaController{

    static async buscarTodas(req, res){
        try{
            const todasAsReservas = await Reserva.buscarTodas();
            res.status(200).json(todasAsReservas);
        }catch(erro) {
            res.status(500).json({message: `${erro} - falha na requisição!`})
        }
    }

    static async buscarHorario(req, res){
        try{
            const horariobd = await Reserva.horaAtual();
            res.status(200).json(horariobd);
        }catch(erro) {
            res.status(500).json({message: `${erro} - falha na requisição!`})
        }
    }

    static async inserirReserva(req, res){

        const NovaReserva= req.body;
        try{
            const conflito = await Reserva.verificadorDeConflito(NovaReserva);
            if(conflito.length>0){
                return res.status(409).json({message:"Já existe uma reserva feita nesse horário"})
            }
            const check = await Reserva.verificaOcorrenciaDeTempo(NovaReserva);
            if (check.passado === 1) {
                return res.status(400).json({ erro: "Não é possível reservar em horário que já passou" });
            }
            await Reserva.inserirReserva(NovaReserva);
            res.status(201).json({ message: "Reserva feita com sucesso!"})
        }catch(erro){
            res.status(500).json({message: `${erro} - Falha na requisição!`})
        }
    }
    static async pegarOsDadosDaReserva(req, res){
        try{
            const DadosDaReserva = await Reserva.pegarOsDadosDaReserva();
            res.status(200).json(DadosDaReserva);
        }catch(erro){
            res.status(500).json({message: `${erro} - Falha na requisição!`})
        }
    }
    static async pegarAsMinhasReservas(req, res){
        try{
            const MinhasReservas = await Reserva.pegarAsMinhasReservas();
            res.status(200).json(MinhasReservas);
        }catch(erro){
            res.status(500).json({message: `${erro} - Falha na Requisição!`})
        }
    }
}
export default reservaController;