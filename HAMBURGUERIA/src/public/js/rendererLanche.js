const { ipcRenderer } = require("electron");

let lista, paginaLanche, nomeLanche

let arrayLanches = [];
paginaLanche = document.querySelector("#lanche")

ipcRenderer.on('lanche-data', () =>{
    console.log("teste");
})

ipcRenderer.on('array-lanche-cheio', (event, dadosLanche) =>{
    console.log(dadosLanche) // teste do passo 6

    //passo 7 manipular a estrutura de dados e renderizar o documento html preenchendo as caixas de texto(input) com os dados extraidos do array
    
    arrayLanches = dadosLanche
    console.log(arrayLanches)//apoio a logica (extração dos dados  do array )
    //percorrer o array e setar as caixas input (caixas de texto)
    arrayLanches.forEach((c) =>{
        paginaLanche.innerHTML += `
        <img src="../public/img/alelo.png" alt="produto">
        <h2>${t.nome}</h2>
        <p>${t.descricao}</p>
        <p>${t.preco}</p>
        <button class="btn btn-success">Adicionar</button>
        `
    })
    })