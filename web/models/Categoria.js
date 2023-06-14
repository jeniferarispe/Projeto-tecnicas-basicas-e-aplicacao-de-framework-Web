const mongoose = require('../db/bancoMongoDB')
const Schema = mongoose.Schema

const Categoria = new Schema({
    nome: {
        type: String,
        required: true
    }
})
mongoose.model('categorias', Categoria)