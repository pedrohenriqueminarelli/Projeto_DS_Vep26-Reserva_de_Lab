"use client";
import { Tabela } from "../componentesPrivados/Tabela";
import { Select } from "../componentesPrivados/Select";
import { useState, useEffect } from "react";
interface Reservas{
    codReserva: number; 
    idUsuario: number;
    codStatus: number;
    codRecurso: number;
    nomeUsuario: string
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
     type Status= {codstatus: number; nome:string }
export default function todasAsReservas(){
   
    const [reservas, setReservas] = useState<Reservas[]>([]);
    const [recurso, setRecurso] = useState<Recurso[]>([]);
    const [status, setStatus] = useState<Status[]>([]);
    useEffect(()=>{
      fetch(`${API}/reservas`).then((resultado)=> resultado.json()).then((dados)=> setReservas(dados));
      fetch(`${API}/recursos`).then((resultado)=> resultado.json()).then((dados)=> setRecurso(dados));
      fetch(`${API}/status`).then((resultado)=> resultado.json()).then((dados)=>setStatus(dados));
    },[])

    const [dados, setdados] = useState<Reservas>({
        codReserva: 0,
        idUsuario: 0,
        codStatus: 0,
        codRecurso: 0,
        nomeUsuario: "",
        nomeRecurso:"",
        nomeStatus: "",
        dataInicial: "",
        dataFinal: "",
        horaInicial: "",
        horaFinal: "",
        dtCriacao: ""
    })

    return(
        <div>
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1>
              Todas as reservas!
            </h1>
          <div className="grid gap-4 sm:grid-cols-4 items-end">
            <Select 
            label="Recurso"
            name="codRecurso"
            value=""
            />
            </div>
          </div>
        </main>
    </div>
    )
}