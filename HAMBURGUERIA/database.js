const mongoose = require('mongoose')
// obter do compass (string para conexão com o banco)
let url = ""



//função para conectar o banco 
const conectar = async () => {
    //tratamento de exceção
    try {
        await mongoose.connect(url)
        console.log("MongoDB conectado")
    } catch (error) {
        console.log("Problema detectado: ", error.message)
        throw error
    }
}

//função para desconectar o banco

const desconectar = async () => {
    try {
        await mongoose.disconnect(url)
        console.log("MongoDB desconectado")
    } catch (error) {
        console.log("Problema detectado: ", error.message)
        throw error
    }
}


//exportar o modulo -> main.js
module.exports = {conectar, desconectar}