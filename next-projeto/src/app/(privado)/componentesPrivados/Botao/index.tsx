import styles from "../../../styles/form.module.css"

interface BotaoProps{
    type?:"submit"|"button"|"reset";
    onClick?: () => void;
    texto:string;
}

export function Botao({type="submit", onClick, texto}: BotaoProps){
    return(
        <button type={type} className={styles.botao} onClick={onClick}>{texto}</button>
    )
}