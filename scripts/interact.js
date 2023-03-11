const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

//ABI contract - Hardhat
const contract = require('../artifacts/contracts/HelloWorld.sol/HelloWorld.json');

// //The ABI contract is printed in the console
// console.log(JSON.stringify(contract.abi));

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(
  (network = 'goerli'),
  API_KEY
);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
);

//This is gonna print the init message "Olá, mundo!"
async function main() {
  const message = await helloWorldContract.message();
  console.log(`Init message: ${message}`);

  console.log("Updating the message...");
  const tx = await helloWorldContract.update("Soli Deo Gloria.");
  await tx.wait();

  console.log("The new message just landed!")
  const updatedMessage = await helloWorldContract.message();
  console.log(`The updated message is ${updatedMessage}`)
}

main();
