import jwt from 'jsonwebtoken';
const authMiddleware = (req, res, next) =>{
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message:"Acesso negado. Token não fornecido!"});
    }

    const partes = authHeader.split(' ');

    if(partes.length !== 2 || partes[0]!== 'Bearer'){
        return res.status(401).json({message: "Erro no formato do token. use: bearer <token>"});
    }
    const token = partes[1];
    const secret = process.env.JWT_SECRET;

    try{
        const decoded = jwt.verify(token, secret);
        req.idUsuario = decoded.idUsuario;
        return next();
    }catch(erro){
        return res.status(401).json({message:"token inválido ou expirado!"});
    }
};
export default authMiddleware;