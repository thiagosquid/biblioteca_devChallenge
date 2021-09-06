const url = 'http://localhost:1234/'
const listBooks = document.getElementById('listBooks')
const textArea = document.getElementById('bookList')
const insertBook = document.getElementById('insertBook')
const editBook = document.getElementById('editBook')
const bookId = document.getElementById('bookId')
const options = document.getElementById('list')
let seeCover = document.getElementById('seeCover')
let delBook = document.getElementById('delBook')
let local = localStorage.getItem("server")
listBooks.addEventListener('submit', getBooks)

function getBooks(e){
    e.preventDefault();
    let urlGET = url + "obras/"
    fetch(urlGET,{
        method: "GET",
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        }
    })
    .then(function(response) {
        return response.text();
      })
      .then(function(data) {
        localStorage.setItem("server", data)
        data = JSON.parse(data)
        printBooks(data)
        return data
    })
    
}

function printBooks(books){
    textArea.innerHTML = ""
    for(let i = 0; i < books.length; i++){
        textArea.innerHTML += `${books[i].id} - ${books[i].titulo} - ${books[i].editora} - ${books[i].autores}\n`
    }
}

insertBook.addEventListener('submit', (e) => {
    e.preventDefault();

    const titulo = insertBook.bookName.value;
    const editora = insertBook.editorName.value;
    const foto = insertBook.linkPic.value;
    const autores = insertBook.authorName.value;

    let urlPOST = url + "obra/"
    
    let teste = fetch(urlPOST,{
        method: "POST",
        body:JSON.stringify({
            "titulo":titulo,
            "editora":editora,
            "foto":foto,
            "autores":autores
        }),
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        }
    })
    .then(function(response) {
        return response.text();
      })
      .then(function(data) {
        data = JSON.parse(data)
        return
    })
    getBooks(e)
})

editBook.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = editBook.bookName.value;
    const editora = editBook.editorName.value;
    const foto = editBook.linkPic.value;
    const autores = editBook.authorName.value;

    let urlPUT = url + `obras/${editBook.bookId.value}`

    fetch(urlPUT,{
        method: "PUT",
        body:JSON.stringify({
            "titulo":titulo,
            "editora":editora,
            "foto":foto,
            "autores":autores
        }),
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        }
    })
    .then(function(response) {
        return response.text();
        })
        .then(function(data) {
        getBooks(e)
        return
    })
})

bookId.addEventListener('blur',(e) =>{
    e.preventDefault();
    let local = localStorage.getItem("server")
    local = JSON.parse(local)
    for(let i = 0; i < local.length; i++){
        if(local[i].id == editBook.bookId.value){
            editBook.bookName.value = local[i].titulo;
            editBook.editorName.value = local[i].editora;
            editBook.linkPic.value = local[i].foto;
            editBook.authorName.value = local[i].autores
            return
        }
    }
    editBook.bookName.value = "";
    editBook.editorName.value = "";
    editBook.linkPic.value = "";
    editBook.authorName.value = ""; 
})

options.addEventListener('focus', (e) => {
    e.preventDefault()
    let l = localStorage.getItem("server")
    l = JSON.parse(l)
    let titulo = []
    for(let i = 0; i < l.length; i++){
        titulo.push(l[i]["id"])
    }
    let select = document.getElementById('list')
    
    select.options.length = 0

    titulo.forEach((titulo)=>{
        option = new Option(titulo, titulo)
        select.options[select.options.length] = option
    })
})

seeCover.addEventListener('submit', (e)=>{
    e.preventDefault()
    document.getElementById('img').src = "-"
    let local = localStorage.getItem("server")
    local = JSON.parse(local)
    let select = document.getElementById('list')
    let sel = select.options[select.selectedIndex].value
    document.getElementById('img').src = local[sel-1].foto
    document.getElementById('img').style.display = 'block'
})

delBook.addEventListener('click', (e) => {
    e.preventDefault()
    let select = document.getElementById('list')
    let sel = select.options[select.selectedIndex].value
    let urlDELETE = url + `obras/${sel}`

    fetch(urlDELETE,{
        method: "DELETE",
        body:JSON.stringify({
            "id":sel
        }),
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        }
    })
    .then(function(response) {
        return response.text();
        })
        .then(function(data) {
        getBooks(e)
        return
    })
})