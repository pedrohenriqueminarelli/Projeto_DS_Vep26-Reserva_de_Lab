"use client";
import body from "../../styles/corpo.module.css"
import { Tabela } from "../componentesPrivados/Tabela";
import { Select } from "../componentesPrivados/Select";
import { Campo } from "../componentesPrivados/Campo";
import { Botao } from "../componentesPrivados/Botao";
import { useState, useEffect } from "react";
type Reservas = {
    idUsuario: number;
    codStatus: number;
    codRecurso:number;
    codReserva:number;
    nomeUsuario: string;
    nomeRecurso:string;
    nomeStatus: string;
    dataInicial: string;
    dataFinal: string;
    horaInicial: string;
    horaFinal: string;
    dtCriacao: string;
}
     const API= "http://localhost:8080"

     type Recurso={codRecurso:number; nome: string};
     type Status= {codStatus: number; nome:string };
export default function todasAsReservas(){
   
    const [reservas, setReservas] = useState<Reservas[]>([]);
    const [recurso, setRecurso] = useState<Recurso[]>([]);
    const [status, setStatus] = useState<Status[]>([]);
    const [filtros, setFiltros] = useState({codRecurso: "", codStatus: "",data: "" });
    useEffect(()=>{
      fetch(`${API}/reservas/detalhadas`,{
        method:"GET",
        headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}
      }).then((resultado)=> resultado.json()).then((dados)=> setReservas(dados));
      fetch(`${API}/recursos`, {
        method:"GET",
        headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}
      }).then((resultado)=> resultado.json()).then((dados)=> setRecurso(dados));
      fetch(`${API}/reservas/status`, {
        method:"GET",
        headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}
      }
      ).then((resultado)=> resultado.json()).then((dados)=>setStatus(dados));
    },[])

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
      setFiltros({...filtros, [event.target.name]:event.target.value});
    }
    function limparfiltros(){
      setFiltros({codRecurso: "", codStatus: "",data: "" });
    }
    function paraISO(data: string) {
        const [dia, mes, ano] = data.split("/");
        return `${ano}-${mes}-${dia}`;
    }
    const reservasFiltradas = reservas.filter((r) => {
        if (filtros.codRecurso && String(r.codRecurso) !== filtros.codRecurso) return false;
        if (filtros.codStatus && String(r.codStatus) !== filtros.codStatus) return false;
        if (filtros.data && (paraISO(r.dataInicial) > filtros.data || paraISO(r.dataFinal) < filtros.data)) return false;
        return true;
    });

    return(
        <div>
      <main className={body.corpo}>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className={body.h1}>
              Todas as reservas!
            </h1>
          <div className="grid gap-4 sm:grid-cols-4 items-end">
            <Select 
            label="Escolha o recurso que deseja buscar!"
            name="codRecurso"
            value={filtros.codRecurso}
            onChange={handleChange}
            opcoes={recurso.map((r)=>({valor: String(r.codRecurso), texto: r.nome}))}
            textOption="Selecione o recurso..."
            />
            <Select
            label="Escolha o status da Reserva"
            name="codStatus"
            value={filtros.codStatus}
            onChange={handleChange}
            opcoes={status.map((s)=>({valor:String(s.codStatus),texto: s.nome}))}
            textOption="Selecione o Status..."
            />
            <Campo
            label="Data:"
            name="data"
            value={filtros.data}
            onChange={handleChange}
            type="date"
            />
            <Botao
            type="submit"
            texto="Limpar filtros"
            onClick={limparfiltros}
            />
            </div>
            <Tabela
            colunas={[
                {chave: "codReserva", titulo: "Reserva"},
                {chave: "idUsuario", titulo: "Id usuário"},
                {chave:"nomeUsuario", titulo: "Nome"},
                {chave:"nomeRecurso", titulo: "Recurso"},
                {chave:"nomeStatus", titulo:"Status"},
                {chave:"dataInicial", titulo:"Início"},
                {chave:"dataFinal", titulo:"fim"},
                {chave:"horaInicial", titulo:"Das"},
                {chave:"horaFinal", titulo:"Até"},
                {chave: "dtCriacao", titulo:"Reservada"},
            ]}
            linhas={reservasFiltradas}
            />
          </div>
        </main>
    </div>
    )
}