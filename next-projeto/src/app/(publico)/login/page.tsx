"use client"
import { useState } from "react";
import { Campo } from "../../(privado)/componentesPrivados/Campo";
import { Botao } from "../../(privado)/componentesPrivados/Botao";
import body from "../../styles/corpo.module.css"
import styles from "../../styles/form.module.css"
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
            alert("Senha ou Email estão errados!")
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
    <div className={body.corpo}>
        <div className={styles.form}>
        <h2 className={styles.h2}>Faça o seu Login</h2>

            <div className={styles.h3}>
            Insira os seu dados!
            </div>
    
        <form onSubmit={handleSubmit}>
                <Campo
                label="Email:"
                name="email"
                value={dados.email}
                onChange={handleChange}
                type="email"
                placeholder="Insira o email cadastrado..."
                />
                <Campo 
                label="Senha:"
                name="senha"
                value={dados.senha}
                onChange={handleChange}
                type="password"
                placeholder="Insira a sua senha cadastrada..."
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