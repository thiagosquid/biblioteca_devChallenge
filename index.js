const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 1234
let biblioteca = {
    obras: 
    [
        {
        "id": 1,
        "titulo": "Harry Potter",
        "editora": 'Rocco',
        "foto": 'https://i.imgur.com/UH3IPXw.jpg',
        "autores": ["JK Rowling", "..."]
        },
        {
        "id": 2,
        "titulo": "O Senhor dos Anéis",
        "editora": 'HarperCollins',
        "foto": 'https://loja.taglivros.com/media/catalog/product/cache/1/image/278x425/9df78eab33525d08d6e5fb8d27136e95/s/o/sociedadeanel.png',
        "autores": ["J.R.R. Tolkien", "..."]
        },
        {
        "id": 3,
        "titulo": "Memórias Póstumas de Brás Cubas",
        "editora": 'Principis',
        "foto": 'https://images-na.ssl-images-amazon.com/images/I/61Us+SweQDL.jpg',
        "autores": ["Machado de Assis", "..."]
        }
    ]
}
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

/* [POST] /obras : A rota deverá receber titulo, editora, foto, e autores dentro do corpo da requisição. Ao cadastrar um novo projeto, ele deverá ser armazenado dentro de um objeto no seguinte formato: { id: 1, titulo: 'Harry Potter', editora: 'Rocco',foto: 'https://i.imgur.com/UH3IPXw.jpg', autores: ["JK Rowling", "..."]}; */

app.post('/obra', (req,res) => {
    let {titulo, editora, foto, autores} = req.body
    if(biblioteca.obras.length > 0){
    biblioteca.obras.push({
        "id" : ((biblioteca.obras[biblioteca.obras.length - 1].id) + 1),
        "titulo":titulo,
        "editora":editora,
        "foto":foto,
        "autores":autores})
    }else{
        biblioteca.obras.push({
            "id" :  1,
            "titulo":titulo,
            "editora":editora,
            "foto":foto,
            "autores":autores})
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

app.put('/obras/:id', (req,res) => {
    let {titulo, editora, foto, autores} = req.body
    let tam = biblioteca.obras.length
    for(let i = 0; i < tam; i++){
        if(req.params.id == biblioteca.obras[i].id){
            biblioteca.obras[i] = {
                    "id" : Number(req.params.id),
                    "titulo":titulo,
                    "editora":editora,
                    "foto":foto,
                    "autores":autores}
            break
        }
    }
    res.type('application/json')
    res.json({changed : true})
})

/* [DELETE] /obras/🆔 : A rota deverá deletar a obra com o id presente nos parâmetros da rota */

app.delete('/obras/:id', (req,res) => {
    let tam = biblioteca.obras.length

    for(let i = 0; i < tam; i++){
        if(req.params.id == biblioteca.obras[i].id){
            biblioteca.obras.splice(i,1)
            break
        }
    }
    res.type('application/json')
    res.json({deleted : true})
})

app.listen(PORT, () => console.log("Server is Running"))