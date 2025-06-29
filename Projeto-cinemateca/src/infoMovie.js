
function infoModal(data) {
    container.style.width="400px";
    container.style.height="300px auto";
        container.innerHTML=` 
        <section id="info-movie">
                <div id="info-header">
                    <h2 id="info-title">${data.Title} -  ${data.Year}</h2>                
                    <img id="info-poster" src=${data.Poster}alt="Poster do filme" >
                </div>                   
                
                <section id="info-body">
                        <div><p id="movie-plot">${data.Plot}</p></div>
                    
                        <div id="movie-cast">
                            <h4>Elenco: </h4> 
                            <p>${data.Actors}</p>
                        </div>               
                        <div id="movie-genre">
                             <h4>Gênero: </h4>
                              <p>${data.Genre}</p> 
                        </div>
                        <div id="movie-duration">
                             <h4>Duração: </h4> 
                             <p>${data.Runtime}</p>
                        </div>
                        <div id="movie-director">
                             <h4>Diretor: </h4> 
                             <p>${data.Director}</p>
                        </div>                    
                        <div id="movie-country">
                             <h4>País: </h4> 
                             <p>${data.Country}</p>
                        </div>
                        <div id="movie-Awards">
                             <h4>Prêmios: </h4> 
                             <p>${oscarsCount(data)}</p>
                        </div>
                </section>                       
        </section>`    
}
    

function oscarsCount(data) {    
    const premios = data.Awards ?? "";
    // Procura pela palavra "Won " (case-insensitive)
    const index = premios.toLowerCase().indexOf("won ");
    if (index !== -1) {
        // Exemplo: extrair o texto após "Won " até o próximo ponto
        const fim = premios.indexOf(".", index);
        let total = premios.substring(index + 4, fim !== -1 ? fim : undefined).trim();
        return total;
    } else { 
        return "Nenhum prêmio";
    }
}