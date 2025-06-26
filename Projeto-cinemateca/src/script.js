const nameInput=document.getElementById("movie-name");
const yearInput=document.getElementById("movie-year");
const searchBtn=document.getElementById("btn-search");
const movieList=document.getElementById("movie-list");
const overlay=document.getElementById("modal-overlay");
let myList=[];

async function searchBtnHandler() {    
    try {
        const t=nameInput.value?
                "&t="+nameInput.value.split(" ").join("+"):
                ((error)=>{throw new Error("O nome deve ser preenchido");})();
                
        const y=yearInput.value!==""?
                (yearInput.value.length===4?
                "&y="+yearInput.value:
                ((error)=>{throw new Error("Ano deve conter 4 dígitos");})()):
                "";

        const url=`http://www.omdbapi.com/?${ApiKey}${t}${y}`;       
        
        const response= await fetch(url);
        const data= await response.json();
        console.log(data);
        if (data.Error){
            throw new Error("Filme não encontrado")
        };

        createModal(data);
        overlay.classList.add('open');
    } catch (error) {
        console.log(error.message)
        notie.alert({ type: "error", text: error.message })
      
    }
}
searchBtn.addEventListener("click",searchBtnHandler);

function addToMyList(data) {
    myList.push(data);
}


function isAlreadyListed(id) {
    return Boolean(myList.find((data)=>{return data.imdbID===id}));
}


function updateUI(data){
    movieList.innerHTML+=`
             <article>
                <img src=${data.Poster} alt="Poster do filme ${data.Title}">
                <button id="remove"><i class="bi bi-trash"></i>Remover</button>
            </article>`
}

//  Ao aninhar operadores ternários, é recomendado usar parênteses para garantir a ordem de avaliação correta e evitar ambiguidades.

// Variáveis declaradas em outros arquivos .js, de forma global, podem ser chamadas nos arquivos que serão abertos  posteriormente

// para realizarmos uma requisição à um servidor, é preciso entender que haverá uma ordem de resposta de solicitações, por isso devemos adicionar a expressão "async" antes da função e a expressão "await" antes do método fetch()
// O fetch não é um método de um objeto específico, mas sim uma função global do JavaScript para fazer requisições HTTP.


