const mongoose = require("mongoose");
require("../models/Categoria");
const Categoria = mongoose.model("categorias");

module.exports = class CategoriaController {
    static cadastroCategoria(req, res) {
        res.render("categorias/cadastro");
    }
    static listarCategoria(req, res) {
        Categoria.find().then((categorias) => {
            res.render("categorias/listaCategoria", { categorias: categorias });
        });
    }


    static cadastrarCategoria(req, res) {
        var erros = [];
        if (!req.body.nome) {
            erros.push({ texto: "Nome inválido" });
        }


        if (erros.length > 0) {
            res.render("categorias/cadastro", { erros: erros });
        } else {
            const categoria = {
                nome: req.body.nome

            };
            new Categoria(categoria)
                .save()
                .then(() => {
                    req.flash("success_msg", "categoria salvo com sucesso!");
                    res.redirect("/categorias/cadastro");
                })
                .catch((erro) => {
                    req.flash("error_msg", `Erro ao salvar: ${erro}`);
                    res.redirect("/categorias/cadastro");
                });
        }
    }

    static updateCategoria(req, res) {
        Categoria.findOne({ _id: req.body.id }).then((categoria) => {
            res.render('categorias/editarCategoria', { categoria: categoria }) //renderizando uma view!!!!
        }).catch((erro) => {
            req.flash("error_msg", "categoria inexistente.")
            res.redirect('/categorias')
        })

    }
    static updateCategoriaPost(req, res) {
        const CategoriaUpdate = {
            nome: req.body.nome
        }
        Categoria.updateOne({ _id: req.body.id }, CategoriaUpdate).then(() => {
            req.flash("success_msg", "categoria editado com sucesso!")
            res.redirect('/categorias')
        }).catch((erro) => {
            req.flash("error_msg", `Erro ao editar: ${erro}`)
            res.redirect('/categorias')
        })
    }
    static deletarCategoria(req, res) {
        Categoria.remove({ _id: req.body.id }).then(() => {
            req.flash("success_msg", `categoria excuído com sucesso!`)
            res.redirect('/categorias')
        }).catch((erro) => {
            req.flash('error_msg', `Erro ao deletar categoria: ${erro}`)
            res.redirect('/categorias')
        })

    }
}