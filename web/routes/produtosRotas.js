var express = require("express");
var router = express.Router();

const ProdutoController = require("../controllers/ProdutoController");

router.get("/cadastro", ProdutoController.cadastroProduto);
router.get("/", ProdutoController.listarProduto);
router.post("/cadastrarProduto", ProdutoController.cadastrarProduto);
router.post('/editarProdutoPost', ProdutoController.updateProdutoPost)
router.post('/editarProduto', ProdutoController.updateProduto)
router.post('/deletarProduto', ProdutoController.deletarProduto)


module.exports = router;