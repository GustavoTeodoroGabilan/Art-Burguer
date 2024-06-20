const {model, Schema} = require('mongoose')

const pedidosSchema = new Schema({
    nome:{
        type:String
    }
})

module.exports = model('Pedidos', pedidosSchema)