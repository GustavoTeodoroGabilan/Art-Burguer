const { ipcRenderer } = require('electron')

let arrayLanches = []

let updateStatus = false

lista = document.querySelector('#cardapio')

ipcRenderer.send('get-lanches')
//Passo 3 (slide) receber as 
ipcRenderer.on('get-option', (event, args) => {
    console.log(args)
    const opcoesLanches = JSON.parse(args)
    arrayLanches = opcoesLanches
    console.log(arrayLanches)
    renderizarCadastros(arrayLanches)
})

function renderizarCadastros(tasks) {
lista.innerHTML="" //Limpar a lista
//percorrer o array
tasks.forEach((t) => {
lista.innerHTML += `

<a class="lanche" href="#">
          <img src="../public/img/alelo.png" alt="" class="imagemLanche">
          <h3 class="nomeLanche">${t.nome}</h3>
          <p class="preco">${t.preco}</p>
</a>
`  
})

}