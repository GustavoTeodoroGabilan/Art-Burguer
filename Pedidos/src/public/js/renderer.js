const { ipcRenderer } = require("electron");

let arrayPedidos = []
lista = document.getElementById('preparando')

ipcRenderer.send('send-message', "status do banco de dados: ");

ipcRenderer.send("get-pedidos");
//Passo 3 (slide) receber as
ipcRenderer.on("get-pedidos-feitos", (event, args) => {
  const pedidos = JSON.parse(args);
  arrayPedidos = pedidos;
  renderizarPedidos(arrayPedidos);
});

function renderizarPedidos(lanche) {
    lista.innerHTML = ""; //Limpar a lista
    lanche.forEach((t) => {
      lista.innerHTML += `
        <div class="pedido">
                    <h2>${t.nome}</h2>
                </div>
      `
;
    });
  }

// Seleciona os elementos HTML relevantes
const pedidosProntos = document.querySelector('.pedidosProntos');
const pedidosPreparando = document.querySelector('#preparando');

let arrayProntos=[]

ipcRenderer.send("get-prontos");
ipcRenderer.on("get-pedidos-prontos", (event, args) => {
  const pedidos = JSON.parse(args);
  arrayProntos = pedidos;
  renderizarProntos(arrayProntos);
});

function renderizarProntos(lanche) {
  document.getElementById("pronto").innerHTML = ""; //Limpar a lista
  lanche.forEach((t) => {
    document.getElementById("pronto").innerHTML += `
      <div class="pedidosProntos">
                  <h2>${t.nome}</h2>
              </div>
    `
;
  });
}

