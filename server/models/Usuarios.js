const moment = require('moment')
const { query } = require('../infraestrutura/conexao')
const conexao = require('../infraestrutura/conexao')

const bcrypt = require('bcrypt')
const session = require('express-session')
const saltRounds = 10
let cpfInvalido = false
let cpfCadastrado = false
let emailCadastrado = false

class Usuario {

    verificarCpf(usuario, res) {
        const cpf = usuario

        let Soma = 0
        let Resto = 0
        let i = 0

        if (cpf == "00000000000" || cpf.length != 11) {
            cpfInvalido = true
        }

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(cpf.substring(9, 10))) {
            cpfInvalido = true
        }

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(cpf.substring(10, 11))) {
            cpfInvalido = true
        }

    }

    cpfCadastrado(usuario, res) {
        if (cpfInvalido == false) {
            const cpf = usuario
            const sql = 'select * from usuarios where cpf = ?'

            conexao.query(sql, cpf, (erro, resultados) => {

                if (resultados.length > 0) {
                    cpfCadastrado = true
                }
            })
        }

    }

    emailCadastrado(usuario, res) {
            const email = usuario
            console.log(email)
            const emailSql = 'select * from usuarios where email = ?'

            conexao.query(emailSql, email, (erro, resultados) => {
                console.log(resultados.length)
                if (resultados.length > 0) {
                    emailCadastrado = true
                }
            })
        }


    adiciona(usuario, res) {

        console.log(cpfCadastrado, emailCadastrado, cpfInvalido)
        if (cpfCadastrado == false && cpfInvalido == false && emailCadastrado == false) {
            const sql = 'INSERT INTO usuarios SET ?'

            bcrypt.hash(usuario.senha, saltRounds, (err, hash) => {
                if (err) {
                    console.log(err)
                }
                usuario.senha = hash

                conexao.query(sql, usuario, (erro) => {
                    if (erro) {
                        res.json(erro)
                    } else {
                        res.json(usuario)
                    }
                })
            })
        } else {
            if (cpfInvalido == true) {
                res.send({ message: 'Cpf invalido' })
            }
            else {
                if(cpfCadastrado == true) {
                    res.send({ message: 'Cpf Já cadastrado' })
                }
                else {
                    res.send({ message: 'Email já cadastrado'})
                }
            }
            cpfInvalido = false
            cpfCadastrado = false
            emailCadastrado = false
        }
    }

    Login(login, res) {
        const user = login.login
        const pass = login.senha
        let sql = ''

        if (Number.isInteger(user * 1)) {
            sql = `SELECT * FROM usuarios WHERE cpf= ?`
        } else (
            sql = `SELECT * FROM usuarios WHERE email= ?`
        )

        conexao.query(sql, user, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            }

            console.log(resultados)

            if (resultados.length > 0) {
                bcrypt.compare(pass, resultados[0].senha, (error, response) => {
                    if (response) {
                        session.user = resultados[0]
                        res.send({ message: session.user})
                    }
                })
            } else {
                res.send({ message: "Combinação invalida" })
            }
        })

    }

    altera(id, valores, res) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }
        const sql = 'UPDATE usuarios set ? WHERE id=?'

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ ...valores, id })
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM usuarios where id =?'

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id })
            }
        })
    }

    trocarSenha(id, senha, res) {
        const sql = 'update usuarios set ? where id=?'

        bcrypt.hash(senha, saltRounds, (err, hash) => {
            if (err) {
                console.log(err)
            }
            senha = hash

            conexao.query(sql,[senha, id], (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                }
                else {
                    res.send({ message: "Troca realizada" })
                }
            } )
        })

        
    }
}

module.exports = new Usuario