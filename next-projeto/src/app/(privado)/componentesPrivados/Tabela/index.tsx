interface TabelaProps{
    titulo?:string;
    coluna: {chave:string; titulo: string}[];
    linhas:Record<string, string| number>[];
}

export function Tabela(){

}