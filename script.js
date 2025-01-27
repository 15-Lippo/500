document.addEventListener('DOMContentLoaded', () => {
    const buyButton = document.getElementById('buyButton');
    const buyButton2 = document.getElementById('buyButton2');
    const statusMessage = document.getElementById('statusMessage');

    // Funzione per connettere il wallet Phantom
    async function connectWallet() {
        if (window.solana && window.solana.isPhantom) {
            try {
                const response = await window.solana.connect();
                const publicKey = response.publicKey.toString();
                statusMessage.textContent = `Wallet connesso: ${publicKey}`;
                statusMessage.style.color = 'green';
                return publicKey;
            } catch (error) {
                console.error("Errore durante la connessione al wallet:", error);
                statusMessage.textContent = "Errore durante la connessione al wallet.";
                statusMessage.style.color = 'red';
            }
        } else {
            statusMessage.textContent = "Phantom Wallet non è installato. Per favore, installa Phantom Wallet per continuare.";
            statusMessage.style.color = 'red';
            buyButton.style.display = 'none'; // Nascondi il pulsante se Phantom non è installato
            buyButton2.style.display = 'none'; // Nascondi il secondo pulsante
        }
    }

    // Funzione per trasferire token SPL
    async function transferSPLToken() {
        const publicKey = await connectWallet();
        if (!publicKey) return;

        // Configurazione della connessione a Solana
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');

        // Indirizzo del token SPL (sostituisci con il tuo token mint address)
        const tokenMintAddress = new solanaWeb3.PublicKey('YourTokenMintAddressHere');

        // Indirizzo del wallet del destinatario (sostituisci con il public key del destinatario)
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
            statusMessage.textContent = `Transazione inviata! Signature: ${signature}`;
            statusMessage.style.color = 'green';
        } catch (error) {
            console.error("Errore durante l'invio della transazione:", error);
            statusMessage.textContent = "Errore durante l'invio della transazione.";
            statusMessage.style.color = 'red';
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
