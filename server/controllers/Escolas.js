const Escolas = require('../models/Escolas')

module.exports = app => {
    app.get('/escolas', (req, res) => {

        Escolas.escolasUsuario(req, res)
    
    })

    app.post('/criarEscola', (req, res) => {
        
        const escola = req.body
        console.log(escola)

        Escolas.escolasCriar(escola,res)

    })
}
