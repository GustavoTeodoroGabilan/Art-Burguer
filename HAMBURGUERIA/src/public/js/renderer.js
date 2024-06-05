const { ipcRenderer } = require("electron");

//--------------------------VARIAVEIS-----------------------------
let arrayLanches = [];
let arrayLancheSelecionado = []
let lancheIndividual = document.getElementById("produto")
let arrayPedidos = []

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

//--------------------------PAGINA LANCHE----------------------------

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
    arrayPedidos.push(nomeLancheSelecionado)
    arrayPedidos.forEach((t) => {
        console.log(t)
        ipcRenderer.send('get-valor-lanche', t)
    })
    document.getElementById('lancheSelecionado').innerHTML = ''
    document.querySelector('.inicio').classList.remove("blur")
    if(arrayPedidos != null){
        document.getElementById('finalizarPedido').classList.remove('ocultar')
        arrayPedidos.forEach((t) => {
            
        })
    }
}
//---------------------------PAGAMENTO-------------------------------

ipcRenderer.on("dadosLanche-selecionado", (args)=>{
    let soma =+ args.preco
    console.log(args.preco)
    console.log(soma)
    document.getElementById('valorTotal').innerText = soma
})

function finalizarPedido(){
    document.getElementById('inicio').classList.add("ocultar")
    document.getElementById('paginaPagamento').classList.remove('ocultar')
}

function telaConfirmacao(){
    document.getElementById('paginaPagamento').classList.add('ocultar')
    document.getElementById('paginaConfirmacao').classList.remove('ocultar')

    arrayPedidos.forEach((t) => {
        ipcRenderer.send('get-valor-lanche', t)
    })
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
        <div  class="lancheSelecionado crescer">
        <img src="../public/img/alelo.png" alt="">
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


