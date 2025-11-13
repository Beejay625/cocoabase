const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Using account:", deployer.address);

  // Get or deploy contract
  let contractAddress;
  let plantationNFT;
  const deploymentsDir = path.join(__dirname, "../deployments");
  
  try {
    // Try to get the contract address from the latest deployment
    if (fs.existsSync(deploymentsDir)) {
      const deploymentFiles = fs.readdirSync(deploymentsDir)
        .filter((file) => file.startsWith("deployment-"))
        .sort()
        .reverse();

      if (deploymentFiles.length > 0) {
        const latestDeployment = JSON.parse(
          fs.readFileSync(path.join(deploymentsDir, deploymentFiles[0]), "utf8")
        );
        contractAddress = latestDeployment.contractAddress;
        console.log("Found deployment file with address:", contractAddress);
      }
    }
  } catch (error) {
    console.log("No deployment file found, will deploy new contract");
  }

  const PlantationNFT = await ethers.getContractFactory("PlantationNFT");
  
  // Try to attach to existing contract, or deploy new one
  if (contractAddress) {
    try {
      plantationNFT = PlantationNFT.attach(contractAddress);
      // Test if contract exists by calling a view function
      await plantationNFT.totalSupply();
      console.log("Using existing contract at:", contractAddress);
    } catch (error) {
      console.log("Contract not found at address, deploying new contract...");
      plantationNFT = await PlantationNFT.deploy();
      await plantationNFT.waitForDeployment();
      contractAddress = await plantationNFT.getAddress();
      console.log("Deployed new contract at:", contractAddress);
    }
  } else {
    console.log("Deploying new contract...");
    plantationNFT = await PlantationNFT.deploy();
    await plantationNFT.waitForDeployment();
    contractAddress = await plantationNFT.getAddress();
    console.log("Deployed contract at:", contractAddress);
  }

  console.log("\n=== Contract Operations ===\n");

  // 1. Check total supply
  try {
    const totalSupply = await plantationNFT.totalSupply();
    console.log("1. Total Supply:", totalSupply.toString());
  } catch (error) {
    console.log("1. Total Supply: 0 (no plantations minted yet)");
  }

  // 2. Mint a test plantation
  console.log("\n2. Minting a test plantation...");
  try {
    const tokenURI = "ipfs://QmTest123456789";
    const location = "Ghana, West Africa";
    const areaHectares = 5000; // 5.0 hectares (scaled by 1000)
    const stage = "vegetative";
    const treeCount = 1000;
    const carbonOffsetTons = 25000; // 25.0 tons (scaled by 1000)

    const tx = await plantationNFT.mintPlantation(
      deployer.address,
      tokenURI,
      location,
      areaHectares,
      stage,
      treeCount,
      carbonOffsetTons
    );

    console.log("   Transaction hash:", tx.hash);
    const receipt = await tx.wait();
    console.log("   Transaction confirmed in block:", receipt.blockNumber);

    // Get the token ID from events or by checking totalSupply
    let tokenId;
    // Try to get token ID from event
    const mintEvent = receipt.logs.find((log) => {
      try {
        const parsed = plantationNFT.interface.parseLog(log);
        return parsed && parsed.name === "PlantationMinted";
      } catch {
        return false;
      }
    });

    if (mintEvent) {
      const parsed = plantationNFT.interface.parseLog(mintEvent);
      tokenId = parsed.args[0];
    } else {
      // If event parsing fails, get from totalSupply (assuming it's the last minted)
      const supply = await plantationNFT.totalSupply();
      tokenId = supply - 1n; // tokenId is 0-indexed
    }
    console.log("   ✅ Plantation minted with token ID:", tokenId.toString());

      // 3. Get plantation data
      console.log("\n3. Reading plantation data...");
      const plantationData = await plantationNFT.getPlantationData(tokenId);
      console.log("   Location:", plantationData.location);
      console.log("   Area (hectares):", plantationData.areaHectares.toString() / 1000);
      console.log("   Stage:", plantationData.stage);
      console.log("   Tree Count:", plantationData.treeCount.toString());
      console.log("   Carbon Offset (tons):", plantationData.carbonOffsetTons.toString() / 1000);
      console.log("   Minter:", plantationData.minter);

      // 4. Update stage
      console.log("\n4. Updating plantation stage...");
      const updateTx = await plantationNFT.updateStage(tokenId, "flowering");
      await updateTx.wait();
      console.log("   ✅ Stage updated to: flowering");

      // Verify the update
      const updatedData = await plantationNFT.getPlantationData(tokenId);
      console.log("   Verified stage:", updatedData.stage);

      // 5. Update plantation data
      console.log("\n5. Updating plantation data...");
      const newTreeCount = 1200;
      const newCarbonOffset = 30000; // 30.0 tons
      const updateDataTx = await plantationNFT.updatePlantationData(
        tokenId,
        newTreeCount,
        newCarbonOffset
      );
      await updateDataTx.wait();
      console.log("   ✅ Plantation data updated");

      // Verify the update
      const finalData = await plantationNFT.getPlantationData(tokenId);
      console.log("   Updated Tree Count:", finalData.treeCount.toString());
      console.log("   Updated Carbon Offset (tons):", finalData.carbonOffsetTons.toString() / 1000);

      // 6. Check balance
      console.log("\n6. Checking plantation balance...");
      const balance = await plantationNFT.balanceOfPlantations(deployer.address);
      console.log("   Plantations owned by", deployer.address + ":", balance.toString());

      // 7. Check total supply again
      const finalSupply = await plantationNFT.totalSupply();
      console.log("\n7. Final Total Supply:", finalSupply.toString());

    console.log("\n=== Operations Completed Successfully ===");
    console.log("\nContract Address:", contractAddress);
    console.log("Token ID:", tokenId.toString());
    console.log("Owner:", deployer.address);
  } catch (error) {
    console.error("   ❌ Error:", error.message);
    if (error.reason) {
      console.error("   Error reason:", error.reason);
    }
    if (error.data) {
      console.error("   Error data:", error.data);
    }
  }
}

main()
  .then(() => {
    console.log("\n✅ Interaction script completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Interaction script failed:", error);
    process.exit(1);
  });

