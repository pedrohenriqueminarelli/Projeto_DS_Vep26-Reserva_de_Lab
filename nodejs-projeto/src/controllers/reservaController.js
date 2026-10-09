import Reserva from "../models/Reserva.js";

class recursoController{

    static async buscarTodas(req, res){
        try{
            const todasAsReservas = await Reserva.buscarTodas();
            res.status(200).json(todasAsReservas);
        }catch(erro) {
            res.status(500).json({messege: `${erro} - falha na requisição!`})
        }
    }
    static async inserirReserva(req, res){

        const NovaReserva= req.body;
        try{
            await Reserva.inserirReserva(NovaReserva);
            res.status(200).json({ message: "Reserva feita com sucesso!"})
        }catch(erro){
            res.status(500).json({message: `${erro} - Falha na quisição!`})
        }
    }
}
export default ReservaController;