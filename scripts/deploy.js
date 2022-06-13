
const { artifacts } = require("hardhat");
const hre = require("hardhat");

async function main() {


  const Contract = await hre.ethers.getContractFactory("Calend3");
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log("Calend3 deployed to:", contract.address);

  saveFrontendFiles();
}

function saveFrontendFiles() {
  const fs = require("fs");

  const abiDir = __dirname + "/../frontend/src/abis";

  if (!fs.existsSync(abiDir)) {
    fs.mkdirSync(abiDir);
  }

  const artifact = artifacts.readArtifactSync("Calend3");

  fs.writeFileSync(
    abiDir + "/Calend3.json",
    JSON.stringify(artifact, null, 2)
  );
}

// Buraya main function çağırılması lazım
main();


//0x0D4327FdE8A62E310A7e92946d08D2C9a083eA6e --> contract address