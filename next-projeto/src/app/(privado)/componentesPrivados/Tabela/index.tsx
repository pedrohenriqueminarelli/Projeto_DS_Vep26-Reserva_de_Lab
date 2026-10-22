interface TabelaProps{
    titulo?:string;
    colunas: {chave:string; titulo: string}[];
    linhas:Record<string, string| number>[];
}
export function Tabela({titulo, colunas, linhas}:TabelaProps){
    return(
        <div>
            <h1>{titulo}</h1>
            <table >
                <thead>
                    {
                        colunas.map((info)=>{
                            return <th key={info.chave}>{info.titulo}</th>
                        })
                    }
                </thead>
                <tbody>
                    {
                        linhas.map((linha, indice)=>(
                             <tr key={indice}>
                                {colunas.map((info)=>(
                                    <td key={info.chave}>{linha[info.chave ]}</td>
                                ))}
                                 </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}