import useUserStore from '../stores/useUser.store';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

export function useWatchWagmiAccount() {
  const { connector, status, address, chain } = useAccount();
  const { setConnector, setIsConnected, setAddress, setChainId } =
    useUserStore();

  useEffect(() => {
    // Update userStore
    setConnector(connector);
    setIsConnected(status === 'connected');
    setAddress(address);
    setChainId(chain?.id);
  }, [
    connector,
    status,
    address,
    chain,
    setConnector,
    setIsConnected,
    setAddress,
    setChainId,
  ]);
}
