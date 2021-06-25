class Tabelas {
    init(conexao) {
        this.conexao = conexao

        this.criarUsuarios()
    }

    criarUsuarios() {
        const sql = 'CREATE TABLE IF NOT EXISTS usuarios (id int NOT NULL AUTO_INCREMENT,nome varchar(100) NOT NULL,data_nascimento date NOT NULL,cpf varchar(11) NOT NULL,email varchar(50) NOT NULL,senha varchar(255) DEFAULT NULL,PRIMARY KEY (id))'

        this.conexao.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } 
        })
    }
}

module.exports = new Tabelas