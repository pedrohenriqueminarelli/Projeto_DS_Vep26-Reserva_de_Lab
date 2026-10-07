"use client";

import enviarDados from './funcoes.js'; 

export default function CadRecurso() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-md mx-auto mt-10 p-6 bg-red-100 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-2">Formulário de Cadastro</h2>

            <div className="font-medium mb-4">
            Insira os dados do recurso!
            </div>
    
        <form onSubmit={enviarDados}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Recurso:
                <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                    type="text"
                    name="nome"/>
                </label>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacidade:
                <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                    type="text"
                    name="capacidade"/>
                </label>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                Localização:
                <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                    type="text"
                    name="localizacao"/>
                </label>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo:
                <select className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                    name="tipo">
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