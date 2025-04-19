import { ethers } from 'hardhat';
import { saveDeployment } from '../utils/utils';

async function main() {
  const [deployer] = await ethers.getSigners();

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', balance.toString());

  console.log(`Using deployer account as Bot address: ${deployer.address}`);

  const RiddleFactory = await ethers.getContractFactory('OnchainRiddle');
  const riddleContract = await RiddleFactory.deploy();

  const receipt = await riddleContract.deploymentTransaction()?.wait();

  await saveDeployment('OnchainRiddle')({
    address: await riddleContract.getAddress(),
    args: '',
    block: receipt?.blockNumber ?? 0,
  });

  console.log(
    '✅ OnchainRiddle deployed at:',
    await riddleContract.getAddress()
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
