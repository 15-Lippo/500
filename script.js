<script>
    // Collegamento al wallet Phantom
    async function connectWallet() {
        if (window.solana && window.solana.isPhantom) {
            try {
                // Richiedi l'accesso al wallet
                const response = await window.solana.connect();
                const publicKey = response.publicKey.toString();
                document.getElementById('statusMessage').textContent = `Wallet connesso: ${publicKey}`;
                return publicKey;
            } catch (error) {
                console.error("Errore durante la connessione al wallet:", error);
                document.getElementById('statusMessage').textContent = "Errore durante la connessione al wallet.";
            }
        } else {
            alert("Phantom Wallet non è installato. Per favore, installa Phantom Wallet per continuare.");
        }
    }

    // Funzione per acquistare la crypto "500"
    async function buyCrypto500() {
        const publicKey = await connectWallet();
        if (!publicKey) return;

        // Configurazione della connessione a Solana
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');

        // Indirizzo del destinatario (sostituisci con l'indirizzo del tuo wallet o contratto)
        const recipientPublicKey = new solanaWeb3.PublicKey('YourRecipientPublicKeyHere');

        // Quantità di SOL da inviare (es. 0.1 SOL)
        const lamports = solanaWeb3.LAMPORTS_PER_SOL * 0.1;

        // Creazione della transazione
        const transaction = new solanaWeb3.Transaction().add(
            solanaWeb3.SystemProgram.transfer({
                fromPubkey: new solanaWeb3.PublicKey(publicKey),
                toPubkey: recipientPublicKey,
                lamports,
            })
        );

        // Firma e invio della transazione
        try {
            const { signature } = await window.solana.signAndSendTransaction(transaction);
            document.getElementById('statusMessage').textContent = `Transazione inviata! Signature: ${signature}`;
        } catch (error) {
            console.error("Errore durante l'invio della transazione:", error);
            document.getElementById('statusMessage').textContent = "Errore durante l'invio della transazione.";
        }
    }

    // Collega il pulsante "Acquista 500 Crypto" alla funzione buyCrypto500
    document.addEventListener('DOMContentLoaded', () => {
        const buyButton = document.getElementById('buyButton');
        buyButton.addEventListener('click', buyCrypto500);
    });
</script>
