async function enviarDados() {
    const url="http://localhost:8080";

    const nomeRecurso = document.getElementsByName("nome").value;
    const tipoRecurso = document.getElementById("tipo").value;
    const capacidadeRecurso = document.getElementById("capacidade").value;
    const localizacaoRecurso = document.getElementById("localizacao").value;

    const recurso = {
        nome: nomeRecurso,
        tipo: tipoRecurso,
        capacidade: capacidadeRecurso,
        localizacao: localizacaoRecurso
    }

        await fetch(url, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(recurso)
    }).then(data => {
        console.log("Recurso cadastrado com sucesso!", data);
        alert("Recurso cadastrado com sucesso!");
    }).catch(error => {
        console.log("Erro no cadastro de recurso", error);
        alert("Erro no cadastro de recurso");
    })
}

export default enviarDados;