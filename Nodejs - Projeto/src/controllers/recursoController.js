import recurso from '../models/Recurso.js';
    
class recursoController {

    static async inserirRecurso (req, res) {
        const recursoNovo = req.body;
        try {
            await recurso.inserirRecurso(recursoNovo);
            res.status(200).json({message: "Inserido com sucesso!"});
        }
        catch (error) {
            res.status(500).json({message: `${error} - falha na requisição`});
        }
    }
}

export default recursoController;