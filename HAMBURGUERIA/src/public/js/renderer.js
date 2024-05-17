const { ipcRenderer } = require("electron");

//--------------------------VARIAVEIS-----------------------------
let arrayLanches = [];

let updateStatus = false;

lista = document.querySelector("#cardapio");
paginaLanche = document.querySelector("#lanche")
nomeLanche = document.querySelector("#nomeLanche")

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

function pegarLanche(){
    let nome = document.getElementById("nomeLanche").innerHTML
    ipcRenderer.send('buscar-lanche', nome)
}

// ipcRenderer.on('lanche-data', async (event, lancheDados) => {
//     const lanche = JSON.parse(lancheDados)
//     arrayLanches = lanche
//     ipcRenderer.send('array-lanche',arrayLanches)
// })

//--------------------------RENDERIZAÇÃO-----------------------------
function renderizarLanches(lanche) {
  lista.innerHTML = ""; //Limpar a lista
  //percorrer o array
lanche.forEach((t) => {
    lista.innerHTML += `

<a class="lanche" href="#" id="produto" onclick="lancheSelecionado()">
    <img src="../public/img/alelo.png" alt="" class="imagemLanche">
    <h3 class="nomeLanche" id="nomeLanche">${t.nome}</h3>
    <p class="preco">${t.preco}</p>
</a>
`;
});
}

function lancheSelecionado(){
document.getElementById('lancheSelecionado').innerHTML += `
<div  class="lancheSelecionado">
<img src="../public/img/alelo.png" alt="">
<h2>Lanche</h4>
<p>descricao</p>
<p class="">preco</p>
<button>adicionar</button>
</div>
`
document.querySelector('.inicio').classList.add("blur")
document.querySelector('.inicio').disable
}

/**
 *  <section class="lancheSelecionado">
      <img src="../public/img/alelo.png" alt="">
      <h2>Lanche</h4>
      <p>descricao</p>
      <p class="preco">preco</p>
      <button>adicionar</button>
    </section>
 */