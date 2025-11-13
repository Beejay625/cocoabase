import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

async function main() {
  // Get the contract address from the latest deployment
  const deploymentsDir = path.join(__dirname, "../deployments");
  const deploymentFiles = fs.readdirSync(deploymentsDir)
    .filter((file) => file.startsWith("deployment-"))
    .sort()
    .reverse();

  if (deploymentFiles.length === 0) {
    console.error("No deployment file found. Please deploy the contract first.");
    process.exit(1);
  }

  const latestDeployment = JSON.parse(
    fs.readFileSync(path.join(deploymentsDir, deploymentFiles[0]), "utf8")
  );

  const contractAddress = latestDeployment.contractAddress;
  console.log("Using contract address:", contractAddress);

  const [deployer] = await ethers.getSigners();
  console.log("Interacting with contract using account:", deployer.address);

  // Get the contract instance
  const PlantationNFT = await ethers.getContractFactory("PlantationNFT");
  const plantationNFT = PlantationNFT.attach(contractAddress);

  console.log("\n=== Contract Operations ===\n");

  // 1. Check total supply
  try {
    const totalSupply = await plantationNFT.totalSupply();
    console.log("1. Total Supply:", totalSupply.toString());
  } catch (error) {
    console.log("1. Total Supply: Error reading", error);
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
    console.log("   Transaction confirmed in block:", receipt?.blockNumber);

    // Get the token ID from events
    const mintEvent = receipt?.logs.find((log: any) => {
      try {
        const parsed = plantationNFT.interface.parseLog(log);
        return parsed?.name === "PlantationMinted";
      } catch {
        return false;
      }
    });

    if (mintEvent) {
      const parsed = plantationNFT.interface.parseLog(mintEvent);
      const tokenId = parsed?.args[0];
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
    }
  } catch (error: any) {
    console.error("   ❌ Error:", error.message);
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

