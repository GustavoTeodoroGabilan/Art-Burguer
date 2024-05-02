const mongoose = require('mongoose')
// obter do compass (string para conexão com o banco)
let url = "mongodb://admin:123%40senac@10.26.49.217:27017/dblanches?authSource=admin"



const conectar = async () => {
    try {
        await mongoose.connect(url)
        console.log("MongoDB conectado")
    } catch (error) {
        console.log("Problema detectado: ", error.message)
        throw error
    }
}

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