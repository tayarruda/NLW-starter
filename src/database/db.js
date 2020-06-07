//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar o objeto que ira fazer operacoes no banco de dados
const db = new sqlite3.Database("./src/database/database.db")
//depois daqui, rodando no terminal node /src/database/db.js é criado o banco de dados o arquivo database.db

module.exports = db


//utilizar o objeto db para nossas operações com banco de dados
//serialize quer dizer que vai rodar uma sequencia de codigo

db.serialize(() => {
    //com uso dos comandos sql pelo objeto db
    //criar uma tabela 
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places(
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)
    // const query = `
    //     INSERT INTO places (
    //         image,
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?);

    // `
    // const values = [
    //     "https://upload.wikimedia.org/wikipedia/commons/1/16/Paper_recycling_in_Ponte_a_Serraglio.JPG",
    //     "Papersider",
    //     "Gilherme Genballa, Jardim America",
    //     "Numero 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Resíduos Eletrônicos, Lâmpadas"
    // ]

    // function afterInsertData(err){
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log("Cadastrado com Sucesso")
    //     console.log(this)
    // }

    // //inserir dados na tabela
    // db.run(query, values, afterInsertData)

    // //consultar dados na tabela
    // db.all(`SELECT * FROM places`, function(err, rows){
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log("Aqui estao seus registros")
    //     console.log(rows)
    // })

    //deletar um dado da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [13], function(err){
    //     if(err){
    //         return console.log(err)
    //     }  
    //     console.log("Registro deletado com sucesso")
    // })

})