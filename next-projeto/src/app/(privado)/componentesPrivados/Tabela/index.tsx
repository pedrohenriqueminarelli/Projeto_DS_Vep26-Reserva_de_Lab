import styles from "../../../styles/table.module.css"

interface TabelaProps{
    titulo?:string;
    colunas: {chave:string; titulo: string}[];
    linhas:Record<string, string| number>[];
    acoes?:(linha: )
}
export function Tabela({titulo, colunas, linhas}:TabelaProps){
    return(
        <div className={styles.table}>
            <h1>{titulo}</h1>
            <table>
                <thead>
                    <tr>
                    {
                        colunas.map((info)=>{
                            return <th className={styles.th} key={info.chave}>{info.titulo}</th>
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        linhas.map((linha, indice)=>(
                             <tr key={indice}>
                                {colunas.map((info)=>(
                                    <td key={info.chave}>{linha[info.chave]}</td>
                                ))}
                                 </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}