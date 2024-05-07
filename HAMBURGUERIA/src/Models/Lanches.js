const {model, Schema} = require('mongoose')

const lancheSchema = new Schema({
    nome: {
        type: String
    },
    descricao: {
        type: String
    },
    preco: {
        type: String
    },
    imagem:{
        type: String
    }
})

module.exports = model('Lanches', lancheSchema)