// Variabili
let currentImageIndex = 0;
let intervalID;
let isAutoplaying = false;
let images = [];

// Funzione per ottenere le immagini dalla directory (simulato nel caso di browser)
async function getImages(){
    // Qui dovresti implementare la logica per ottenere le immagini dalla directory.
    // Questa operazione di solito viene eseguita sul server.
    // Poichè stai usando la cartella img, devi implementare la logica per ottenere le immagini dalla directory.
    // Per semplicità usiamo una simulazione
    let immagini = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg"];
    return immagini;
}


// Funzione per passare alla prossima immagine
function nextImage() {
  if(images.length > 0){
      currentImageIndex = (currentImageIndex + 1) % images.length;
      document.getElementById('image').src = images[currentImageIndex];
      document.getElementById('image').alt = "Immagine numero " + (currentImageIndex + 1);
      document.getElementById('counter').textContent = currentImageIndex + 1;
  }else{
      console.error("Non ci sono immagini disponibili!");
  }
}

// Funzione per avviare l'autoplay
function startAutoplay() {
    if(!isAutoplaying){
        intervalID = setInterval(nextImage, 1000);
        isAutoplaying = true;
        document.getElementById('startStop').textContent = "Stop";
    }else{
        stopAutoplay();
    }
}

// Funzione per interrompere l'autoplay
function stopAutoplay() {
    clearInterval(intervalID);
    isAutoplaying = false;
    document.getElementById('startStop').textContent = "Start";
}


// Event listener per quando il DOM è completamente caricato
document.addEventListener('DOMContentLoaded', async function() {
    // Recupero delle immagini
    images = await getImages();
    if(images.length > 0){
        // Imposta la prima immagine e l'indice del contatore
        document.getElementById('image').src = images[0];
        document.getElementById('image').alt = "Immagine numero 1";
        document.getElementById('counter').textContent = 1;
    }else{
        console.error("Non ci sono immagini disponibili!");
    }

    // Event listener per i pulsanti
    document.getElementById('next').addEventListener('click', nextImage);
    document.getElementById('startStop').addEventListener('click', startAutoplay);
});
