document.addEventListener('DOMContentLoaded', () => {
    const buyButton = document.getElementById('buyButton');
    const buyButton2 = document.getElementById('buyButton2');
    const statusMessage = document.getElementById('statusMessage');
    const walletAddressDisplay = document.getElementById('walletAddress');

    // Funzione per connettere il wallet Phantom
    async function connectWallet() {
        if (window.solana && window.solana.isPhantom) {
            try {
                const response = await window.solana.connect();
                const publicKey = response.publicKey.toString();
                statusMessage.textContent = `Wallet connesso: `;
                statusMessage.style.color = 'green';
                walletAddressDisplay.textContent = publicKey;
                return publicKey;
            } catch (error) {
                console.error("Errore durante la connessione al wallet:", error);
                statusMessage.textContent = "Errore durante la connessione al wallet: " + error.message;
                statusMessage.style.color = 'red';
                walletAddressDisplay.textContent = '';
                return null;
            }
        } else {
            statusMessage.textContent = "Phantom Wallet non è installato. Per favore, installa Phantom Wallet per continuare.";
            statusMessage.style.color = 'red';
            walletAddressDisplay.textContent = '';
            if (buyButton) {
                buyButton.style.display = 'none';
                // Mostra il pulsante "Installa Phantom"
                const installButton = document.createElement('button');
                installButton.textContent = 'Installa Phantom Wallet';
                installButton.classList.add('install-phantom-button');
                installButton.addEventListener('click', () => {
                    window.open('https://phantom.app/', '_blank');
                });
                header.appendChild(installButton);
            }
            if (buyButton2) buyButton2.style.display = 'none';
            return null;
        }
    }

    // Funzione per trasferire token SPL
    async function transferSPLToken() {
        const publicKey = await connectWallet();
        if (!publicKey) return;
        buyButton.disabled = true; // disabilita il bottone durante la transazione
        buyButton2.disabled = true;
        statusMessage.textContent = 'Transazione in corso...';
        statusMessage.style.color = 'orange';

        // Configurazione della connessione a Solana
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed'); // Usa 'devnet' per test

        // Verifica il saldo SOL del wallet
        try {
            const balance = await connection.getBalance(new solanaWeb3.PublicKey(publicKey));
            if (balance < 5000) { // 5000 lamports è un valore di esempio per le fee
                statusMessage.textContent = "Saldo SOL insufficiente per coprire le fee di transazione.";
                statusMessage.style.color = 'red';
                buyButton.disabled = false; // riabilita il bottone
                buyButton2.disabled = false;
                return;
            }
        } catch (error) {
            console.error("Errore durante il controllo del saldo SOL:", error);
            statusMessage.textContent = "Errore durante il controllo del saldo SOL.";
            statusMessage.style.color = 'red';
            buyButton.disabled = false; // riabilita il bottone
            buyButton2.disabled = false;
            return;
        }

        // Indirizzo del token SPL (SOSTITUISCI QUESTO INDIRIZZO CON IL TUO TOKEN MINT ADDRESS)
        const tokenMintAddress = new solanaWeb3.PublicKey('YourTokenMintAddressHere');

        // Indirizzo del wallet del destinatario (SOSTITUISCI QUESTO INDIRIZZO CON L'INDIRIZZO DEL TUO WALLET DESTINATARIO)
        const recipientAddress = new solanaWeb3.PublicKey('RecipientPublicKeyHere');

        // Quantità di token da trasferire (es. 100 token, supponendo 9 decimali)
        const amount = 100 * (10 ** 9);

        // Creazione della transazione
        const transaction = new solanaWeb3.Transaction().add(
            splToken.Token.createTransferInstruction(
                splToken.TOKEN_PROGRAM_ID,
                new solanaWeb3.PublicKey(publicKey), // Indirizzo del mittente
                recipientAddress, // Indirizzo del destinatario
                new solanaWeb3.PublicKey(publicKey), // Indirizzo del proprietario
                [],
                amount
            )
        );

        // Firma e invio della transazione
        try {
            const { signature } = await window.solana.signAndSendTransaction(transaction);
            statusMessage.textContent = `Transazione inviata! Signature: ${signature} <a href="https://solscan.io/tx/${signature}" target="_blank">Visualizza su Solscan</a>`;
            statusMessage.style.color = 'green';
        } catch (error) {
            console.error("Errore durante l'invio della transazione:", error);
            statusMessage.textContent = "Errore durante l'invio della transazione: " + error.message;
            statusMessage.style.color = 'red';
        } finally {
            buyButton.disabled = false;
            buyButton2.disabled = false;
        }
    }

    // Collega i pulsanti alla funzione transferSPLToken
    if (buyButton && buyButton2) {
        buyButton.addEventListener('click', transferSPLToken);
        buyButton2.addEventListener('click', transferSPLToken);
    } else {
        console.error("Pulsanti non trovati nel DOM.");
    }
});
