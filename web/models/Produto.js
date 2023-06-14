const mongoose = require("../db/bancoMongoDB");
const Schema = mongoose.Schema;

const Produto = new Schema({
    nome: {
        type: String,
        required: true,
    },
    valor: {
        type: Number,
        min: 0,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    //  categoria: {
    ///  type: Schema.Types.ObjectId,
    //    ref: "Categoria",
    //     required: true,
    //   },
});
mongoose.model("produtos", Produto);