const background=document.getElementById("modal-overlay");
const container=document.getElementById("modal-container");
let currentMovie={};

function createModal(data) {
    container.style.width="90vw";
    container.style.maxWidth="500px";  
    
    currentMovie=data;
        
        container.innerHTML=`                               
                <h2 id="modal-title">${data.Title} -  ${data.Year}</h2>
                <section id="modal-body">
                    <img id="poster" src=${data.Poster} alt="Poster do filme" >
                
                    <div id="movie-info">
                        <p id="movie-plot">${data.Plot}</p>
                        
                        <div id="movie-cast">
                            <h4>Elenco:</h4>
                            <h5>${data.Actors}</h4>  
                        </div>

                        <div id="movie-genre">
                             <h4>Gênero:</h4> 
                             <h5>${data.Genre}</h5>
                        </div>
                    </div>
                </section>
                <section id="modal-footer">
                        <button id="add-to-list" onClick="addCurrentToList()">Adicionar à lista</button>
                </section>`
    // const btn = document.getElementById("add-to-list");
    setTimeout(() => {
       document.getElementById("add-to-list").focus();
    }, 5);
            
            }

background.addEventListener("click",backgroundClose);

function addCurrentToList() {
    if (isAlreadyListed(currentMovie.imdbID)){
        notie.alert({type:3,text:"Já estava na sua lista"});
    }else{
        addToMyList(currentMovie);
        updateUI(currentMovie);
        backgroundClose();
        updateLocalStore();
        nameInput.value="";        
    }
    nameInput.focus(); 
}

function backgroundClose(){
        background.classList.remove("open"); 
};

