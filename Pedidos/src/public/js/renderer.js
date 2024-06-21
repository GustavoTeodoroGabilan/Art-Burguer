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

// Array para armazenar os nomes dos pedidos prontos
let nomesPedidosProntos = [];

function moverPedidoParaPronto() {
    // Verifica se há pedidos na seção "Preparando"
    if (pedidosPreparando.children.length > 0) {
        // Move o primeiro pedido da seção "Preparando" para "Pronto"
        const primeiroPedido = pedidosPreparando.firstElementChild;
        const nomePedido = primeiroPedido.innerText.trim();

        // Remove o pedido da seção "Preparando"
        pedidosPreparando.removeChild(primeiroPedido);

        // Adiciona o nome do pedido ao array de pedidos prontos
        nomesPedidosProntos.push(nomePedido);

        // Cria um novo elemento para representar o pedido na seção "Pronto"
        const novoPedidoPronto = document.createElement('div');
        novoPedidoPronto.classList.add('pedidoPronto');
        novoPedidoPronto.innerHTML = `<h2>${nomePedido}</h2>`;

        // Adiciona o novo pedido na seção "Pronto"
        pedidosProntos.appendChild(novoPedidoPronto);

        // Define um timeout para remover o primeiro pedido após 10 segundos
        setTimeout(() => {
            // Verifica se ainda há pedidos prontos e se o nome do primeiro pedido é igual ao nomePedido
            if (nomesPedidosProntos.length > 0 && nomesPedidosProntos[0] === nomePedido) {
                // Remove o primeiro pedido da seção "Pronto"
                pedidosProntos.removeChild(pedidosProntos.firstElementChild);
                // Remove o primeiro nome do array de pedidos prontos
                nomesPedidosProntos.shift();
            }
        }, 30000); // 10000 milissegundos = 10 segundos
    }
}

// Simula a mudança de status a cada 5 segundos
setInterval(moverPedidoParaPronto, 5000);

// Função para adicionar um novo pedido à seção "Preparando"
function adicionarNovoPedido(nomePedido) {
    // Cria um novo elemento para representar o pedido na seção "Preparando"
    const novoPedido = document.createElement('div');
    novoPedido.classList.add('pedido');
    novoPedido.innerHTML = `<h2>${nomePedido}</h2>`;

    // Adiciona o novo pedido na seção "Preparando"
    pedidosPreparando.appendChild(novoPedido);
}

// Exemplo de adição de novo pedido (pode ser chamado ao adicionar um cliente)
adicionarNovoPedido('Novo Cliente');
