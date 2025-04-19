export default () => ({
  rpcUrl: process.env.RPC_URL,
  privateKey: process.env.PRIVATE_KEY,
  contractAddress: process.env.CONTRACT_ADDRESS,
  openAiKey: process.env.OPENAI_API_KEY,
});
