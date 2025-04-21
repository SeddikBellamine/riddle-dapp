import { OnchainRiddle__factory } from '../../types/contract/factories/OnchainRiddle__factory';
import { BrowserProvider } from 'ethers';

const CONTRACT_ADDRESS = import.meta.env.VITE_SMART_CONTRACT_ADDRESS;

export const fetchRiddle = async (provider: BrowserProvider) => {
  const contract = OnchainRiddle__factory.connect(CONTRACT_ADDRESS, provider);
  return contract.riddle();
};
