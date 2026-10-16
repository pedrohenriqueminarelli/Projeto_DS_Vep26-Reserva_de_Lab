interface BotaoProps{
    type?:"submit"|"button"|"reset";
    texto:string;

}

export function Botao({type="submit", texto}: BotaoProps){
    return(
        <button type={type} className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200">{texto}</button>
    )
}