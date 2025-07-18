const nameInput=document.getElementById("movie-name");
const yearInput=document.getElementById("movie-year");
const searchBtn=document.getElementById("btn-search");
const movieList=document.getElementById("movie-list");
const overlay=document.getElementById("modal-overlay");

let myList=JSON.parse(localStorage.getItem('movielist'))??[];//operador de coalicencia nula

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

function removeFromMyList(id,nome){

    notie.confirm({        
        text:`Deseja realmente remover\n\ ${nome}?`,
        submitText:"Sim",
        cancelText:"Não",
        position:"top",
        submitCallback:()=>{
            myList = myList.filter(movieID=> movieID.imdbID !==id);//remoção objeto
            document.getElementById(`${id}`).remove();//remoção do visual
            updateLocalStore();
        }})
}

function updateUI(data){
    movieList.innerHTML+=`
        <article id="${data.imdbID}">
            <img id="poster" src=${data.Poster} alt="Poster do filme ${data.Title}">
            <button id="remove" onClick="removeFromMyList('${data.imdbID}','${data.Title}')"><i class="bi bi-trash"></i>Remover</button>
        </article>`
}

movieList.addEventListener('click', function(event) {
 
    const img = event.target.closest('img#poster');
 
    if (img) {
        const article = img.closest('article');
        if (article) {
            const movieId = article.id;
            const movieData = myList.find(movie => movie.imdbID === movieId);
            if (movieData) {
                infoModal(movieData);
                overlay.classList.add('open');
            }
        }
    }
});

function updateLocalStore() {
    localStorage.setItem('movielist',JSON.stringify(myList));    
}


for (const movieInfo of myList) {
    updateUI(movieInfo);    
}

 

//  Ao aninhar operadores ternários, é recomendado usar parênteses para garantir a ordem de avaliação correta e evitar ambiguidades.

// Variáveis declaradas em outros arquivos .js, de forma global, podem ser chamadas nos arquivos que serão abertos  posteriormente

// para realizarmos uma requisição à um servidor, é preciso entender que haverá uma ordem de resposta de solicitações, por isso devemos adicionar a expressão "async" antes da função e a expressão "await" antes do método fetch()
// O fetch não é um método de um objeto específico, mas sim uma função global do JavaScript para fazer requisições HTTP.


//Relembrei que filter()"predicate" que avalia uma condição para cada elemento da lista, que  cria uma nova lista removendo o o elemento indicado pela chave;
// Aprendi sobre O operador de coalescência nula (??) em JavaScript retorna o valor do lado direito apenas se o valor do lado esquerdo for null ou undefined. Ele é útil para definir valores padrão sem sobrescrever valores considerados "falsy" como 0, '' (string vazia) ou false.

