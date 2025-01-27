import React, { useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

// Importa il componente principale della tua app
import App from './App';

// Importa gli stili del Wallet Modal
import '@solana/wallet-adapter-react-ui/styles.css';

function WalletWrapper() {
    // Configura la rete (devnet, mainnet-beta, testnet)
    const network = WalletAdapterNetwork.Devnet; // Usa 'Devnet' per test
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // Configura i wallet supportati
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            // Aggiungi altri wallet qui se necessario
        ],
        []
    );

    return (
        <WalletProvider wallets={wallets} autoConnect endpoint={endpoint}>
            <WalletModalProvider>
                <App />
            </WalletModalProvider>
        </WalletProvider>
    );
}

export default WalletWrapper;
