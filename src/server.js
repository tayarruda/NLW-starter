//criar e iniciar o servidor com o express
const express = require("express")
//executando a função express() no server
const server = express()

//pegar o banco de dados
const db = require("./database/db")

//fazer com que o express enxergue a pasta public(styles, scripts)
server.use(express.static("public"))

//habilidar o uso do req.body na nossa aplicação para o cadastro de um ponto de coleta
server.use(express.urlencoded({ extended: true }))

//utilizando template engine após instalar nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar caminhos da minha aplicação

//caminho principal é a pagina inicial
//get é um verbo http que vai responder a função o pedido da pagina inicial
//req: requisição
//res: resposta
//servidor pede e recebe resposta
server.get("/", (req, res) => {
    return res.render("index.html")
})

//preciso configurar rotas para todas as paginas
server.get("/create-point", (req, res) => {

    //query strings da nossa url
    //console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    //requisicao - req.body - o corpo do nosso formulario
    //console.log(req.body)

    //inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);

    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no Cadastro")
        }

        console.log("Cadastrado com Sucesso")
        console.log(this)

        return res.render("create-point.html",{saved: true})
    }

    //inserir dados na tabela
    db.run(query, values, afterInsertData)

    
})

server.get("/search", (req, res) => {
    const search = req.query.search
    if(search == ""){
        //pesquisa vazia
        return res.render("search-results.html", {total: 0})
    }

    //pegar os dados do banco de dados
    // //consultar dados na tabela
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length
        //mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total })

    })
})


//ligar o servidor, ele fica ouvindo a porta 5000
server.listen(5300)