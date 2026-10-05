import usuario from '../models/Usuario.js';
    
class usuarioController {

    static async inserirUsuario (req, res) {
        const usuarioNovo = req.body;
        try {
            await usuario.inserirUsuario(usuarioNovo);
            res.status(200).json({message: "Inserido com sucesso!"});
        }
        catch (error) {
            res.status(500).json({message: `${error} - falha na requisição`});
        }
    }
    static async inserirRecurso(req, res){
        const novoRecurso = req.body;
    }
}

export default usuarioController;