const { ipcRenderer } = require("electron");

//--------------------------VARIAVEIS-----------------------------
let arrayLanches = [];
let arrayLancheSelecionado = []
let lancheIndividual = document.getElementById("produto")

let updateStatus = false;

lista = document.querySelector("#cardapio");
paginaLanche = document.querySelector("#lanche")
nomeLanche = document.querySelector("#nomeLanche")
let adicionarPedido = document.querySelector("#addPedido")

ipcRenderer.send('send-message', "Status do bando de dados:")

//--------------------------PEGAR LANCHE-----------------------------
ipcRenderer.send("get-lanches");
//Passo 3 (slide) receber as
ipcRenderer.on("get-options", (event, args) => {
    console.log(args);
    const opcoesLanches = JSON.parse(args);
    arrayLanches = opcoesLanches;
    console.log(arrayLanches);
    renderizarLanches(arrayLanches);
});

//--------------------------PAGINA LANCHE-----------------------------

function pegarLanche(nomeLanche){
    ipcRenderer.send('buscar-lanche', nomeLanche)
}

ipcRenderer.on('lanche-data', async (event, lancheDados) => {
    const lanche = JSON.parse(lancheDados)
    console.log(lanche)
    arrayLancheSelecionado = lanche
    lancheSelecionado(arrayLancheSelecionado)
})

function novoPedido(nomeLancheSelecionado){
    console.log(nomeLancheSelecionado)
    ipcRenderer.send("novo-pedido", nomeLancheSelecionado)
}
//--------------------------RENDERIZAÇÃO-----------------------------
function renderizarLanches(lanche) {
  lista.innerHTML = ""; //Limpar a lista
  let contador = 0
  //percorrer o array
lanche.forEach((t) => {
    contador += 1
    lista.innerHTML += `
<a class="lanche" href="#" id="produto" onclick="pegarLanche('${t.nome}')">
    <img src="../public/img/alelo.png" alt="" class="imagemLanche">
    <h3 class="nomeLanche" id="nomeLanche">${t.nome}</h3>
    <p class="preco">${t.preco}</p>
</a>
`;

});
}

function lancheSelecionado(lanche){

    lanche.forEach((t) => {
        document.getElementById('lancheSelecionado').innerHTML += `
        <div  class="lancheSelecionado">
        <img src="../public/img/alelo.png" alt="">
        <p>${t._id}</p>
        <h2>${t.nome}</h4>
        <p>${t.ingredientes}</p>
        <p class="">${t.preco}</p>
        <button id="addPedido" onclick="novoPedido('${t.nome}')">adicionar</button>
        </div>
        `
    })
document.querySelector('.inicio').classList.add("blur")
document.querySelector('.inicio').disable
}
