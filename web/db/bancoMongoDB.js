const mongo = require('mongoose')

mongo.connect('mongodb://localhost/Teste', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('****Conectado ao mongo*****')
    console.log('http://localhost:3150')
}).catch((error) => {
    console.log("Erro ao conectar ao MongoDB" + error)
})

module.exports = mongo