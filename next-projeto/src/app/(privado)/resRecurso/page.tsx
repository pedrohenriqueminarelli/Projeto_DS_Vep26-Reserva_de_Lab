"use client";

import body from "../../styles/corpo.module.css"
import styles from "../../styles/form.module.css"
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

interface HoraServidor {
  data:                 string;
  hora:                 string;
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
    if (p[0] > 31) [ano, mes, dia] = p;
    else [dia, mes, ano] = p;
  }

  if (Array.isArray(hora)) {
    [h, m] = hora.map(Number);
  } else {
    [h, m] = String(hora ?? "").split(":").map(Number);
  }

  return Date.UTC(ano, mes - 1, dia, h, m) / 60000;
}

export default function reserva() {

    const [reservasExistentes, setReservasExistentes] = useState<ReservaExistente[]>([]);

    const [agora, setAgora] = useState<HoraServidor | null>(null);

    const [dadosRecurso, setDadosRecurso]= useState<DadosDoRecurso[]>([]);

    const [dadosReserva, setDadosReserva]= useState<DadosDaReserva>({
        idUsuario:     "15",
        codStatus:       "",
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
        setDadosReserva({ idUsuario: "15", codStatus: "", codRecurso: "", dataInicial: "", dataFinal: "", horaInicial: "", horaFinal: "" });
      } catch (erro) {
        console.error("Erro:", erro);
        alert("Erro ao salvar a reserva: " + (erro as Error).message);
      }
    }

    async function carregarHora()
    {
      try {
        const response = await fetch("http://localhost:8080/hora");
        if (!response.ok) throw new Error("Erro ao buscar a hora do servidor");
        const resultado: HoraServidor = await response.json();
        setAgora(resultado);
      } catch (erro) {
        console.error("Erro do processamento", erro);
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
      }

      carregarDadosDosRecursos();
    }, []);

    useEffect(() => {
      carregarHora();
      const id = setInterval(carregarHora, 60000); // atualiza a cada minuto
      return () => clearInterval(id);
    },[])

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

    const agoraEmMinutos = useMemo(
      () => (agora ? paraMinutos(agora.data, agora.hora) : null),
      [agora]
    );

    const horariosIniciaisDisponiveis = useMemo(() => {
      if (!dadosReserva.codRecurso || !dadosReserva.dataInicial) return [];
      if (agoraEmMinutos === null) return [];

      return horarios.filter((hora) => {
        const slot = paraMinutos(dadosReserva.dataInicial, hora);

        if (hora>="22:00") return false;
        if (slot<=agoraEmMinutos) return false;

        const ocupado = reservasDoRecurso.some(
          (r) => slot > r.ini - margem && slot < r.fim + margem
        );

        return !ocupado;
      });
    }, [reservasDoRecurso, dadosReserva.codRecurso, dadosReserva.dataInicial, agoraEmMinutos]);

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
    <div className={body.corpo}>
        <div className={styles.form}>
        <h2 className={styles.h2}>Reserva de Recurso</h2>

            <div className={styles.h3}>
            Marque sua reserva!
            </div>
    
            <form onSubmit={handleSubmit}>
              <label className={styles.label}>
              Recurso:
              <select className={styles.campo}
                  name="codRecurso"
                  value={dadosReserva.codRecurso}
                  onChange={handleChange}
                  required>
                  <option value="" disabled>Selecione o Recurso...</option>
                  {dadosRecurso.map((registro) => (
                    <option key={registro.codRecurso} value={registro.codRecurso}>
                      {registro.nome}
                    </option>
                  ))}

              </select>
              </label>

              <label className={styles.label}>
              Finalidade:
              <select className={styles.campo}
                  name="codStatus"
                  value={dadosReserva.codStatus}
                  onChange={handleChange}
                  required>
                  <option value="" disabled>
                    Selecione o motivo do agendamento...
                  </option>
                  <option value="2">
                    Ocupação do Recurso
                  </option>
                  <option value="3">
                    Bloqueio do Recurso
                  </option>
                  <option value="4">
                    Reserva do Recurso
                  </option>
              </select>
              </label>

              <label className={styles.label}>
              Data Inicial:
              <input className={styles.campo}
                  type="date"
                  name="dataInicial"
                  min={agora?.data}
                  value={dadosReserva.dataInicial}
                  onChange={handleChange}
                  required/>
              </label>

              <label className={styles.label}>
              Data Final:
              <input className={styles.campo}
                  type="date"
                  name="dataFinal"
                  min={dadosReserva.dataInicial || agora?.data}
                  value={dadosReserva.dataFinal}
                  onChange={handleChange}
                  required/>
              </label>

              <label className={styles.label}>
              Hora Inicial:
              <select className={styles.campo}
                  name="horaInicial"
                  value={dadosReserva.horaInicial}
                  onChange={handleChange}
                  disabled={!dadosReserva.codRecurso || !dadosReserva.dataInicial}
                  required>
                  <option value="" disabled>
                    {!agora
                      ? "Carregando horário do servidor..."
                      : !dadosReserva.codRecurso || !dadosReserva.dataInicial
                      ? "Escolha o recurso e a data primeiro..."
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

              <label className={styles.label}>
              Hora final:
              <select className={styles.campo}
                  name="horaFinal"
                  value={dadosReserva.horaFinal}
                  onChange={handleChange}
                  disabled={!dadosReserva.horaInicial || !dadosReserva.dataFinal}
                  required>
                  <option value="" disabled>
                    {!dadosReserva.horaInicial || !dadosReserva.dataFinal
                      ? "Escolha a hora inicial primeiro..."
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
              <button type="submit" className={styles.botao}>
              Enviando Dados
              </button>
            </form>
        </div>
    </div>
    );
}