const mongoose = require("mongoose");
require("../models/Admin");
const Admin = mongoose.model("admin");
const bcrypt = require("bcryptjs");

module.exports = class AdminController {
    static registro(req, res) {
        res.render("administrador/registro");
    }
    static lista(req, res) {
        Admin.find().then((admin) => {
            res.render("administrador/lista", { admin: admin });

        });
    }

    static registroPost(req, res) {
        var erros = [];
        if (!req.body.nome ||
            typeof req.body.nome == undefined ||
            req.body.nome == null
        ) {
            erros.push({ texto: "Nome inválido" });
        }
        if (!req.body.email ||
            typeof req.body.email == undefined ||
            req.body.email == null
        ) {
            erros.push({ texto: "E-mail inválido" });
        }
        if (!req.body.senha ||
            typeof req.body.senha == undefined ||
            req.body.senha == null ||
            req.body.senha < 4
        ) {
            erros.push({
                texto: "Senha inválida ou senha com menos de 4 algarismos",
            });
        }
        if (req.body.senha != req.body.senha2) {
            erros.push({ texto: "Senhas diferentes. Tente novamente" });
        }
        if (erros.length > 0) {
            res.render("administrador/registro", { erros: erros });
        } else {
            const admin = {
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha,
            };
            bcrypt.genSalt(10, (erro, salt) => {
                bcrypt.hash(admin.senha, salt, (erro, hash) => {
                    admin.senha = hash;
                    new Admin(admin)
                        .save()
                        .then(() => {
                            req.flash("success_msg", "Adminstrador salvo");
                            res.redirect("/administrador/lista");
                        })
                        .catch((erro) => {
                            req.flash("error_msg", `Erro ao salvar: ${erro}`);
                            res.redirect("/administrador/lista");
                        });
                });
            });
        }
    }
    static deletarAdmin(req, res) {
        Admin.remove({ _id: req.body.id })
            .then(() => {
                req.flash("success_msg", ` excuído com sucesso!`);
                res.redirect("/lista");
            })
            .catch((erro) => {
                req.flash("error_msg", `Erro ao deletar: ${erro}`);
                res.redirect("/lista");
            });
    }
};