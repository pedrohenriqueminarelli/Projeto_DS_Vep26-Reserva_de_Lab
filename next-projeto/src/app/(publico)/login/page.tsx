"use client"
import { useState } from "react";
import { Campo } from "../../(privado)/componentesPrivados/Campo";
import { Botao } from "../../(privado)/componentesPrivados/Botao";
import { useRouter } from "next/navigation";
export default function Login(){ 

    const router = useRouter();
    const [dados, setDados] = useState ({email:"", senha:""});

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        setDados({...dados, [event.target.name]: event.target.value});
    }
    
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>){
        event.preventDefault();
        try{
            const resposta = await fetch("http://localhost:8080/auth/login",{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(dados)
        })
        const resultado = await resposta.json();
        if(!resposta.ok){
            alert(resultado.massage)
            return
        }else{
            localStorage.setItem("token", resultado.token);
            router.push("/home");
        }
        }catch(erro){
            alert("Erro ao conectar ao BD")
        }
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
                type="email"
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