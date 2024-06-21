const {model, Schema} = require('mongoose')

const pedidoSchema = new Schema({
    nome: {
        type: String
    },
    status:{
        type: String
    }
})

module.exports = model('Pedido', pedidoSchema)