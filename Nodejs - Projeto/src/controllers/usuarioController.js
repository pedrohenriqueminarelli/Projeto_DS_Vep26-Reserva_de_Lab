import usuario from '../models/Usuario.js';
    
class usuarioController {

    static async buscarTodos (req, res) {
        try {
            const buscarTodos = await aluno.buscarTodos();
            res.status(200).json(buscarTodos);
        }
        catch (error) {
            res.status(500).json({message: `${error} - falha na requisição`});
        }
    }

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
}

export default usuarioController;