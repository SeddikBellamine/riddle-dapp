import { InjectedWalletProvider } from './injected-wallet-provider/injected-wallet-provider';
import { EIP6963ProviderDetail } from './injected-wallet-provider/types';
import { sepolia } from './sepoliaChainConfig';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { createAppKit } from '@reown/appkit/react';
import { http, CreateConnectorFn } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';

// Wagmi Client initialization
if (!import.meta.env.VITE_REOWN_PROJECT_ID) {
  throw new Error('You need to provide VITE_REOWN_PROJECT_ID env variable');
}

export const projectId = import.meta.env.VITE_REOWN_PROJECT_ID!;

const metadata = {
  name: 'Riddle',
  description: 'riddle',
  url: 'https://zama.ai',
  icons: [
    'https://cdn.prod.website-files.com/61bc21e3a843412266a08eb3/646eaa9b9a4784ac233a2025_zama%20logo%20black.png',
  ],
};

// Connectors initialization
const connectors: CreateConnectorFn[] = [];
connectors.push(walletConnect({ projectId, metadata, showQrModal: false }));

// Injected wallet provider management
const injectedWalletProvider = new InjectedWalletProvider();
let availableProviderDetails: EIP6963ProviderDetail[] = [];

// Injected wallet provider details update
injectedWalletProvider.on('providerDetailsUpdated', () => {
  availableProviderDetails = injectedWalletProvider.providerDetails;
});
injectedWalletProvider.subscribe();
injectedWalletProvider.requestProviders();

// Preserved wallet providers IDs
const preservedId = [
  'io.metamask', // MetaMask
  'io.metamask.flask', // MetaMask Flask
  'com.coinbase.wallet', // Coinbase Wallet
  'com.brave.wallet', // Brave Wallet
  'walletConnect', // WalletConnect
  'io.zerion.wallet', // Zerion
];

// Filtering available providers
const preservedAvailableProviderDetails = availableProviderDetails.filter(
  (providerDetails) => preservedId.includes(providerDetails.info.rdns)
);

// Adding injected providers to connectors
preservedAvailableProviderDetails.forEach((providerDetails) => {
  connectors.push(
    injected({
      target() {
        return {
          id: providerDetails.info.rdns,
          name: providerDetails.info.name,
          icon: providerDetails.info.icon,
          provider: providerDetails.provider as any,
        };
      },
    })
  );
});

export const wagmiAdapter = new WagmiAdapter({
  networks: [sepolia],
  multiInjectedProviderDiscovery: false,
  transports: {
    [sepolia.id]: http(),
  },
  projectId,
  connectors,
});

if (import.meta.env.DEV && window?.console) {
  const originalError = console.error;

  console.error = (...args: any[]) => {
    // suppress "Restore will override. history"
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Restore will override. history')
    ) {
      return;
    }

    // call original if it's something else
    originalError(...args);
  };
}
// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: [sepolia],
  projectId,
  defaultNetwork: sepolia,
  features: {
    email: false,
    socials: false,
  },
  enableWalletGuide: false,
  themeMode: 'light',
  themeVariables: {
    '--w3m-color-mix': '#ffd209',
    '--w3m-color-mix-strength': 100,
  },
});
