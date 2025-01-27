let contatoreCarrello = localStorage.getItem('contatoreCarrello') ? parseInt(localStorage.getItem('contatoreCarrello')) : 0;
document.getElementById('contatoreCarrello').textContent = contatoreCarrello;

document.getElementById('acquistaBtn').addEventListener('click', function() {
    var notifica = document.getElementById('notifica');
    notifica.style.display = 'block'; // Mostra la notifica
    contatoreCarrello++;
    document.getElementById('contatoreCarrello').textContent = contatoreCarrello;
    localStorage.setItem('contatoreCarrello', contatoreCarrello);
    setTimeout(function() {
        notifica.style.display = 'none'; // Nascondi la notifica dopo 3 secondi
    }, 3000);
});

document.getElementById('rimuoviBtn').addEventListener('click', function() {
    if (contatoreCarrello > 0) {
        contatoreCarrello--;
        document.getElementById('contatoreCarrello').textContent = contatoreCarrello;
        localStorage.setItem('contatoreCarrello', contatoreCarrello);
    }
});

document.getElementById('checkoutBtn').addEventListener('click', function() {
    if (contatoreCarrello > 0) {
        if (confirm('Sei sicuro di voler procedere al checkout?')) {
            alert('Grazie per il tuo acquisto!');
            contatoreCarrello = 0;
            document.getElementById('contatoreCarrello').textContent = contatoreCarrello;
            localStorage.setItem('contatoreCarrello', contatoreCarrello);
            location.reload(); // Ricarica la pagina
        }
    } else {
        alert('Il carrello è vuoto!');
    }
});
