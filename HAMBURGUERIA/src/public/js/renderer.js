const { ipcRenderer } = require("electron");

let arrayLanches = [];

let updateStatus = false;

lista = document.querySelector("#cardapio");

ipcRenderer.send('send-message', "Status do bando de dados:")

ipcRenderer.send("get-lanches");
//Passo 3 (slide) receber as
ipcRenderer.on("get-options", (event, args) => {
    console.log(args);
    const opcoesLanches = JSON.parse(args);
    arrayLanches = opcoesLanches;
    console.log(arrayLanches);
    renderizarLanches(arrayLanches);
});

function renderizarLanches(lanche) {
  lista.innerHTML = ""; //Limpar a lista
  //percorrer o array
lanche.forEach((t) => {
    lista.innerHTML += `

<a class="lanche" href="#">
    <img src="../public/img/alelo.png" alt="" class="imagemLanche">
    <h3 class="nomeLanche">${t.nome}</h3>
    <p class="preco">${t.preco}</p>
</a>
`;
});
}
