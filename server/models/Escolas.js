const moment = require('moment')
const { query } = require('../infraestrutura/conexao')
const conexao = require('../infraestrutura/conexao')
const session = require('express-session')


class Escolas {

    escolasUsuario(usuario, res) {

        const sql = 'SELECT e.nome, e.id FROM escola_permissao as ep right join escola as e on e.id = ep.id_escola  WHERE ep.id_usuario = ? or e.id_usuario = ?'
        usuario = session.user.id
        const values = [usuario, session.user.id]

        conexao.query(sql, values, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            }
            else {
                res.json(resultados)
            }
        })
    }

    escolasCriar(usuario, res) {

        let userID = session.user.id
        let escola = usuario.nome
        const values = {
            nome: escola, 
            id_usuario: userID}

        const sql = 'INSERT INTO escola SET ?'

        console.log(values)

        conexao.query(sql, values, (err) => {
            if (err) {
                console.log(err)
                res.json(err)
            } else {
                res.json(escola)
            }
        })
    }
}



module.exports = new Escolas