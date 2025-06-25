const background=document.getElementById("modal-overlay");

function backgroundClickHandler(){
        background.classList.remove("open");  
}

  background.addEventListener("click",backgroundClickHandler);
