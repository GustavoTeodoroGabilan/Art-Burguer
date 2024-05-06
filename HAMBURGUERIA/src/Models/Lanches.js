const {model, Schema} = require('mongoose')

const lanche = new Schema({
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
        type: Image
    }
})

module.exports = model('Lanche', lancheSchema)