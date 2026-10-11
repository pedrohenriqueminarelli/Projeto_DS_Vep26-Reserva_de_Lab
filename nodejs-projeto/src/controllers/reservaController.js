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
    static async inserirReserva(req, res){

        const NovaReserva= req.body;
        try{
            await Reserva.inserirReserva(NovaReserva);
            res.status(201).json({ message: "Reserva feita com sucesso!"})
        }catch(erro){
            res.status(500).json({message: `${erro} - Falha na requisição!`})
        }
    }
}
export default reservaController;