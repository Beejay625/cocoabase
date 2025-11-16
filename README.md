# 🌱 CocoaBase - Onchain Agricultural Management Platform

> **Revolutionizing Agriculture Through Blockchain Technology**

CocoaBase is a **pure onchain agricultural management protocol** built entirely on Ethereum-compatible blockchains, processing **190+ distinct onchain transaction types** through **243+ specialized smart contracts** that execute directly onchain without intermediaries.

Every agricultural operation—from seed planting to harvest, certification issuance to financial transactions—is recorded as immutable, verifiable onchain state on a decentralized ledger, creating permanent audit trails that are cryptographically secured and trustless.

Our smart contract architecture enables onchain crop management, livestock tracking, supply chain operations, financial services, and sustainability initiatives, transforming traditional farming into verifiable, tradeable digital assets that exist natively on the blockchain.

Through pure onchain execution, farmers can monetize sustainability efforts via carbon credit smart contracts, access decentralized finance protocols, participate in transparent supply chains, and build onchain reputations—all while consumers, investors, and regulators verify origin, quality, and compliance through immutable blockchain records.

## 🎯 The Problem We Solve

### Real-World Challenges in Agriculture

1. **Lack of Transparency**: Supply chains are opaque, making it impossible to verify organic claims, fair trade practices, or sustainability claims
2. **Financial Exclusion**: Smallholder farmers lack access to credit, insurance, and fair market pricing
3. **Data Fragmentation**: Farm data is scattered across multiple systems, making it difficult to make informed decisions
4. **Counterfeit Products**: No reliable way to verify the origin and quality of agricultural products
5. **Inefficient Markets**: Middlemen take excessive cuts, leaving farmers with minimal profits
6. **Climate Risk**: Farmers lack access to affordable insurance and carbon credit markets
7. **Compliance Burden**: Manual record-keeping for certifications and compliance is time-consuming and error-prone

### Our Onchain Solution

CocoaBase leverages blockchain technology to create an **immutable, transparent, and decentralized** agricultural ecosystem where:

- ✅ **Every farm operation is recorded onchain** - From seed planting to harvest, creating an unalterable audit trail
- ✅ **NFTs represent real-world assets** - Plantations, equipment, and land are tokenized as verifiable digital assets
- ✅ **Smart contracts automate payments** - Eliminating intermediaries and ensuring fair, transparent transactions
- ✅ **Carbon credits are tradeable** - Farmers can monetize their sustainability efforts through onchain carbon markets
- ✅ **Supply chain is fully traceable** - Consumers can verify the origin and journey of every product
- ✅ **Financial services are accessible** - Microfinance, insurance pools, and crop financing are available to all farmers
- ✅ **Data is monetizable** - Farmers can sell their agricultural data while maintaining privacy

## 🏗️ Architecture

CocoaBase is built with:

- **Smart Contracts**: 243+ Solidity contracts covering every aspect of agricultural management
- **Frontend**: Next.js 16 with React 19, TypeScript, and Tailwind CSS
- **Wallet Integration**: Reown (WalletConnect) for seamless Web3 connectivity
- **Blockchain**: Ethereum-compatible networks (Ethereum, Arbitrum, Sepolia testnet)
- **State Management**: Zustand for efficient client-side state management
- **Data Visualization**: Chart.js and D3.js for comprehensive analytics

## 📋 Complete Feature List

### 🌿 **Crop Management** (67 Features)

#### Core Crop Operations
- `FarmCropMonitoring` - Real-time crop growth and health monitoring
- `FarmCropGrowthStageTracking` - Track crops through all growth stages
- `FarmCropMaturity` - Monitor crop maturity levels
- `FarmCropHarvestAutomation` - Automated harvest scheduling and execution
- `FarmCropHarvestForecasting` - Predict harvest dates and yields
- `FarmCropHarvestQuality` - Quality grading and certification
- `FarmCropHarvestScheduling` - Optimize harvest timing
- `FarmCropYieldOptimization` - Maximize crop yields through data-driven decisions
- `FarmCropYieldPrediction` - AI-powered yield forecasting
- `FarmYieldTracking` - Historical yield data tracking

#### Crop Health & Disease Management
- `FarmCropDiseaseTracking` - Track and manage crop diseases
- `FarmCropDiseaseResistance` - Monitor disease resistance levels
- `FarmCropPestResistanceTracking` - Track pest resistance
- `FarmPestManagement` - Comprehensive pest control system
- `FarmPestControl` - Pest treatment tracking
- `FarmPestDiseaseTracking` - Combined pest and disease monitoring

#### Crop Nutrition & Soil
- `FarmCropNutritionManagement` - Crop nutrition planning and tracking
- `FarmCropNutrientRecycling` - Optimize nutrient recycling
- `FarmFertilizerApplication` - Track fertilizer usage
- `FarmSoilTesting` - Soil analysis and testing
- `FarmSoilHealth` - Comprehensive soil health monitoring
- `FarmSoilFertilityManagement` - Soil fertility assessment and improvement
- `FarmSoilMoistureMonitoring` - Real-time soil moisture tracking
- `FarmSoilPhManagement` - Soil pH level management
- `FarmSoilOrganicMatterTracking` - Track organic matter content
- `FarmSoilErosionPrevention` - Soil erosion assessment and prevention
- `FarmSoilCompactionMonitoring` - Monitor soil compaction levels
- `FarmSoilMicrobiomeManagement` - Manage soil microbiome health
- `FarmSoilCarbonSequestration` - Track carbon sequestration in soil
- `FarmSoilNutrientBalance` - Soil nutrient balance tracking and recommendations
- `FarmSoilMoistureAlerts` - Soil moisture alert system for irrigation management
- `FarmSoilNutrientAnalysis` - Comprehensive soil nutrient analysis
- `FarmSoilTextureAnalysis` - Analyze soil texture composition

#### Crop Operations
- `FarmCropSeedling` - Seedling management
- `FarmCropTransplanting` - Transplant tracking
- `FarmCropThinning` - Crop thinning operations
- `FarmCropPruning` - Pruning activity tracking
- `FarmCropWeeding` - Weeding operations
- `FarmCropMulching` - Mulching activity tracking
- `FarmCropGrafting` - Grafting operations
- `FarmCropPollination` - Pollination activity tracking
- `FarmCropPollinationManagement` - Comprehensive pollination management
- `FarmCropIntercroppingManagement` - Intercropping optimization
- `FarmCropCoverCropManagement` - Cover crop management
- `FarmCropRotation` - Crop rotation planning
- `FarmCropRotationOptimization` - Optimize crop rotation schedules

#### Crop Quality & Certification
- `FarmCropCertification` - Crop quality certification
- `FarmCropSeedQualityTracking` - Seed quality verification
- `FarmCropVariety` - Crop variety management
- `FarmCropBiodiversityEnhancement` - Enhance crop biodiversity
- `FarmCropClimateAdaptation` - Climate adaptation strategies
- `FarmCropDroughtResistance` - Drought resistance tracking
- `FarmCropWaterEfficiency` - Water usage optimization
- `FarmCropStressMonitoring` - Monitor crop stress levels

#### Post-Harvest & Storage
- `FarmCropStorage` - Crop storage management
- `FarmCropPostHarvestManagement` - Post-harvest processing
- `FarmGrainStorage` - Specialized grain storage
- `FarmHarvestQuality` - Harvest quality assurance
- `FarmCropRotationHistory` - Historical tracking of crop rotation patterns
- `FarmSeedOriginTracking` - Seed origin and provenance tracking
- `FarmHarvestOriginTracking` - Harvest origin and batch tracking
- `FarmCropHarvestScheduling` - Harvest scheduling and optimization system
- `FarmCropHarvestStorage` - Harvest storage management and inventory tracking
- `FarmCropHarvestQualityGrading` - Harvest quality grading and certification
- `FarmCropSeedlingManagement` - Seedling management and nursery tracking
- `FarmCropIrrigationEfficiency` - Irrigation efficiency tracking and optimization
- `FarmCropPestMonitoring` - Pest monitoring and early warning system
- `FarmCropDiseasePrevention` - Disease prevention protocols and compliance tracking
- `FarmCropWeatherImpact` - Weather impact assessment on crops
- `FarmCropPollinationTracking` - Pollination activity tracking and success monitoring
- `FarmCropPruningSchedule` - Pruning schedule and maintenance tracking
- `FarmCropWeedingSchedule` - Weeding schedule and weed management tracking
- `FarmCropMulchingSchedule` - Mulching schedule and material tracking
- `FarmCropFertilizerSchedule` - Fertilizer application scheduling and tracking
- `FarmCropGraftingRecords` - Grafting records and success tracking
- `FarmCropYieldAnalysis` - Yield analysis and comparative reporting
- `FarmCropStorageConditions` - Monitor storage conditions for quality preservation
- `FarmCropTransportTracking` - Track crop transportation and logistics
- `FarmCropQualityGrading` - Standardized quality grading system
- `FarmCropTraceability` - Complete traceability from seed to consumer
- `FarmCropOriginVerification` - Verify and certify crop geographic origin

#### Crop Development Tracking
- `FarmCropGerminationTracking` - Track seed germination rates and success
- `FarmCropFloweringTracking` - Monitor flowering stages and timing
- `FarmCropFruitingTracking` - Track fruit development and yield potential
- `FarmCropRipeningTracking` - Monitor ripening process and readiness
- `FarmCropHarvestTiming` - Optimize harvest timing based on multiple factors

### 🐄 **Livestock Management** (40 Features)

#### Livestock Health & Welfare
- `FarmLivestockHealth` - Comprehensive livestock health records
- `FarmLivestockVaccination` - Vaccination tracking
- `FarmLivestockDiseasePrevention` - Disease prevention protocols
- `FarmLivestockQuarantine` - Quarantine management
- `FarmLivestockWelfareMonitoring` - Welfare assessment and monitoring
- `FarmLivestockBehaviorMonitoring` - Behavior observation tracking
- `FarmLivestockMortalityTracking` - Mortality tracking and analysis

#### Livestock Breeding & Genetics
- `FarmLivestockBreeding` - Breeding record tracking
- `FarmLivestockBreedingSelection` - Breeding selection optimization
- `FarmLivestockGeneticsTracking` - Genetics and lineage tracking
- `FarmLivestockGeneticDiversity` - Genetic diversity management
- `FarmLivestockReproductionTracking` - Reproduction cycle tracking
- `FarmLivestockIdentification` - Identification tag management

#### Livestock Operations
- `FarmLivestockFeeding` - Feeding schedule tracking
- `FarmLivestockFeedOptimization` - Feed ration optimization
- `FarmLivestockFeedQualityControl` - Feed quality testing
- `FarmLivestockFeedCostOptimization` - Feed cost optimization
- `FarmLivestockMilking` - Milking record tracking
- `FarmLivestockWeight` - Weight measurement tracking
- `FarmLivestockMovement` - Movement and location tracking
- `FarmLivestockSlaughter` - Slaughter record management
- `FarmLivestockProductivityTracking` - Productivity metrics
- `FarmLivestockHousingManagement` - Housing and facility management
- `FarmLivestockWasteManagement` - Waste management
- `FarmLivestockFeedInventory` - Livestock feed inventory management
- `FarmLivestockVaccinationSchedule` - Vaccination scheduling and tracking
- `FarmLivestockBreedingRecords` - Breeding records and lineage tracking
- `FarmLivestockHealthRecords` - Comprehensive health records for livestock
- `FarmLivestockWeightTracking` - Weight tracking and growth monitoring
- `FarmLivestockMilkingRecords` - Milking records and production tracking
- `FarmLivestockMovementTracking` - Livestock movement and location tracking
- `FarmLivestockFeedSchedule` - Feed scheduling and ration management
- `FarmLivestockQuarantineManagement` - Quarantine management and health isolation
- `FarmLivestockSlaughterRecords` - Slaughter records and processing documentation
- `FarmLivestockHousingConditions` - Housing conditions monitoring and welfare compliance
- `FarmLivestockMortalityReporting` - Mortality reporting and cause tracking
- `FarmLivestockProductivityMetrics` - Productivity metrics and performance tracking
- `FarmLivestockBehaviorAnalysis` - Behavior analysis and welfare indicators
- `FarmLivestockGrazingManagement` - Manage grazing schedules and pasture rotation
- `FarmLivestockPastureRotation` - Pasture rotation scheduling system
- `FarmLivestockMilkQuality` - Track milk quality metrics and standards
- `FarmLivestockEggProduction` - Track egg production and quality grading
- `FarmLivestockWoolProduction` - Track wool production and fiber quality
- `FarmLivestockMeatQuality` - Grade meat quality with certification

### 💧 **Water & Irrigation** (8 Features)

- `FarmIrrigationManagement` - Comprehensive irrigation scheduling
- `FarmIrrigationEfficiency` - Irrigation efficiency tracking
- `FarmCropIrrigationScheduling` - Crop-specific irrigation
- `FarmWaterQuality` - Water quality testing
- `FarmWaterRights` - Water rights management
- `FarmWaterRightsTrading` - Water rights trading marketplace
- `FarmWaterUsageTracking` - Track water consumption and usage patterns
- `FarmWaterConservation` - Track water conservation efforts and efficiency

### 🌦️ **Weather & Climate** (3 Features)

- `FarmWeatherMonitoring` - Real-time weather data collection
- `FarmWeatherData` - Weather data oracle and historical tracking
- `FarmWeatherInsurance` - Weather-based insurance policies

### 🏭 **Equipment & Infrastructure** (6 Features)

- `FarmEquipmentTracking` - Equipment usage and location tracking
- `FarmEquipmentMaintenance` - Maintenance scheduling and records
- `FarmEquipmentAuction` - Equipment auction marketplace
- `FarmEquipmentSharing` - Equipment sharing with deposits
- `FarmEquipmentUsageTracking` - Equipment usage hours and efficiency tracking

### 👥 **Labor Management** (6 Features)

- `FarmLaborScheduling` - Labor task scheduling
- `FarmLaborContracts` - Labor contract management
- `FarmLaborPool` - Labor pooling system
- `FarmLaborPaymentEscrow` - Secure labor payment escrow
- `FarmLaborDisputeResolution` - Dispute resolution system for labor contracts
- `FarmContractEnforcement` - Smart contract enforcement and escrow system

### 📦 **Inventory & Supply Chain** (7 Features)

- `FarmInventoryManagement` - Comprehensive inventory tracking
- `FarmSupplyChainTracking` - Supply chain location tracking
- `FarmSupplyChainPayments` - Supply chain payment processing
- `FarmSeedManagement` - Seed batch and quality management
- `FarmCropTraceability` - Full traceability system for crops from seed to harvest
- `FarmLivestockTraceability` - Livestock traceability from birth to processing
- `FarmProductOriginVerification` - Product origin verification and certification

### 💰 **Financial Services** (12 Features)

#### Financing & Credit
- `FarmCropFinancing` - Crop financing system
- `FarmMicrofinance` - Microfinance loans for farmers
- `FarmInvestmentTracking` - Investment tracking

#### Insurance
- `FarmInsurancePolicy` - Insurance policy management
- `FarmInsurancePool` - Collective insurance pool system
- `FarmCropInsurancePool` - Crop-specific insurance pools
- `FarmWeatherInsurance` - Weather-based insurance
- `FarmCropYieldInsurance` - Crop yield insurance with automated claims
- `FarmLivestockInsurance` - Livestock insurance with mortality and health coverage
- `FarmEquipmentInsurance` - Equipment insurance with damage and theft coverage
- `FarmCropPriceInsurance` - Price protection insurance for crops
- `FarmCropQualityInsurance` - Quality-based crop insurance
- `FarmSupplyChainInsurance` - Supply chain risk insurance

#### Financial Planning
- `FarmFinancialPlanning` - Financial planning and budgeting
- `FarmBudgetPlanning` - Budget planning and tracking
- `FarmProfitabilityAnalysis` - Profitability analysis
- `FarmPerformanceBenchmarking` - Performance benchmarking

### 🏪 **Marketplaces & Trading** (12 Features)

- `FarmDirectMarketplace` - Direct farmer-to-buyer marketplace
- `FarmMarketPriceTracking` - Market price recording and tracking
- `FarmHarvestFutures` - Harvest futures contracts
- `FarmSeedExchange` - Seed trading marketplace
- `FarmCarbonOffsetMarketplace` - Carbon offset trading
- `FarmBiodiversityCredits` - Biodiversity credit issuance and trading
- `FarmWaterRightsTrading` - Water rights trading
- `FarmRenewableEnergyTrading` - Renewable energy trading
- `FarmDataMonetization` - Farm data monetization marketplace
- `FarmEquipmentAuction` - Equipment auction system
- `FarmWeatherDerivatives` - Weather derivatives trading for risk management
- `FarmCropOptions` - Options trading for crop price protection

### 🏛️ **Land & Asset Management** (7 Features)

- `FarmLandRegistry` - Onchain land parcel registry
- `FarmLandLeasing` - Land leasing agreements
- `FarmLandValuation` - Land valuation system
- `FarmFieldMapping` - Field mapping with GPS coordinates
- `FarmFieldBoundary` - Field boundary management
- `FarmAssetTokenization` - Asset tokenization as NFTs
- `FarmAssetLeasing` - Asset leasing with onchain payments
- `FarmLandTitleVerification` - Land title verification and ownership records

### ✅ **Certification & Compliance** (8 Features)

- `FarmOrganicCertification` - Organic certification management
- `FarmCropCertification` - Crop quality certification
- `FarmExportCertification` - Export certificate management
- `FarmCertificationRenewal` - Certification renewal management
- `FarmComplianceReporting` - Compliance reporting system
- `FarmQualityAssurance` - Quality checks and certifications
- `FarmFairTradeCertification` - Fair trade certification and compliance tracking
- `FarmOrganicTransitionTracking` - Organic certification transition process tracking

### 🌍 **Sustainability & Environment** (11 Features)

- `FarmSoilCarbonSequestration` - Carbon sequestration tracking
- `FarmCarbonOffsetMarketplace` - Carbon offset trading
- `FarmBiodiversityCredits` - Biodiversity credits
- `FarmSustainabilityScoring` - Sustainability scoring system
- `FarmSustainabilityRewards` - Sustainability reward system
- `FarmCompostManagement` - Compost batch management
- `FarmWasteManagement` - Waste management
- `FarmWaterUsageTracking` - Water usage tracking and monitoring
- `FarmEnergyConsumptionTracking` - Energy consumption tracking for farms
- `FarmCarbonFootprintTracking` - Carbon footprint calculation and tracking
- `FarmBiodiversityIndex` - Biodiversity index calculation and tracking
- `FarmRegenerativeAgricultureTracking` - Regenerative agriculture practices tracking

### 🤝 **Cooperative & Community** (4 Features)

- `FarmFarmerCooperative` - Farmer cooperative management
- `FarmCooperativeVoting` - Onchain voting for cooperatives
- `FarmCropResearch` - Crop research data sharing
- `FarmAgroforestryManagement` - Agroforestry system management and tracking

### 📊 **Analytics & Planning** (13 Features)

- `FarmProductionAnalytics` - Production analytics
- `FarmResourceOptimization` - Resource optimization
- `FarmRiskAssessment` - Risk assessment system
- `FarmSuccessionPlanning` - Succession planning
- `FarmSubsidyClaims` - Subsidy claims processing
- `FarmPrecisionAgriculture` - Store precision agriculture data and analytics
- `FarmDroneMonitoring` - Store drone monitoring data and aerial analysis
- `FarmIoTDeviceIntegration` - Integrate and store IoT device sensor data
- `FarmSoilQualityIndex` - Soil quality index calculation and tracking
- `FarmCropQualityIndex` - Crop quality index calculation and tracking
- `FarmFarmerReputation` - Farmer reputation system based on performance
- `FarmSupplierReputation` - Supplier reputation and rating system
- `FarmBuyerReputation` - Buyer reputation and payment reliability tracking

### 🎨 **NFT & Digital Assets** (1 Feature)

- `PlantationNFT` - ERC-721 NFT contract for cocoa plantations with onchain metadata

### 🔬 **Experimental Onchain Lab Features** (30 Features)

#### Climate & ESG Analytics
- `FarmClimateRiskScoring` - Climate risk scoring for each field and crop
- `FarmClimateScenarioSimulation` - Scenario simulations for climate pathways and yield impact
- `FarmYieldClimateSensitivity` - Yield sensitivity analysis to climate stressors
- `FarmESGIndex` - ESG index scoring for each farm operation
- `FarmSustainabilityKPITracking` - Track ESG KPIs and sustainability targets onchain
- `FarmImpactInvestorReporting` - Structured impact reports for mission-aligned capital

#### Inclusive Finance & Social Metrics
- `FarmCreditAccessIndex` - Index of credit access conditions for smallholders
- `FarmLoanRepaymentHistory` - Tamper-proof loan repayment performance history
- `FarmFinancialInclusionScore` - Composite score for farmer financial inclusion
- `FarmLaborComplianceAudits` - Labor rights audits and compliance records
- `FarmWorkerSafetyIncidents` - Safety incident reporting and resolution history
- `FarmFairWageVerification` - Verification of fair wage and payment practices

#### Land Use, Forests & Packaging
- `FarmLandUseChangeRegistry` - Registry of land use changes and habitat conversion
- `FarmSoilDegradationAlerts` - Alerts for land degradation and erosion trends
- `FarmHabitatConversionTracking` - Track conversion of natural habitat to farmland
- `FarmDeforestationAlerts` - Deforestation detection and escalation workflow
- `FarmForestBufferMonitoring` - Monitoring of forest buffer zones around farms
- `FarmTreeCoverRestorationTracking` - Track restoration of tree cover and replanting efforts
- `FarmPackagingMaterialTracking` - Packaging material and format tracking per batch
- `FarmPlasticReductionMetrics` - Plastic usage and reduction metrics for products
- `FarmRecycledContentCertification` - Certification of recycled content percentages

#### Training, Cold Chain & Grievances
- `FarmColdChainTemperatureLogs` - Temperature logs for cold chain shipments
- `FarmColdChainRouteTracking` - Route and handler tracking for perishable goods
- `FarmColdChainSpoilageClaims` - Spoilage incident logging for insurance and QA
- `FarmTrainingAttendanceTracking` - Training attendance tracking for farmers
- `FarmTrainingOutcomeSurveys` - Post-training outcome surveys and feedback scores
- `FarmFarmerCertificationProgress` - Track progress towards training-based certifications
- `FarmGrievanceRegistry` - Registry of farmer and worker grievances
- `FarmDisputeResolutionWorkflow` - Workflow for dispute review and decision logging
- `FarmRemediationActionTracking` - Track remediation actions and follow-up for grievances

### ⛓️ **Advanced Onchain Features** (30 Features) ✅ **All Implemented**

#### Onchain Governance & DAO
- `FarmOnchainVoting` - Decentralized autonomous organization voting for farm cooperatives ✅
- `FarmProposalManagement` - Onchain proposal submission and execution system ✅
- `FarmTreasuryManagement` - Multi-sig treasury management for farmer collectives ✅
- `FarmGovernanceToken` - ERC-20 governance token for cooperative decision-making ✅

#### Onchain Oracles & Data Feeds
- `FarmOracleAggregator` - Chainlink-compatible oracle aggregation for price feeds ✅
- `FarmWeatherOracle` - Decentralized weather data oracle integration ✅
- `FarmMarketPriceOracle` - Real-time market price oracle feeds ✅
- `FarmSoilDataOracle` - External soil testing data oracle integration ✅

#### Onchain Identity & Reputation
- `FarmOnchainIdentity` - Decentralized identity verification system ✅
- `FarmReputationScoring` - Onchain reputation scoring based on transaction history ✅
- `FarmCredentialVerification` - Verifiable credentials for certifications ✅
- `FarmFarmerAttestation` - Onchain attestation system for farmer verification ✅

#### Onchain Payments & Escrow
- `FarmPaymentSplitter` - Automated payment splitting for multi-party transactions ✅
- `FarmEscrowFactory` - Factory contract for creating escrow agreements ✅
- `FarmSubscriptionPayments` - Recurring payment smart contracts ✅
- `FarmMilestonePayments` - Milestone-based payment release system ✅

#### Onchain Derivatives & Financial Instruments
- `FarmCropOptions` - Options contracts for crop price hedging ✅
- `FarmYieldSwaps` - Yield swap derivatives for risk management ✅
- `FarmCommodityFutures` - Commodity futures contract execution ✅
- `FarmStakingRewards` - Staking mechanism with onchain reward distribution ✅

#### Onchain Automation & Keepers
- `FarmKeeperNetwork` - Automated keeper network for contract maintenance ✅
- `FarmConditionalExecution` - Conditional transaction execution system ✅
- `FarmAutomatedHarvest` - Automated harvest trigger based on onchain conditions ✅
- `FarmScheduledOperations` - Time-based scheduled operation execution ✅

#### Onchain Cross-Chain & Interoperability
- `FarmCrossChainBridge` - Cross-chain asset bridging for multi-chain operations ✅
- `FarmLayer2Integration` - Layer 2 scaling solution integration ✅
- `FarmMultiChainRegistry` - Multi-chain asset registry synchronization ✅
- `FarmChainlinkAutomation` - Chainlink automation integration for onchain triggers ✅

#### Onchain Security & Access Control
- `FarmRoleBasedAccess` - Role-based access control with onchain permissions ✅
- `FarmMultiSigWallet` - Multi-signature wallet for cooperative funds ✅
- `FarmEmergencyPause` - Emergency pause mechanism for contract security ✅
- `FarmUpgradeableProxy` - Upgradeable proxy pattern for contract evolution ✅

**All 30 advanced onchain features are fully implemented and ready for deployment. These contracts integrate seamlessly with Reown (WalletConnect) for Web3 wallet connectivity.**

---

## 🚀 Deployment Guide

### Prerequisites

- Node.js 18+ and npm/yarn
- Git
- A Reown (WalletConnect) Project ID ([Get one here](https://cloud.reown.com))
- A blockchain RPC endpoint (for testnets or mainnet)
- Private key or mnemonic for deployment (keep secure!)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd cocoabase

# Install dependencies
npm install

# Copy environment file
cp env.example .env.local
```

### Environment Configuration

Create a `.env.local` file with the following variables:

```env
# Reown WalletConnect Project ID
NEXT_PUBLIC_PROJECT_ID=your_reown_project_id

# Private key for contract deployment (NEVER commit this!)
PRIVATE_KEY=your_private_key_here

# RPC URLs for different networks
SEPOLIA_RPC_URL=https://rpc.sepolia.org
ARBITRUM_RPC_URL=https://arb1.arbitrum.io/rpc

# Optional: Etherscan API key for contract verification
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### Compile Smart Contracts

```bash
# Compile all contracts
npm run compile
```

### Deploy to Local Network

1. **Start a local Hardhat node:**
   ```bash
   npm run node
   ```
   This starts a local blockchain on `http://127.0.0.1:8545`

2. **Deploy contracts:**
   ```bash
   npm run deploy:local
   ```

3. **Interact with contracts:**
   ```bash
   npm run interact:local
   ```

### Deploy to Sepolia Testnet

1. **Fund your deployment account** with Sepolia ETH (get from [faucets](https://sepoliafaucet.com/))

2. **Deploy contracts:**
   ```bash
   npm run deploy:sepolia
   ```

3. **Verify contracts on Etherscan:**
   ```bash
   npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
   ```

### Deploy to Arbitrum

1. **Fund your deployment account** with ETH on Arbitrum

2. **Update hardhat.config.ts** with your Arbitrum RPC URL

3. **Deploy contracts:**
   ```bash
   npx hardhat run scripts/deploy.js --network arbitrum
   ```

### Deploy to Mainnet

⚠️ **WARNING**: Mainnet deployment costs real money. Test thoroughly on testnets first!

1. **Ensure all tests pass:**
   ```bash
   npm test
   ```

2. **Review gas costs:**
   ```bash
   REPORT_GAS=true npm run compile
   ```

3. **Deploy with caution:**
   ```bash
   npx hardhat run scripts/deploy.js --network mainnet
   ```

### Deployment Scripts

The deployment process saves deployment information to `deployments/deployment-{timestamp}.json`:

```json
{
  "contractAddress": "0x...",
  "deployer": "0x...",
  "network": "sepolia",
  "chainId": "11155111",
  "deployedAt": "2024-01-01T00:00:00.000Z"
}
```

### Frontend Deployment

1. **Build the Next.js application:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

3. **Deploy to Vercel/Netlify:**
   - Connect your repository
   - Set environment variables
   - Deploy automatically on push

### Multi-Contract Deployment

To deploy all 243+ contracts, you can create a batch deployment script:

```javascript
// scripts/deploy-all.js
const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const contracts = [
    "PlantationNFT",
    "FarmComplianceReporting",
    "FarmCropMonitoring",
    // ... add all contracts
  ];
  
  const deployments = {};
  
  for (const contractName of contracts) {
    const Contract = await ethers.getContractFactory(contractName);
    const contract = await Contract.deploy();
    await contract.waitForDeployment();
    deployments[contractName] = await contract.getAddress();
    console.log(`${contractName} deployed to:`, deployments[contractName]);
  }
  
  fs.writeFileSync(
    "deployments/all-contracts.json",
    JSON.stringify(deployments, null, 2)
  );
}
```

## 🔐 Security Considerations

- **Never commit private keys** to version control
- **Use environment variables** for sensitive data
- **Test thoroughly** on testnets before mainnet deployment
- **Audit contracts** before deploying with real funds
- **Use multi-sig wallets** for production deployments
- **Implement access controls** properly in contracts
- **Monitor gas costs** and optimize where possible

## 📚 Documentation

- [Smart Contract Documentation](./contracts/index.sol) - Complete contract reference
- [API Documentation](./docs/) - Frontend hooks and utilities
- [Deployment Guide](./docs/DEPLOYMENT.md) - Detailed deployment instructions

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details.

## 📄 License

MIT License - see LICENSE file for details

## 🌟 Key Differentiators

1. **Comprehensive Coverage**: 243+ smart contracts covering every aspect of agriculture
2. **Real-World Focus**: Solves actual problems faced by farmers and supply chain participants
3. **Onchain Transparency**: All operations are verifiable and immutable
4. **Financial Inclusion**: Opens access to credit, insurance, and markets
5. **Sustainability Focus**: Built-in carbon credits and biodiversity tracking
6. **NFT Integration**: Real-world assets represented as tradeable NFTs
7. **Modern Tech Stack**: Built with latest Next.js, React, and Web3 technologies

## 🎯 Use Cases

- **Smallholder Farmers**: Access to financing, insurance, and fair markets
- **Agribusinesses**: Supply chain transparency and compliance tracking
- **Consumers**: Verify product origin and sustainability claims
- **Investors**: Transparent agricultural investment opportunities
- **Governments**: Compliance monitoring and subsidy distribution
- **NGOs**: Track impact and ensure fair trade practices

---

**Built with ❤️ for the future of agriculture**

