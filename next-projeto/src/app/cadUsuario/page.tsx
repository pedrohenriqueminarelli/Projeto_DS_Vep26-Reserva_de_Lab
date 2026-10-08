"use client";
import { useState } from "react";
interface DadosDoUsuario{
    nome:string;
    cpf:string;
    email: string;
    senha:string;
    nascimento:string;
    celular:string; 
}
export default function Cadusuario() {

    const [dados, setDados]= useState<DadosDoUsuario>({
        nome:"",
        cpf: "",
        email: "",
        senha: "",
        nascimento: "",
        celular: ""
});

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        setDados({...dados,[event.target.name]:event.target.value});
    }
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>){
        event.preventDefault();
        await fetch("http://localhost:8080/usuarios",{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(dados)
        }).then(dado=>{
            if(!dado.ok) throw new Error("Erro ao conectar no BD!");
            alert("dados cadastrados com sucesso!");
            setDados({nome:"", cpf:"",email:"", senha:"", nascimento:"", celular:"", });
        }).catch((erro)=>{
            alert("Erro no cadastro do usuário!");
        });
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-md mx-auto mt-10 p-6 bg-red-100 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-2">Formulário de Cadastro</h2>

            <div className="font-medium mb-4">
            Insira os dados de usuario!
            </div>
    
        <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome completo:
                <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                    type="text"
                    name="nome"
                    value={dados.nome}
                    onChange={handleChange}
                    />
                </label>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail para contato:
                <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                    type="email"
                    name="email"
                    value={dados.email}
                    onChange={handleChange}/>
                </label>

                <label className="block text-sm font-medium text-gray-700">
                Senha:
                <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                    type="password"
                    name="senha"
                    value={dados.senha}
                    onChange={handleChange}/>
                </label>
                <label className="mt-2 block text-sm font-medium text-gray-700">
                Data de Nascimento:
                <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                    type="date"
                    name="nascimento"
                    value={dados.nascimento}
                    onChange={handleChange}/>
                </label>
                <label className="mt-2 block text-sm font-medium text-gray-700">
                Número de celular:
                <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                    type="tel"
                    name="celular"
                    value={dados.celular}
                    onChange={handleChange}/>
                </label>
                <label htmlFor="">
                    CPF:
                    <input type="text" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                    name="cpf"
                    value={dados.cpf}
                    onChange={handleChange}
                    />
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