const mongoose = require('mongoose')
// obter do compass (string para conexão com o banco)
let url = "mongodb+srv://admin:123%40senac@hamburgueria.tvgp3z1.mongodb.net/dblanches"

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