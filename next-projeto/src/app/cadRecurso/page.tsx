"use client";

import React, { useState } from "react";
interface DadosDoRecurso{
    nome: string;
    capacidade: string;
    localizacao: string;
    tipo: string;
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
            headers:{'content-type':'application/json'},
            body:JSON.stringify(dados)
        }).then(dado =>{
            if(!dado.ok) throw new Error ("Erro ao conectar ao BD!");
            alert("Recurso cadastrado com sucesso!");
            setDados({nome:"", capacidade:"", localizacao:"", tipo:""});
        }).catch((erro)=>{
            alert("Erro ao conectar ao BD!")
        })
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-md mx-auto mt-10 p-6 bg-red-100 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-2">Formulário de Cadastro</h2>

            <div className="font-medium mb-4">
            Insira os dados do recurso!
            </div>
    
        <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Recurso:
                <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                    type="text"
                    name="nome"
                    value={dados.nome}
                    onChange={handleChange}/>
                </label>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacidade:
                <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                    type="text"
                    name="capacidade"
                    value={dados.capacidade}
                    onChange={handleChange}/>
                </label>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                Localização:
                <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                    type="text"
                    name="localizacao"
                    value={dados.localizacao}
                    onChange={handleChange}/>
                </label>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo:
                <select className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                    name="tipo"
                    value={dados.tipo}
                    onChange={handleChange}
                    required>
                    <option value="" disabled>Selecione o tipo</option>
                    <option value="laboratorio">Laboratório</option>
                    <option value="sala">Sala</option>
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