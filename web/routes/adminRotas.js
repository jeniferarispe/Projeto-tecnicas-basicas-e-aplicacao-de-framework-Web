var express = require("express");
var router = express.Router();

const AdminController = require("../controllers/AdminController");

router.get("/registro", AdminController.registro);
router.post("/registroPost", AdminController.registroPost);
router.get("/lista", AdminController.lista);
router.post('/deletarAdmin', AdminController.deletarAdmin)


module.exports = router;