"use client";

import React, { useEffect, useState } from "react";
interface DadosDaReserva{
    idUsuario:   string;
    codStatus:   string;
    codRecurso:  string;
    dataInicial: string;
    dataFinal:   string;
    horaInicial: string;
    horaFinal:   string;
}

interface DadosDoRecurso{
  codRecurso:    string;
  nome:          string;
}
export default function reserva() {

    const [dadosRecurso, setDadosRecurso]= useState<DadosDoRecurso[]>([]);

    const [dadosReserva, setDadosReserva]= useState<DadosDaReserva>({
        idUsuario:       "",
        codStatus:  "Livre",
        codRecurso:      "",
        dataInicial:     "",
        dataFinal:       "",
        horaInicial:     "",
        horaFinal:       ""
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
      setDadosReserva({...dadosReserva,[event.target.name]:event.target.value})
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>){
            event.preventDefault();
            await fetch("http://localhost:8080/reservas",{
                method:"POST",
                headers:{'content-type':'application/json'},
                body:JSON.stringify(dadosReserva)
            }).then(dado =>{
                if(!dado.ok) throw new Error ("Erro ao conectar ao BD!");
                alert("Recurso cadastrado com sucesso!");
                setDadosReserva({idUsuario:"", codStatus:"Livre", codRecurso:"", dataInicial:"", dataFinal:"", horaInicial:"", horaFinal:""});
            }).catch((erro)=>{
                alert("Erro ao conectar ao BD!");
                console.log("Erro:",erro);
            })
        }

    useEffect(() => 
    {
      async function carregarDadosDosRecursos()
      {
        try 
        {
          const response = await fetch("http://localhost:8080/recursos")
          if (!response.ok)
          {
            throw new Error("Erro ao trazer os dados de TODOS os recursos do BD");
          }
          const resultados: DadosDoRecurso[] = await response.json();

          setDadosRecurso(resultados);
        }
        catch(erro)
        {
          console.error("Erro do processamento",erro);
        }
      }   // end da function 

      // fazendo chamada da função que vai carregar os dados
      // dos alunos na página
      carregarDadosDosRecursos();
    }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-md mx-auto mt-10 p-6 bg-red-100 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-2">Reserva de Recurso</h2>

            <div className="font-medium mb-4">
            Marque sua reserva!
            </div>
    
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
              Recurso:
              <select className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                  name="codRecurso"
                  value={dadosReserva.codRecurso}
                  onChange={handleChange}
                  required>
                  <option value="" disabled>Selecione o Recurso</option>
                  {dadosRecurso.map((registro) => (
                    <option key={registro.codRecurso} value={registro.codRecurso}>
                      {registro.nome}
                    </option>
                  ))}

              </select>
              </label>

              <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Inicial:
              <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                  type="date"
                  name="dataInicial"
                  value={dadosReserva.dataInicial}
                  onChange={handleChange}
                  required/>
              </label>

              <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Final:
              <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                  type="date"
                  name="dataFinal"
                  value={dadosReserva.dataFinal}
                  onChange={handleChange}
                  required/>
              </label>

              <label className="block text-sm font-medium text-gray-700 mb-2">
              Hora Inicial:
              <select className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                  name="horaInicial"
                  value={dadosReserva.horaInicial}
                  onChange={handleChange}
                  required>
                  <option value="" disabled>Selecione o Horario inicial</option>
              </select>
              </label>

              <label className="block text-sm font-medium text-gray-700 mb-2">
              Hora final:
              <select className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                  name="horaFinal"
                  value={dadosReserva.horaFinal}
                  onChange={handleChange}
                  required>
                  <option value="" disabled>Selecione o Horario Final</option>
              </select>

              </label>
              <br></br>
              <button type="submit" className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200">
              Enviando Dados
              </button>
            </form>
        </div>
    </div>
    );
}