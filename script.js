document.getElementById('acquistaBtn').addEventListener('click', function() {
    var messaggio = document.getElementById('messaggioAcquisto');
    messaggio.style.display = 'block'; // Mostra il messaggio
    setTimeout(function() {
        messaggio.style.display = 'none'; // Nascondi il messaggio dopo 3 secondi
    }, 3000);
});
