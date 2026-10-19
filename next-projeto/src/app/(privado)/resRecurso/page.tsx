"use client";

import React, { useEffect, useMemo, useState } from "react";
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

interface ReservaExistente {
  codRecurso:    string;
  dataInicial:   string;
  dataFinal:     string;
  horaInicial:   string;
  horaFinal:     string;
}

const intervalo = 45; // minutos entre cada horário
const margem = 45;    // folga mínima antes/depois de uma reserva existente
const horarios = gerarHorarios();

function gerarHorarios(): string[] {
  const lista: string[] = [];
  for (let m = 7 * 60; m <= 22 * 60; m += intervalo) {
    const hh = String(Math.floor(m / 60)).padStart(2, "0");
    const mm = String(m % 60).padStart(2, "0");
    lista.push(`${hh}:${mm}`);
  }
  return lista;
}

function paraMinutos(data: string, hora: string): number {
  return new Date(`${data}T${hora.slice(0, 5)}:00`).getTime() / 60000;
}

export default function reserva() {

    const [reservasExistentes, setReservasExistentes] = useState<ReservaExistente[]>([]);

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

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
      const { name, value } = event.target;

      setDadosReserva((anterior) => {
        const novo = { ...anterior, [name]: value };

        if (name === "codRecurso" || name === "dataInicial") {
          novo.horaInicial = "";
          novo.horaFinal = "";
        }

        if (name === "dataFinal" || name === "horaInicial") {
          novo.horaFinal = "";
        }

        if (name === "dataInicial" && (!novo.dataFinal || novo.dataFinal < value)) {
          novo.dataFinal = value;
        }

        return novo;
      });
    }

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>){
            event.preventDefault();
            await fetch("http://localhost:8080/reservas",{
                method:"POST",
                headers:{'content-type':'application/json'},
                body:JSON.stringify(dadosReserva)
            }).then(dado =>{
                if(!dado.ok) throw new Error ("Erro ao conectar ao BD!");
                alert("Reserva feita com sucesso!");
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

    useEffect(() => {
      async function carregarReservas() {
        try {
          const response = await fetch("http://localhost:8080/reservas");
          if (!response.ok) throw new Error("Erro ao trazer as reservas do BD");
          const resultados: ReservaExistente[] = await response.json();
          setReservasExistentes(resultados);
        } catch (erro) {
          console.error("Erro do processamento", erro);
        }
      }
      carregarReservas();
    }, []);

    const reservasDoRecurso = useMemo(
      () =>
        reservasExistentes.filter(
          (r) => r.codRecurso === dadosReserva.codRecurso
        ),
      [reservasExistentes, dadosReserva.codRecurso]
    );

    const horariosIniciaisDisponiveis = useMemo(() => {
      if (!dadosReserva.codRecurso || !dadosReserva.dataInicial) return [];

      return horarios.filter((hora) => {
        const slot = paraMinutos(dadosReserva.dataInicial, hora);

        return reservasDoRecurso.every((r) => {
          const inicio = paraMinutos(r.dataInicial, r.horaInicial);
          const fim = paraMinutos(r.dataFinal, r.horaFinal);

          // válido se estiver ANTES do início (com folga) ou DEPOIS do fim (com folga)
          return slot + margem <= inicio || slot >= fim + margem;
        });
      });
    }, [reservasDoRecurso, dadosReserva.codRecurso, dadosReserva.dataInicial]);

    const horariosFinaisDisponiveis = useMemo(() => {
      const { codRecurso, dataInicial, dataFinal, horaInicial } = dadosReserva;

      if (!codRecurso || !dataInicial || !dataFinal || !horaInicial) return [];

      const inicioNova = paraMinutos(dataInicial, horaInicial);

      return horarios.filter((hora) => {
        const fimNova = paraMinutos(dataFinal, hora);

        // o fim precisa ser depois do início
        if (fimNova <= inicioNova) return false;

        // e o intervalo inteiro não pode encostar em nenhuma reserva existente
        return reservasDoRecurso.every((r) => {
          const inicio = paraMinutos(r.dataInicial, r.horaInicial);
          const fim = paraMinutos(r.dataFinal, r.horaFinal);

          // termina antes da reserva (com folga) OU começa depois dela (com folga)
          return fimNova + margem <= inicio || inicioNova >= fim + margem;
        });
      });
    }, [reservasDoRecurso, dadosReserva.codRecurso, dadosReserva.dataInicial, dadosReserva.dataFinal, dadosReserva.horaInicial,]);

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
                  min={dadosReserva.dataInicial}
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
                  disabled={!dadosReserva.codRecurso || !dadosReserva.dataInicial}
                  required>
                  <option value="" disabled>
                    {!dadosReserva.codRecurso || !dadosReserva.dataInicial
                      ? "Escolha o recurso e a data primeiro"
                      : horariosIniciaisDisponiveis.length === 0
                      ? "Nenhum horário disponível"
                      : "Selecione o Horario inicial"}
                  </option>
                  {horariosIniciaisDisponiveis.map((hora) => (
                    <option key={hora} value={hora}>
                      {hora}
                    </option>
                  ))}
              </select>
              </label>

              <label className="block text-sm font-medium text-gray-700 mb-2">
              Hora final:
              <select className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                  name="horaFinal"
                  value={dadosReserva.horaFinal}
                  onChange={handleChange}
                  disabled={!dadosReserva.horaInicial || !dadosReserva.dataFinal}
                  required>
                  <option value="" disabled>
                    {!dadosReserva.horaInicial || !dadosReserva.dataFinal
                      ? "Escolha a hora inicial primeiro"
                      : horariosFinaisDisponiveis.length === 0
                      ? "Nenhum horário disponível"
                      : "Selecione o Horario Final"}
                  </option>
                  {horariosFinaisDisponiveis.map((hora) => (
                    <option key={hora} value={hora}>
                      {hora}
                    </option>
                  ))}
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