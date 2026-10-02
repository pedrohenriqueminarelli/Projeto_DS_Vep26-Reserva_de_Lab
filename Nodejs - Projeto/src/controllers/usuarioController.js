import usuario from '../models/Usuario.js';
    
class usuarioController {
    static async listarUsuarios (req, res) {
        try {
            const listaUsuarios = await usuario.buscarTodos();
            res.status(200).json(listaUsuarios);
        }
        catch (error) {
            res.status(500).json({message: `${error} - falha na requisição`});
        }
    }

    static async listarUsuariosPorId (req, res) {
        const idProcurado = req.params.id;
        try {
            const listaUsuarios = await usuario.buscaUsuarioPorId(idProcurado);
            res.status(200).json(listaUsuarios);
        }
        catch (error) {
            res.status(500).json({message: `${error} - falha na requisição`});
        }
    }

    static async removerUsuario (req, res) {
        const idProcurado = req.params.id;
        try {
            const result = await usuario.removerUsuario(idProcurado);
            if (result.rowsAffected[0] == 0) throw new Error ("ID inválido!");
            res.status(200).json({message: "Removido com sucesso!"});
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

    static async alterarUsuario (req, res) {
        const idusuario = req.params.id;
        const usuarioNovo = req.body;
        try {
            const result = await usuario.alterarUsuario(idusuario,usuarioNovo);
            if (result.rowsAffected[0] == 0) throw new Error ("ID inválido!");
            res.status(200).json({message: "Alterado com sucesso!"});
        }
        catch (error) {
            res.status(500).json({message: `${error} - falha na requisição`});
        }
    }
}

export default usuarioController;