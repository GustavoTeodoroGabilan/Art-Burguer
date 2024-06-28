const { ipcRenderer } = require("electron");

//--------------------------VARIAVEIS-----------------------------
let arrayLanches = [];
let arrayLancheSelecionado = [];
let lancheIndividual = document.getElementById("produto");
let arrayPedidos = [];
let arrayCalculos = [];
let arrayRenderiza = []
let lanchesFiltrados = []
let soma = 0
let calculo = 0
let preco;
let lancheFiltrado
let nomeCliente

let updateStatus = false;

lista = document.querySelector("#cardapio");
paginaLanche = document.querySelector("#lanche");
nomeLanche = document.querySelector("#nomeLanche");
let adicionarPedido = document.querySelector("#addPedido");

ipcRenderer.send("send-message", "Status do bando de dados:");

//--------------------------PEGAR LANCHE-----------------------------
ipcRenderer.send("get-lanches");
//Passo 3 (slide) receber as
ipcRenderer.on("get-options", (event, args) => {
  const opcoesLanches = JSON.parse(args);
  arrayLanches = opcoesLanches;
  renderizarLanches(arrayLanches);
});

//--------------------------PAGINA LANCHE----------------------------

function pegarLanche(nomeLanche) {
  ipcRenderer.send("buscar-lanche", nomeLanche);
}

ipcRenderer.on("lanche-data", async (event, lancheDados) => {
  const lanche = JSON.parse(lancheDados);
  arrayLancheSelecionado = lanche;
  lancheSelecionado(arrayLancheSelecionado);
});

//Vitor// eu comentei essa sua parte do codigo
// function novoPedido(nomeLancheSelecionado) {
//   arrayPedidos.push(nomeLancheSelecionado);
//   arrayPedidos.forEach((t) => {
//     ipcRenderer.send("get-dados-lanche", t);
//   });
//   document.getElementById("lancheSelecionado").innerHTML = "";
//   document.querySelector(".inicio").classList.remove("blur");
//   if (arrayPedidos != null) {
//     document.getElementById("finalizarPedido").classList.remove("ocultar");
//   }
// }



function novoPedido(nomeLancheSelecionado) {
  arrayPedidos.push(nomeLancheSelecionado);
  ipcRenderer.send("get-dados-lanche", nomeLancheSelecionado);
  document.getElementById("lancheSelecionado").innerHTML = "";
  document.querySelector(".inicio").classList.remove("blur");
  document.querySelector(".inicio").classList.remove("bloquear")
  if (arrayPedidos.length > 0) {
    document.getElementById("finalizarPedido").classList.remove("ocultar");
  }
}

// Função para lidar com o clique do botão
function addPedido() {
  // Aqui você pode adicionar o nome do lanche selecionado
  let nomeLancheSelecionado = 'pedidos'; // Substitua isso pelo nome real do lanche selecionado
  novoPedido(nomeLancheSelecionado);
}



//---------------------------PAGAMENTO-------------------------------

ipcRenderer.on("dadosLanche-selecionado", async (event, args) => {
  let lancheCalculo = "";
  lancheCalculo = JSON.parse(args)
  arrayCalculos = lancheCalculo;
  pedidosConfirmacoes(arrayCalculos)
  
})

  function finalizarPedido() {
    document.getElementById("inicio").classList.add("ocultar")
    document.getElementById("confirmarPedido").classList.remove("ocultar");
    document.getElementById("confirmarPedido").classList.remove("tirar")
    document.getElementById("botaoVoltar").classList.remove("tirar")
  }

  function telaConfirmacao() {
    document.getElementById("paginaPagamento").classList.add("ocultar");
    document.getElementById("paginaFinalizacao").classList.remove("tirar");
    document.getElementById("botaoVoltarPagamento").classList.add("tirar")
    document.getElementById("botaoVoltar").classList.add("tirar")
    const cadastro = {
      nome: nomeCliente,
      status: "preparando"
    }
    ipcRenderer.send("nome-cliente", cadastro)
    setTimeout(function() {
      ipcRenderer.send("recarregar")
  }, 2000);
  }

  function paginaPagamento(){
    document.getElementById("confirmarPedido").classList.add("ocultar")
    document.getElementById("paginaPagamento").classList.remove("ocultar")
    document.getElementById("paginaPagamento").classList.remove("tirar")

  }

  function voltarSelecao(){
    document.getElementById("inicio").classList.remove("ocultar")
    document.getElementById("confirmarPedido").classList.add("tirar")
  }

  function voltarCarrinho(){
    document.getElementById("confirmarPedido").classList.remove("ocultar")
    document.getElementById("paginaPagamento").classList.add("tirar")
  }
  //--------------------------RENDERIZAÇÃO-----------------------------
  function renderizarLanches(lanche) {
    lista.innerHTML = ""; //Limpar a lista
    let contador = 0;
    //percorrer o array
    lanche.forEach((t) => {
      lista.innerHTML += `
<a class="lanche" id="produto" onclick="pegarLanche('${t.nome}')">
    <img src="${t.imagem}" alt="" class="imagemLanche">
    <h3 class="nomeLanche" id="nomeLanche">${t.nome}</h3>
    <p class="preco">R$${t.preco}</p>
</a>
`;
    });
  }

  function lancheSelecionado(lanche) {
    console.log("a");
    lanche.forEach((t) => {
      document.getElementById("lancheSelecionado").innerHTML += `
        <div  class="lancheSelecionado crescer">
        <img src="../public/img/X.png" alt="" class="fechar" onclick="sair()">
        <img src="${t.imagem}" alt="">
        <h2>${t.nome}</h4>
        <p>${t.descricao}</p>
        <p class="preco">R$${t.preco}</p>
        <button id="addPedido" onclick="novoPedido('${t.nome}')">adicionar</button>
        </div>
        `;
    });
    document.querySelector(".inicio").classList.add("blur");
    document.querySelector(".inicio").classList.add("bloquear")
    
  }

  function pedidosConfirmacoes(pedidos){
   document.getElementById('pedidosFeitos').innerHTML += ""
    pedidos.forEach((t) => {
      soma += Number(t.preco)
      console.log(soma)
      document.getElementById('pedidosFeitos').innerHTML += `
         <div class="cardPedido">
          <img src="${t.imagem}" alt="" class="imagemLanche" />
          <div class="titleDesc">
            <h1>${t.nome}</h1>
          </div>
          <h3>R$${t.preco}</h3>
        </div>
      `
      document.getElementById("valor").innerText = soma.toFixed(2)
    })
  }

  function sair(){
    document.getElementById('lancheSelecionado').innerHTML = ""
    document.querySelector(".inicio").classList.remove("blur")
    document.querySelector(".inicio").classList.remove("bloquear")
  }

  // function calcularTotal(precoLanche) {
  //   precoLanche.forEach((t) => {
  //     let valorLanche = Number(t.preco)
  //     let soma = 0
  //     soma += valorLanche
  //   })

  //   document.getElementById("valorTotal").innerText = `R$${calculo}`;
  // }

function filtrar(categoria){
  document.getElementById("cardapio").innerHTML = ""
  ipcRenderer.send("filtrar-lanches", categoria)
}

ipcRenderer.on("lanche-filtrado", async(event, args) => {
  lancheFiltrado = JSON.parse(args)
  lanchesFiltrados = lancheFiltrado
  renderizarLanches(lanchesFiltrados)
})

function colocarLetra(letra) {
  console.log(letra);
  document.getElementById('inputNome').value += letra
}

function apagar(){
  // Obtém o valor atual do input
  let currentValue = document.getElementById('inputNome').value;
  // Remove o último caractere do valor
  let newValue = currentValue.slice(0, -1);
  // Atualiza o valor do input com o novo valor sem o último caractere
  document.getElementById('inputNome').value = newValue;
}

function confirmarNome(){
  nomeCliente = document.getElementById('inputNome').value
  document.getElementById('colocarNome').classList.add('ocultar')
  document.getElementById('inicio').classList.remove('ocultar')
}