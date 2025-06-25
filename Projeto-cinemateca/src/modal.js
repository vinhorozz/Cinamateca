const background=document.getElementById("modal-overlay");
const container=document.getElementById("modal-container")

function backgroundClickHandler(){
        background.classList.remove("open"); 
};

function createModal(data) {
        container.innerHTML=`                               
                <h2 id="modal-title">${data.Title}" - " ${data.Year}</h2>
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
                        <button id="add-to-list">Adicionar à lista</button>
                </section>`
}

background.addEventListener("click",backgroundClickHandler);
