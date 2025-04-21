import { OnchainRiddle__factory } from '../../types/contract/factories/OnchainRiddle__factory';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import { useMemo } from 'react';
import { WalletClient } from 'viem';
import { useWalletClient } from 'wagmi';

const CONTRACT_ADDRESS = import.meta.env.VITE_SMART_CONTRACT_ADDRESS;

export function useRiddleContract() {
  const { data: walletClient } = useWalletClient();

  const contract = useMemo(async () => {
    if (!walletClient) return null;
    const signer = await walletClientToSigner(walletClient);
    return OnchainRiddle__factory.connect(CONTRACT_ADDRESS, signer);
  }, [walletClient]);

  return contract;
}

export function walletClientToSigner(
  walletClient: WalletClient
): Promise<JsonRpcSigner> {
  const provider = new BrowserProvider(walletClient.transport.url);
  return provider.getSigner(walletClient.account?.address);
}
