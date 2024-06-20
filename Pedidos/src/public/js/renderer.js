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