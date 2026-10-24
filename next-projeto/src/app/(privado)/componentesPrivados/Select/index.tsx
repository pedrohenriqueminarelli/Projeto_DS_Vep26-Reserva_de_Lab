import styles from "../../../styles/form.module.css"

interface SelectProps{
    textOption:string;
    label: string;
    name: string;
    value:string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    required?: boolean; 
    opcoes: {valor: string; texto: string }[];
}

export function Select({label, name, value, required=false, onChange, opcoes, textOption}:SelectProps){
    return(
        <label className="block text-sm font-medium text-gray-700 mb-2" >
            {label}
            <select name={name} value={value} onChange={onChange} required={required}
            className={styles.campo}>
                 <option value="" disabled>{textOption}</option>
                {
                    opcoes.map((opcao)=>{
                        return <option value={opcao.valor} key={opcao.valor}>
                                {opcao.texto}
                            </option>
                    })
                }
            </select>
        </label>
    )
}