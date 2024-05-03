

document.querySelector('#telaComeco').addEventListener('click', () => {
    document.querySelector('#telaComeco').classList.add("subir")
})

document.querySelector('#promocoes').addEventListener('click', () => {
    document.querySelector('#promocoes').classList.add("crescer")
    document.querySelector('#bebidas').classList.remove("crescer")
    document.querySelector('#acompanhamentos').classList.remove("crescer")
    document.querySelector('#sobremesas').classList.remove("crescer")
    document.querySelector('#hamburguers').classList.remove("crescer") 
})

document.querySelector('#bebidas').addEventListener('click', () => {
    document.querySelector('#promocoes').classList.remove("crescer")
    document.querySelector('#bebidas').classList.add("crescer")
    document.querySelector('#acompanhamentos').classList.remove("crescer")
    document.querySelector('#sobremesas').classList.remove("crescer")
    document.querySelector('#hamburguers').classList.remove("crescer") 
})

document.querySelector('#acompanhamentos').addEventListener('click', () => {
    document.querySelector('#promocoes').classList.remove("crescer")
    document.querySelector('#bebidas').classList.remove("crescer")
    document.querySelector('#acompanhamentos').classList.add("crescer")
    document.querySelector('#sobremesas').classList.remove("crescer")
    document.querySelector('#hamburguers').classList.remove("crescer") 
})

document.querySelector('#sobremesas').addEventListener('click', () => {
    document.querySelector('#promocoes').classList.remove("crescer")
    document.querySelector('#bebidas').classList.remove("crescer")
    document.querySelector('#acompanhamentos').classList.remove("crescer")
    document.querySelector('#sobremesas').classList.add("crescer")
    document.querySelector('#hamburguers').classList.remove("crescer") 
})

document.querySelector('#hamburguers').addEventListener('click', () => {
    document.querySelector('#promocoes').classList.remove("crescer")
    document.querySelector('#bebidas').classList.remove("crescer")
    document.querySelector('#acompanhamentos').classList.remove("crescer")
    document.querySelector('#sobremesas').classList.remove("crescer")
    document.querySelector('#hamburguers').classList.add("crescer") 
})