interface BotaoProps{
    type?:string;
    name:string;

}

export function botao({type="submit", name}: BotaoProps){
    return(
        <button {type}>{name}</button>
    )
}