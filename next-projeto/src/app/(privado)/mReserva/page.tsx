"use client";
import { useState, useEffect } from "react";
import { Tabela } from "../componentesPrivados/Tabela" 
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
      const API = "http://localhost:8080"
export default function reserva() {
      const [reserva, setReserva] = useState<Reservas[]>([]);

      const id = 15
      useEffect(()=>{
        fetch(`${API}/reservas/${id}`).then((resultado)=> resultado.json()).then((dados)=> setReserva(dados));
      },[])
  return (
    <div>
      <main className="flex flex-1 w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1>
              Minhas reservas!
            </h1>
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
          linhas={reserva}
          />

        </main>
    </div>
  );
}
