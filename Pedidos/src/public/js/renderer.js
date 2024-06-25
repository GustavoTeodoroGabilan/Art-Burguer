const { ipcRenderer } = require("electron");

let arrayPedidos = []
lista = document.getElementById('preparando')

let arrayAlterar = []
let arrayAlterados = []
let arrayProntos=[]

ipcRenderer.send('send-message', "status do banco de dados: ");

ipcRenderer.send("get-pedidos");
//Passo 3 (slide) receber as
ipcRenderer.on("get-pedidos-feitos", (event, args) => {
  const pedidos = JSON.parse(args);
  arrayPedidos = pedidos;

  

  renderizarPedidos(arrayPedidos);
  let nomeClientePronto = arrayPedidos[0]
  ipcRenderer.send("buscar-nome", nomeClientePronto)


});

ipcRenderer.on("dado-cliente", async (event, dadoCliente) =>{
  let dadosCliente = JSON.parse(dadoCliente)
  arrayAlterar = dadosCliente
  arrayAlterar.forEach((t) => {
    let idCliente = t._id
    ipcRenderer.send("id-cliente", idCliente)
  })
})

function renderizarPedidos(lanche) {
  lista.innerHTML = ""; // Limpar a lista
  lanche.forEach((pedido, index) => {
    
    
     // Multiplicando o índice por 5000 para ter um atraso de 5 segundos entre cada envio
    lista.innerHTML += `
      <div class="pedido">
        <h2>${pedido.nome}</h2>
      </div>
    `;
  });
}


  
  setTimeout(function() {ipcRenderer.send('atualizar')} , 5000)
