const { ipcRenderer } = require("electron");

//--------------------------VARIAVEIS-----------------------------
let arrayLanches = [];
let arrayLancheSelecionado = [];
let lancheIndividual = document.getElementById("produto");
let arrayPedidos = [];
let arrayCalculos = [];
let arrayRenderiza = []


//let calculo = 0
let preco;

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
    
  }

  function telaConfirmacao() {
    document.getElementById("paginaPagamento").classList.add("ocultar");
    document.getElementById("paginaConfirmacao").classList.remove("ocultar");
    //console.log(arrayCalculos);
    //pedidosConfirmacoes(arrayCalculos)



    
    // arrayPedidos.forEach((t) => {
    //   ipcRenderer.send("get-valor-lanche", t);
    // });
  }

  function paginaPagamento(){
    document.getElementById("confirmarPedido").classList.add("ocultar")
    document.getElementById("paginaPagamento").classList.remove("ocultar")
  }
  //--------------------------RENDERIZAÇÃO-----------------------------
  function renderizarLanches(lanche) {
    lista.innerHTML = ""; //Limpar a lista
    let contador = 0;
    //percorrer o array
    lanche.forEach((t) => {
      lista.innerHTML += `
<a class="lanche" href="#" id="produto" onclick="pegarLanche('${t.nome}')">
    <img src="${t.imagem}" alt="" class="imagemLanche">
    <h3 class="nomeLanche" id="nomeLanche">${t.nome}</h3>
    <p class="preco">R$${t.preco}</p>
</a>
`;
    });
  }

  function lancheSelecionado(lanche) {
    lanche.forEach((t) => {
      document.getElementById("lancheSelecionado").innerHTML += `
        <div  class="lancheSelecionado crescer">
        <img src="${t.imagem}" alt="">
        <h2>${t.nome}</h4>
        <p>${t.ingredientes}</p>
        <p class="">R$${t.preco}</p>
        <button id="addPedido" onclick="novoPedido('${t.nome}')">adicionar</button>
        </div>
        `;
    });
    document.querySelector(".inicio").classList.add("blur");
    document.querySelector(".inicio").disable;
  }

  function pedidosConfirmacoes(pedidos){
    console.log("-------")
    console.log(pedidos)
   document.getElementById('pedidosFeitos').innerHTML += ""
    pedidos.forEach((t) => {
      document.getElementById('pedidosFeitos').innerHTML += `
         <div class="cardPedido">
          <img src="${t.imagem}" alt="" class="imagemLanche" />
          <div class="titleDesc">
            <h1>${t.nome}</h1>
          </div>
          <h3>R$${t.preco}</h3>
          <button class="botaoRemover"></button>
        </div>
      `
    })
  }

  // function calcularTotal(precoLanche) {
  //   precoLanche.forEach((t) => {
  //     let valorLanche = Number(t.preco)
  //     let soma = 0
  //     soma += valorLanche
  //   })

  //   document.getElementById("valorTotal").innerText = `R$${calculo}`;
  // }

