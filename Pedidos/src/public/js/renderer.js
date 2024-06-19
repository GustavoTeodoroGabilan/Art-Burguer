const { ipcRenderer } = require("electron");

let arrayPedidos = []


ipcRenderer.send("get-pedidos");
//Passo 3 (slide) receber as
ipcRenderer.on("get-pedidos-feitos", (event, args) => {
  const pedidos = JSON.parse(args);
  arrayPedidos = pedidos;
  renderizarPedidos(arrayPedidos);
});

function renderizarLanches(lanche) {
    lista.innerHTML = ""; //Limpar a lista
    lanche.forEach((t) => {
      lista.innerHTML += `
        <div class="pedido">
                    <h2>NOME</h2>
                </div>
      `
;
    });
  }