<script>
    // Collegamento al wallet Web3 (MetaMask)
    async function connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Richiedi l'accesso al wallet
                const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                const walletAddress = accounts[0];
                alert(`Wallet connesso: ${walletAddress}`);
                return walletAddress;
            } catch (error) {
                console.error("Errore durante la connessione al wallet:", error);
                alert("Errore durante la connessione al wallet.");
            }
        } else {
            alert("MetaMask non è installato. Per favore, installa MetaMask per continuare.");
        }
    }

    // Funzione per acquistare la crypto "500"
    async function buyCrypto500() {
        const walletAddress = await connectWallet();
        if (!walletAddress) return;

        // Configurazione della transazione
        const transactionParameters = {
            to: '0xYourContractAddressHere', // Indirizzo del contratto della crypto "500"
            from: walletAddress,
            value: '0x' + (0.1 * 1e18).toString(16), // 0.1 ETH (cambia il valore in base al prezzo)
            gas: '0x5208', // 21000 Gwei
            gasPrice: '0x3b9aca00', // 1 Gwei
        };

        // Invio della transazione
        try {
            const txHash = await ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
            alert(`Transazione inviata! Hash: ${txHash}`);
        } catch (error) {
            console.error("Errore durante l'invio della transazione:", error);
            alert("Errore durante l'invio della transazione.");
        }
    }

    // Collega il pulsante "Acquista Ora" alla funzione buyCrypto500
    document.addEventListener('DOMContentLoaded', () => {
        const buyButtons = document.querySelectorAll('.cta-button');
        buyButtons.forEach(button => {
            button.addEventListener('click', buyCrypto500);
        });
    });
</script>
