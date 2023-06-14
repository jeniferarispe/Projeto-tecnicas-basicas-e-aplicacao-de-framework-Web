var express = require("express");
var router = express.Router();

const CategoriaController = require("../controllers/CategoriaController");

router.get("/cadastro", CategoriaController.cadastroCategoria);
router.get("/", CategoriaController.listarCategoria);
router.post("/cadastrarCategoria", CategoriaController.cadastrarCategoria);
router.post('/editarCategoriaPost', CategoriaController.updateCategoriaPost)
router.post('/editarCategoria', CategoriaController.updateCategoria)
router.post('/deletarCategoria', CategoriaController.deletarCategoria)


module.exports = router;