"use client";

import body from "../../styles/corpo.module.css"
import styles from "../../styles/form.module.css"
import React, { useState } from "react";
interface DadosDoRecurso{
    nome:        string;
    capacidade:  string;
    localizacao: string;
    tipo:        string;
}
export default function CadRecurso() {
    
    const [dados, setDados]= useState<DadosDoRecurso>({
        nome:"",
        capacidade:"",
        localizacao:"",
        tipo:""
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        setDados({...dados,[event.target.name]:event.target.value})
    }
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>){
        event.preventDefault();
        await fetch("http://localhost:8080/recursos",{
            method:"POST",
            headers:{'content-type':'application/json', Authorization: `Bearer ${localStorage.getItem("token")}`},
            body:JSON.stringify(dados)
        }).then(dado =>{
            if(!dado.ok) throw new Error ("Já existe um recurso com esse nome!");
            alert("Recurso cadastrado com sucesso!");
            setDados({nome:"", capacidade:"", localizacao:"", tipo:""});
        }).catch((erro)=>{
            alert("Já existe um recurso com esse nome!")
        })
    }

  return (
    <div className={body.corpo}>
        <div className={styles.form}>
        <h2 className={styles.h2}>Formulário de Cadastro</h2>

            <div className={styles.h3}>
            Insira os dados do recurso!
            </div>
    
        <form onSubmit={handleSubmit}>
            <label className={styles.label}>
                Nome do Recurso:
                <input className={styles.campo} placeholder="Qual o nome/número do recurso..."
                    type="text"
                    name="nome"
                    value={dados.nome}
                    onChange={handleChange}
                    required/>
                </label>

                <label className={styles.label}>
                Capacidade:
                <input className={styles.campo} placeholder="Informe a capacidade máxima..."
                    type="text"
                    name="capacidade"
                    value={dados.capacidade}
                    onChange={handleChange}
                    required/>
                </label>

                <label className={styles.label}>
                Localização:
                <input className={styles.campo} placeholder="Especifique a localização..."
                    type="text"
                    name="localizacao"
                    value={dados.localizacao}
                    onChange={handleChange}
                    required/>
                </label>
                <label className={styles.label}>
                Tipo:
                <select className={styles.campo}
                    name="tipo"
                    value={dados.tipo}
                    onChange={handleChange}
                    required>
                    <option value="" disabled>Selecione o tipo...</option>
                    <option value="laboratorio">Laboratório</option>
                    <option value="sala">Sala</option>
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