interface TabelaProps{
    titulo?:string;
    coluna: {chave:string; titulo: string}[];
    linhas:Record<string, string| number>[];
}
export function Tabela({titulo, coluna, linhas}:TabelaProps){
    return(
        <div>
            <h1>{titulo}</h1>
            <table>
                <thead>
                    {
                        coluna.map((info)=>{
                            return <th>{info.titulo}</th>
                        })
                    }
                </thead>
                <tbody>
                    {
                        coluna.map((info)=>{
                            return <tr>{info.}</tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}