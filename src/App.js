import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { createTransferCheckedInstruction } from '@solana/spl-token';
// import ImageSlider from './ImageSlider'; // Rimuovi se non ancora implementato

function App() {
  const { connected, publicKey, sendTransaction } = useWallet();
  const [statusMessage, setStatusMessage] = useState('');

  const transferSPLToken = async () => {
    if (!connected || !publicKey) {
      setStatusMessage('Wallet non connesso.');
      return;
    }

    setStatusMessage('Transazione in corso...');

    const connection = new Connection("https://api.devnet.solana.com", 'confirmed');

    try {
      const balance = await connection.getBalance(publicKey);
      if (balance < 5000) {
        setStatusMessage('Saldo SOL insufficiente per coprire le fee di transazione. Ricarica il tuo wallet.');
        return;
      }
    } catch (error) {
      console.error("Errore durante il controllo del saldo SOL:", error);
      setStatusMessage('Errore durante il controllo del saldo SOL.');
      return;
    }

    const tokenMintAddress = new PublicKey('YourTokenMintAddressHere'); // Sostituisci con il tuo token mint address
    const recipientAddress = new PublicKey('RecipientPublicKeyHere'); // Sostituisci con il recipient address
    const amount = 100 * (10 ** 9); // 100 token (supponendo 9 decimali)

    const transaction = new Transaction().add(
      createTransferCheckedInstruction(
        publicKey, // Source account
        tokenMintAddress, // Mint address
        recipientAddress, // Destination account
        publicKey, // Owner of the source account
        amount, // Amount
        9 // Decimals
      )
    );

    try {
      const signature = await sendTransaction(transaction, connection);
      setStatusMessage(`Transazione inviata! Signature: ${signature}`);
    } catch (error) {
      console.error("Errore durante l'invio della transazione:", error);
      setStatusMessage("Errore durante l'invio della transazione. Controlla la console per ulteriori dettagli.");
    }
  };

  return (
    <div>
      <header>
        <h1>500 Crypto</h1>
        <p>Il futuro della finanza è qui. Investi oggi per un domani migliore.</p>
        <button className="cta-button" onClick={transferSPLToken} disabled={!connected}>
          Acquista Ora
        </button>
        <div id="statusMessage">{statusMessage}</div>
        <div id="walletAddress">{connected ? `Wallet connesso: ${publicKey.toString()}` : 'Wallet non connesso'}</div>
      </header>

      <section>
        <h2>Perché scegliere 500 Crypto?</h2>
        <div className="features">
          <div className="feature">
            <i className="fas fa-shield-alt"></i>
            <h3>Sicurezza</h3>
            <p>La tua sicurezza è la nostra priorità. Tecnologia blockchain avanzata.</p>
          </div>
          <div className="feature">
            <i className="fas fa-rocket"></i>
            <h3>Velocità</h3>
            <p>Transazioni veloci e senza confini. Completa pagamenti in pochi secondi.</p>
          </div>
          <div className="feature">
            <i className="fas fa-chart-line"></i>
            <h3>Crescita</h3>
            <p>Investi in una criptovaluta con un potenziale di crescita esponenziale.</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Galleria</h2>
        {/* <ImageSlider /> */}
      </section>

      <footer>
        <p>© 2023 500 Crypto. Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}

export default App;
