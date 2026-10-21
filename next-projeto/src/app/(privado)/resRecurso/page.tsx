"use client";

import React, { useEffect, useMemo, useState } from "react";
interface DadosDaReserva{
    idUsuario:          string;
    codStatus:          string;
    codRecurso:         string;
    dataInicial:        string;
    dataFinal:          string;
    horaInicial:        string;
    horaFinal:          string;
}

interface DadosDoRecurso{
  codRecurso:           string;
  nome:                 string;
}

interface ReservaExistente {
  codrecurso:  number | string;
  dataInicial:          string;
  dataFinal:            string;
  horaInicial:          string;
  horaFinal:            string;
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

function paraMinutos(data: unknown, hora: unknown): number {
  let ano = 0, mes = 0, dia = 0, h = 0, m = 0;

  if (Array.isArray(data)) {
    [ano, mes, dia] = data.map(Number);
  } else {
    const p = String(data ?? "").slice(0, 10).replace(/\//g, "-").split("-").map(Number);
    if (p[0] > 31) [ano, mes, dia] = p; // veio AAAA-MM-DD
    else [dia, mes, ano] = p;           // veio DD-MM-AAAA
  }

  if (Array.isArray(hora)) {
    [h, m] = hora.map(Number);
  } else {
    [h, m] = String(hora ?? "").split(":").map(Number);
  }

  return Date.UTC(ano, mes - 1, dia, h, m) / 60000; // NaN se algo estiver inválido
}

export default function reserva() {

    const [reservasExistentes, setReservasExistentes] = useState<ReservaExistente[]>([]);

    const [dadosRecurso, setDadosRecurso]= useState<DadosDoRecurso[]>([]);

    const [dadosReserva, setDadosReserva]= useState<DadosDaReserva>({
        idUsuario:     "15",
        codStatus:      "4",
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

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
      event.preventDefault();
      try {
        const resp = await fetch("http://localhost:8080/reservas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosReserva),
        });

        if (!resp.ok) {
          const corpo = await resp.text();
          throw new Error(`HTTP ${resp.status} - ${corpo}`);
        }
        alert("Reserva feita com sucesso!");
        setDadosReserva({ idUsuario: "15", codStatus: "4", codRecurso: "", dataInicial: "", dataFinal: "", horaInicial: "", horaFinal: "" });
      } catch (erro) {
        console.error("Erro:", erro);
        alert("Erro ao salvar a reserva: " + (erro as Error).message);
      }
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

    const reservasDoRecurso = useMemo(() => {
      return reservasExistentes
        .filter((r) => String(r.codrecurso) === String(dadosReserva.codRecurso))
        .map((r) => ({
          ini: paraMinutos(r.dataInicial, r.horaInicial),
          fim: paraMinutos(r.dataFinal, r.horaFinal),
        }))
        .filter((r) => !Number.isNaN(r.ini) && !Number.isNaN(r.fim));
    }, [reservasExistentes, dadosReserva.codRecurso]);

    const horariosIniciaisDisponiveis = useMemo(() => {
      if (!dadosReserva.codRecurso || !dadosReserva.dataInicial) return [];

      return horarios.filter((hora) => {
        const slot = paraMinutos(dadosReserva.dataInicial, hora);

        // ocupado se o horário cai dentro de [início - margem, fim + margem]
        const ocupado = reservasDoRecurso.some(
          (r) => slot > r.ini - margem && slot < r.fim + margem
        );

        return !ocupado;
      });
    }, [reservasDoRecurso, dadosReserva.codRecurso, dadosReserva.dataInicial]);

    const horariosFinaisDisponiveis = useMemo(() => {
      const { codRecurso, dataInicial, dataFinal, horaInicial } = dadosReserva;
      if (!codRecurso || !dataInicial || !dataFinal || !horaInicial) return [];

      const iniNova = paraMinutos(dataInicial, horaInicial);

      return horarios.filter((hora) => {
        const fimNova = paraMinutos(dataFinal, hora);
        if (fimNova <= iniNova) return false;

        // conflito se os intervalos (com margem) se sobrepõem
        const conflito = reservasDoRecurso.some(
          (r) => iniNova < r.fim + margem && fimNova > r.ini
        );

        return !conflito;
      });
    }, [reservasDoRecurso, dadosReserva.codRecurso, dadosReserva.dataInicial, dadosReserva.dataFinal, dadosReserva.horaInicial]);

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