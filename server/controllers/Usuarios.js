const session = require('express-session')
const Usuario = require('../models/Usuarios')

module.exports = app => {

    app.post('/register', (req, res) => {
        let cpf = req.body.cpf
        let email = req.body.email
        let registro = req.body
        console.log(registro)
        
        //Verifica se o CPF é real
         Usuario.verificarCpf(cpf, res)
        //Verifica se o CPF já foi cadastrado
        Usuario.cpfCadastrado(cpf, res) 
        //Verifica se o EMAIL já foi cadastrado
        Usuario.emailCadastrado(email, res)
        //Registra o usuario
        Usuario.adiciona(registro, res)
    })

    app.post('/login', (req, res) => {

        const login = req.body
        console.log(login)

        Usuario.Login(login, res)
    })

    app.get('login', (req, res) => {
        if (session.user) {
            res.send({loggedIn: true, user: req.session.user})
        } else {
            res.send({loggedIn: false})
        }
    })

    
    app.post('/trocarSenha', (req, res) => {

        const user = req.body

        Usuario.trocarSenha(login, res)
    })

    /*app.patch('/usuarios/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Usuario.altera(id, valores, res)
    })*/

    /*app.delete('/usuarios/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Usuario.deleta(id, res)
    })*/
}