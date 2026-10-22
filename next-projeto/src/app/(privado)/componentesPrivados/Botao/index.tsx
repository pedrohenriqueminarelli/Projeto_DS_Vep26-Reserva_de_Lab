interface BotaoProps{
    type?:"submit"|"button"|"reset";
    onClick: () => void;
    texto:string;
}

export function Botao({type="submit", onClick, texto}: BotaoProps){
    return(
        <button type={type} className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200" onClick={onClick}>{texto}</button>
    )
}