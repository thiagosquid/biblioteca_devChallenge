const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const PORT = 1234
const biblioteca = {
        obras: [
        {
        "id": 1,
        "titulo": "Harry Potter",
        "editora": 'Rocco',
        "foto": 'https://i.imgur.com/UH3IPXw.jpg',
        "autores": ["JK Rowling", "..."]
        }
    ]
}

app.use(bodyParser.json({ type: 'application/*+json' }))

/* [POST] /obras : A rota deverá receber titulo, editora, foto, e autores dentro do corpo da requisição. Ao cadastrar um novo projeto, ele deverá ser armazenado dentro de um objeto no seguinte formato: { id: 1, titulo: 'Harry Potter', editora: 'Rocco',foto: 'https://i.imgur.com/UH3IPXw.jpg', autores: ["JK Rowling", "..."]}; */

app.post('/obra', jsonParser, (req,res) => {
    let {titulo, editora, foto, autores} = req.body
    if(biblioteca.obras.length > 0){
    biblioteca.obras.push({
        "id" : ((biblioteca.obras[biblioteca.obras.length - 1].id) + 1),
        "titulo": titulo,
        "editora": editora,
        "foto": foto,
        "autores": autores})
    }else{
        biblioteca.obras.push({
            "id" :  1,
            "titulo": titulo,
            "editora": editora,
            "foto": foto,
            "autores": autores})
    }
    res.type('application/json')
    res.send(JSON.stringify({included : true}))
})


/* [GET] /obras/ : A rota deverá listar todas as obras cadastradas */
app.get('/obras/',(req,res)=>{
    res.type('application/json')
    res.json(biblioteca.obras)
})

/* [PUT] /obras/🆔 : A rota deverá atualizar as informações de titulo, editora, foto e autores da obra com o id presente nos parâmetros da rota */

app.put('/obras/:id', jsonParser, (req,res) => {
    let {titulo, editora, foto, autores} = req.body
    let tam = biblioteca.obras.length
    for(let i = 0; i < tam; i++){
        if(req.params.id == biblioteca.obras[i].id){
            biblioteca.obras[i] = {
                    "id" : req.params.id,
                    "titulo": titulo,
                    "editora": editora,
                    "foto": foto,
                    "autores": autores}
            break
        }
    }
    res.type('application/json')
    res.json({changed : true})
})

/* [DELETE] /obras/🆔 : A rota deverá deletar a obra com o id presente nos parâmetros da rota */

app.delete('/obras/:id', jsonParser, (req,res) => {
    //let {titulo, editora, foto, autores} = req.body
    let tam = biblioteca.obras.length
    for(let i = 0; i < tam; i++){
        if(req.params.id == biblioteca.obras[i].id){
            biblioteca.obras.splice(i,i+1)
            break
        }
    }
    res.type('application/json')
    res.json({deleted : true})
})

app.listen(PORT, () => console.log("Server is Running"))