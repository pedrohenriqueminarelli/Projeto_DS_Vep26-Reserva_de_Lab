"use client"
import { useState } from "react";
import { Campo } from "../../(privado)/componentesPrivados/Campo";
import { Botao } from "../../(privado)/componentesPrivados/Botao";
export default function Login(){ 

    const [dados, setDados] = useState ({email:"", senha:""});

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        setDados({...dados, [event.target.name]: event.target.value});
    }
    
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>){
        event.preventDefault();
        await fetch("http://localhost:8080/auth/login",{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(dados)
        }).then(resultado=>{
            if(!resultado.ok){
                alert("falha ao se conectar")
                return
            }else{}
        }).catch((erro)=>{
            alert("Erro ao conectar ao BD")
        })
    }

     return (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-md mx-auto mt-10 p-6 bg-red-100 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-2">Faça o seu Login</h2>

            <div className="font-medium mb-4">
            Insira os seu dados!
            </div>
    
        <form onSubmit={handleSubmit}>
                <Campo
                label="Email:"
                name="email"
                value={dados.email}
                onChange={handleChange}
                type="text"
                />
                <Campo 
                label="Senha:"
                name="senha"
                value={dados.senha}
                onChange={handleChange}
                type="password"
                />
                <br></br>
                <Botao
                type="submit"
                texto="Logar"
                />
            </form>
        </div>
    </div>
  );
}