const mongoose = require("mongoose");
require("../models/Produto");
const Produto = mongoose.model("produtos");


module.exports = class ProdutoController {
    static cadastroProduto(req, res) {

        res.render("produtos/cadastro");
    }

    static listarProduto(req, res) {
        Produto.find().then((produtos) => {
            res.render("produtos/listaProduto", { produtos: produtos });
        });
    }

    static cadastrarProduto(req, res) {
        var erros = [];
        if (!req.body.nome) {
            erros.push({ texto: "Nome inválido" });
        }
        if (!req.body.valor) {
            erros.push({ texto: "Valor inválido" });
        }
        if (!req.body.descricao) {
            erros.push({ texto: "Descrição inválida" });
        }
        if (erros.length > 0) {
            res.render("produtos/cadastro", { erros: erros });
        } else {
            const produto = {
                nome: req.body.nome,
                valor: req.body.valor,
                descricao: req.body.descricao,
                categoria: req.body.categoria,
            };
            new Produto(produto)
                .save()
                .then(() => {
                    req.flash("success_msg", "Produto salvo com sucesso!");
                    res.redirect("/produtos/cadastro");
                })
                .catch((erro) => {
                    req.flash("error_msg", `Erro ao salvar: ${erro}`);
                    res.redirect("/produtos/cadastro");
                });
        }
    }

    static updateProduto(req, res) {
        Produto.findOne({ _id: req.body.id })
            .then((produto) => {
                res.render("produtos/editarProduto", { produto: produto });
            })
            .catch((erro) => {
                req.flash("error_msg", "Produto não existe.");
                res.redirect("/produtos");
            });
    }
    static updateProdutoPost(req, res) {
        const ProdutoUpdate = {
            nome: req.body.nome,
            valor: req.body.valor,
            descricao: req.body.descricao,
        };
        Produto.updateOne({ _id: req.body.id }, ProdutoUpdate)
            .then(() => {
                req.flash("success_msg", "Produto editado com sucesso!");
                res.redirect("/produtos");
            })
            .catch((erro) => {
                req.flash("error_msg", `Erro ao editar: ${erro}`);
                res.redirect("/produtos");
            });
    }
    static deletarProduto(req, res) {
        Produto.remove({ _id: req.body.id })
            .then(() => {
                req.flash("success_msg", `Produto excuído com sucesso!`);
                res.redirect("/produtos");
            })
            .catch((erro) => {
                req.flash("error_msg", `Erro ao deletar produto: ${erro}`);
                res.redirect("/produtos");
            });
    }
};