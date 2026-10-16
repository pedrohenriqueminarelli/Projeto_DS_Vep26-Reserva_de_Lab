interface TabelaProps{
    label: string;
    value:string;
    name:string ;
    onChange: (event: React.ChangeEvent<HTMLTableElement>)=> void;
    thead:{nomeDaColuna:string}[];
    tbody:{ColunaQuePertence:string; texto:string}[];
}

export function Tabela(){

}