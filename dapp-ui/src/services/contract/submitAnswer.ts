import { OnchainRiddle__factory } from '../../types/contract/factories/OnchainRiddle__factory';
import { JsonRpcSigner } from 'ethers';

const CONTRACT_ADDRESS = import.meta.env.VITE_SMART_CONTRACT_ADDRESS;

export const submitAnswer = async (
  signer: JsonRpcSigner,
  answer: string
): Promise<{ correct: boolean }> => {
  const contract = OnchainRiddle__factory.connect(CONTRACT_ADDRESS, signer);
  const tx = await contract.submitAnswer(answer);
  const receipt = await tx.wait();

  // Find the AnswerAttempt event
  const event = receipt?.logs
    .map((log) => {
      try {
        return contract.interface.parseLog(log);
      } catch {
        return null;
      }
    })
    .find((parsed) => parsed?.name === 'AnswerAttempt');

  if (event) {
    const correct = event.args?.correct;
    return { correct };
  }

  // Fallback in case no event found
  return { correct: false };
};
