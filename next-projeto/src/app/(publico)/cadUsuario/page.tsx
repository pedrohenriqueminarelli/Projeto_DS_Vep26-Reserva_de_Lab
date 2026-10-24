"use client";
import body from "../../styles/corpo.module.css"
import styles from "../../styles/form.module.css"
import { useState } from "react";
interface DadosDoUsuario{
    nome:       string;
    cpf:        string;
    email:      string;
    senha:      string;
    nascimento: string;
    celular:    string; 
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
            alert("Usuário cadastrado com sucesso!");
            setDados({nome:"", cpf:"",email:"", senha:"", nascimento:"", celular:"", });
        }).catch((erro)=>{
            alert("Erro no cadastro do usuário!");
        });
    }

  return (
    <div className={body.corpo}>
        <div className={styles.form}>
        <h2 className={styles.h2}>Formulário de Cadastro</h2>

            <div className={styles.h3}>
            Insira os dados de usuario!
            </div>
    
        <form onSubmit={handleSubmit}>
            <label className={styles.label}>
                Nome completo:
                <input className={styles.campo} placeholder="insira seu nome completo..."
                    type="text"
                    name="nome"
                    value={dados.nome}
                    onChange={handleChange}
                    required
                    />
                </label>

                <label className={styles.label}>
                E-mail para contato:
                <input className={styles.campo} placeholder="Insira seu e-mail pessoal..."
                    type="email"
                    name="email"
                    value={dados.email}
                    onChange={handleChange}
                    required/>
                </label>

                <label className={styles.label}>
                Senha:
                <input className={styles.campo} placeholder="Insira sua senha..."
                    type="password"
                    name="senha"
                    value={dados.senha}
                    onChange={handleChange}
                    required/>
                </label>
                <label className={styles.label}>
                Data de Nascimento:
                <input className={styles.campo}
                    type="date"
                    name="nascimento"
                    value={dados.nascimento}
                    onChange={handleChange}
                    required/>
                </label>
                <label className={styles.label}>
                Número de celular:
                <input className={styles.campo} placeholder="Insira seu número de telefone por extenso..."
                    type="tel"
                    name="celular"
                    value={dados.celular}
                    onChange={handleChange}
                    required/>
                </label>
                <label className={styles.label}>
                    CPF:
                    <input className={styles.campo} placeholder="Insira seu CPF por extenso..."
                    type="text"
                    name="cpf"
                    value={dados.cpf}
                    onChange={handleChange}
                    required
                    />
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