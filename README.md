# 🌱 Cocoa Chain – Onchain Plantation Management Protocol

**Cocoa Chain** is a decentralized, wallet-connected dApp for minting, tracking, and managing onchain cocoa plantations as verifiable digital assets. Built on Next.js with **Reown AppKit** (WalletConnect) integration, every plantation is tokenized, every transaction is onchain, and every harvest is immutable.

**🚀 80+ Onchain Features Powered by Reown Wallet**

All onchain features require **Reown AppKit** wallet connection. The dApp supports 300+ wallets through Reown, providing seamless Web3 connectivity for all operations.

## 🔗 Onchain Architecture

Cocoa Chain leverages blockchain technology to create a transparent, verifiable, and decentralized plantation management system. Each plantation is minted as an onchain asset, with all operations recorded immutably on the blockchain. **Powered by Reown AppKit**, the dApp provides seamless wallet connectivity across 300+ wallets.

### Core Web3 Stack

- **Next.js 16** (App Router) – Modern React framework
- **Reown AppKit** (WalletConnect) – **Primary wallet connection layer** - Multi-wallet support via Reown
- **wagmi + viem** – Ethereum interaction hooks and utilities (integrated with Reown)
- **Zustand** – Decentralized state management
- **Framer Motion** – Smooth onchain transaction animations
- **TanStack Query** – Web3 data caching and synchronization

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- **Reown AppKit Project ID** – [Get one here](https://reown.com/) - **Required for wallet connectivity**
- Web3 Wallet (Reown supports 300+ wallets including MetaMask, WalletConnect, Coinbase Wallet, etc.)

### Environment Setup

1. Clone and install:

   ```bash
   git clone <repo-url>
   cd cocoabase
   npm install
   ```

2. Configure Web3 connection:

   ```bash
   cp env.example .env.local
   ```

3. Add your **Reown AppKit Project ID** (required for wallet connection):

```bash
   NEXT_PUBLIC_PROJECT_ID=your_reown_project_id_here
```

   **Note:** Without a valid Reown Project ID, the dApp will not be able to connect wallets. Get your Project ID from [reown.com](https://reown.com/).

4. Start the dApp:

   ```bash
   npm run dev
   ```

5. **Connect your wallet via Reown** at [http://localhost:3000](http://localhost:3000/)
   
   The dApp uses **Reown AppKit** to provide seamless wallet connectivity. Click "Connect Wallet" to see all supported wallets.

## 🌐 Core Onchain Features

### 🪙 Plantation Management

- **NFT Minting**: Mint unique plantation NFTs with onchain metadata (location, area, stage, health scores)
- **Onchain Registry**: Every plantation exists as a verifiable onchain asset with immutable history
- **Stage Transitions**: All growth stage changes recorded as blockchain transactions
- **Ownership Transfer**: Transfer, trade, or stake your plantation NFTs onchain
- **Metadata Storage**: IPFS-backed metadata for plantation details, photos, and documents
- **Multi-chain Support**: Deploy plantations across multiple EVM-compatible chains

### 👛 Wallet Integration (Powered by Reown AppKit)

- **300+ Wallet Support**: Connect with MetaMask, WalletConnect, Coinbase Wallet, Trust Wallet, Rainbow Wallet, and 300+ more via Reown
- **Seamless Connectivity**: One-click wallet connection across all supported wallets
- **Multi-Wallet Support**: Connect and manage multiple wallets simultaneously
- **Wallet Performance**: Track plantation counts, harvest conversion, and carbon footprint per wallet address
- **Onchain Reputation**: Reputation scoring based on onchain plantation performance
- **ENS Integration**: Support for Ethereum Name Service (ENS) domains
- **All Features Require Reown Wallet**: Every onchain feature requires a connected wallet via Reown AppKit

### 📊 Analytics & Reporting

- **Blockchain Analytics**: Track all onchain transactions, mints, transfers, and stage changes
- **Yield Forecast**: Predictive analytics stored onchain for transparency
- **Dashboard Metrics**: Real-time onchain KPIs (total NFTs minted, harvested, active, carbon offsets)
- **Carbon Efficiency Metrics**: Onchain carbon offset calculations per NFT and per hectare
- **Export Analytics**: Export onchain data in CSV, JSON, and Excel formats

### 🌍 Sustainability & Carbon Credits

- **Carbon Credit NFTs**: Mint carbon offset credits as tradeable NFTs
- **Onchain Carbon Tracking**: Immutable carbon offset records per plantation NFT
- **Carbon Marketplace**: Trade carbon credits onchain via NFT marketplace
- **Sustainability Scorecard**: Onchain sustainability scoring and verification

### 💰 DeFi & Financial Management

- **Onchain Receipts**: Store financial receipts as onchain records (IPFS + blockchain)
- **Receipt NFTs**: Mint receipts as verifiable NFTs for accounting
- **Loan Tracker**: Track cooperative loans with onchain smart contracts
- **Financial Dashboard**: Track expenses, revenue, and profit with onchain transaction history
- **Market Prices**: Real-time onchain cocoa commodity prices from DEX aggregators
- **Yield Tokenization**: Tokenize harvest yields as ERC-20 tokens

## 🏛️ Advanced DeFi Features (Powered by Reown Wallet)

### Insurance & Risk Management

- **Insurance Pool**: Create insurance pools for risk coverage with onchain policies
- **Policy Purchase**: Purchase insurance policies with premium calculation
- **Claim Processing**: Process insurance claims with onchain verification
- **Risk Assessment**: Assess risk levels with onchain data

### Lending & Borrowing

- **Lending Pool**: Create lending pools for borrowing and lending
- **Interest Calculation**: Calculate interest rates with onchain formulas
- **Collateral Management**: Manage collateral for loans with onchain tracking
- **Debt Registry**: Register and track debts with onchain records
- **Liquidation Triggers**: Automatic liquidation for undercollateralized positions

### Price & Token Management

- **Price Stabilizer**: Stabilize token prices with reserve mechanisms
- **Token Lock**: Lock tokens with time-based release mechanisms
- **Mint Controller**: Control token minting with supply limits
- **Token Burn**: Burn tokens to reduce supply
- **Transfer Restrictions**: Restrict transfers and manage whitelists

### Rewards & Staking

- **Reward Pool**: Create reward pools for token distribution
- **Staking Rewards**: Calculate staking rewards based on duration and amount
- **Reward Distribution**: Distribute rewards proportionally to stakers

### Governance & Fees

- **Governance Token**: Create governance tokens with voting power
- **Vote Delegation**: Delegate votes to other addresses
- **Fee Collector**: Collect fees from transactions with configurable rates
- **Revenue Share**: Share revenue among shareholders with percentage-based distribution
- **Dividend Distribution**: Distribute dividends to shareholders

### Prediction Markets & Trading

- **Prediction Market**: Create prediction markets for forecasting
- **Market Resolution**: Resolve markets with onchain execution
- **Options Trading**: Create call and put options with premium calculation
- **Futures Exchange**: Trade commodity futures with onchain contracts

## 🚜 Agricultural Onchain Features (Powered by Reown Wallet)

### Land & Registry

- **Land Registry**: Register land parcels with GPS coordinates and area onchain
- **Ownership Transfer**: Transfer land ownership with onchain verification
- **Land Tenure Verification**: Verify land tenure with onchain records

### Insurance & Claims

- **Crop Insurance Claims**: Submit and approve crop insurance claims
- **Weather Insurance Claims**: File weather insurance claims for drought, flood, storm events
- **Claim Processing**: Process claims with onchain verification and payout calculation

### Supply Chain & Traceability

- **Supply Chain Tracking**: Track items through harvest, processing, storage, transport, and market stages
- **Farm-to-Table Traceability**: Full supply chain tracking from farm to consumer
- **Stage Management**: Record traceability events at each stage with onchain verification
- **Chain Verification**: Verify traceability chain integrity onchain

### Certification & Quality

- **Seed Certification**: Certify seeds with certification numbers and validity periods
- **Harvest Certification**: Certify harvests with quantity and quality grades
- **Organic Certification**: Verify organic certifications onchain
- **Fair Trade Certification**: Manage fair trade certifications with premium calculation

### Carbon & Environmental

- **Carbon Credits Trading**: Trade carbon credits onchain with certification verification
- **Carbon Offset Marketplace**: List and purchase carbon offsets
- **Water Quality Monitoring**: Monitor water quality with onchain records
- **Environmental Tracking**: Track environmental metrics with onchain verification

### Financial Services

- **Cooperative Credit Union**: Join credit unions and manage loans onchain
- **Supply Chain Financing**: Request and manage supply chain financing
- **Agricultural Subsidies**: Submit and track agricultural subsidy claims
- **Research Grants**: Manage agricultural research grants with milestone tracking

### Marketplace & Exchange

- **Seed Exchange**: List and purchase seeds with certification verification
- **Equipment Rental**: Rent farm equipment with onchain tracking
- **Commodity Futures**: Trade commodity futures with onchain contracts
- **Labor Pool Matching**: Match workers with jobs onchain

### Monitoring & Management

- **Crop Disease Monitoring**: Record and track crop diseases with treatment status
- **Pest Outbreak Reporting**: Report and track pest outbreaks with risk calculation
- **Livestock Tracking**: Register and track livestock with status updates
- **Harvest Yield Prediction**: Create prediction markets for harvest yields

### Knowledge & Reputation

- **Agricultural Knowledge Base**: Manage agricultural articles with search functionality
- **Farmer Reputation System**: Build and track farmer reputation scores
- **Farmer Education Credits**: Register and verify education credits
- **Community Features**: Farmer networks, ratings, and collaboration tools

## 🛠️ Technical Architecture

### Custom React Hooks (Powered by Reown)

All hooks use `useAccount()` from wagmi (configured with Reown AppKit) for wallet authentication:

#### Core Onchain Hooks
- `useOnchainPlantation` - Plantation NFT management
- `useOnchainHarvest` - Harvest tracking and certification
- `useOnchainCarbonCredits` - Carbon credit trading
- `useOnchainSupplyChain` - Supply chain tracking

#### DeFi Hooks
- `useOnchainInsurancePool` - Insurance pool management
- `useOnchainLendingPool` - Lending pool operations
- `useOnchainPredictionMarket` - Prediction market operations
- `useOnchainStakingRewards` - Staking rewards calculation
- `useOnchainGovernanceToken` - Governance token management
- `useOnchainFeeCollector` - Fee collection and distribution
- `useOnchainRevenueShare` - Revenue sharing system
- `useOnchainTokenBurn` - Token burning operations
- `useOnchainMintController` - Minting control
- `useOnchainTransferRestriction` - Transfer restrictions
- `useOnchainTaxMechanism` - Tax mechanism
- `useOnchainDividendDistribution` - Dividend distribution
- `useOnchainCollateralManager` - Collateral management
- `useOnchainDebtRegistry` - Debt registry
- `useOnchainPriceStabilizer` - Price stabilization
- `useOnchainTokenLock` - Token locking
- `useOnchainRewardPool` - Reward pool management

#### Agricultural Hooks
- `useOnchainLandRegistry` - Land registry system
- `useOnchainCropInsuranceClaims` - Crop insurance claims
- `useOnchainSupplyChainTracking` - Supply chain tracking
- `useOnchainCarbonCreditsTrading` - Carbon credits trading
- `useOnchainSeedCertification` - Seed certification
- `useOnchainHarvestCertification` - Harvest certification
- `useOnchainWeatherDerivatives` - Weather derivatives
- `useOnchainPriceOracles` - Price oracles
- `useOnchainCooperativeGovernance` - Cooperative governance
- `useOnchainEquipmentLeasing` - Equipment leasing
- `useOnchainLaborContracts` - Labor contracts
- `useOnchainFarmSubsidyClaims` - Farm subsidy claims
- `useOnchainFarmToTableTraceability` - Farm-to-table traceability
- `useOnchainFarmerEducationCredits` - Farmer education credits
- `useOnchainFarmerReputationSystem` - Farmer reputation system
- `useOnchainCarbonOffsetMarketplace` - Carbon offset marketplace
- `useOnchainWeatherInsuranceClaims` - Weather insurance claims
- `useOnchainCooperativeCreditUnion` - Cooperative credit union
- `useOnchainSeedExchange` - Seed exchange
- `useOnchainEquipmentRentalMarketplace` - Equipment rental
- `useOnchainLaborPoolMatching` - Labor pool matching
- `useOnchainOrganicCertificationVerification` - Organic certification
- `useOnchainFairTradeCertification` - Fair trade certification
- `useOnchainCommodityFuturesExchange` - Commodity futures
- `useOnchainAgriculturalResearchGrants` - Research grants
- `useOnchainSupplyChainFinancing` - Supply chain financing
- `useOnchainLandTenureVerification` - Land tenure verification
- `useOnchainWaterQualityMonitoring` - Water quality monitoring
- `useOnchainPestOutbreakReporting` - Pest outbreak reporting
- `useOnchainHarvestYieldPredictionMarket` - Yield prediction market
- `useOnchainAgriculturalSubsidyDistribution` - Subsidy distribution
- `useOnchainAgriculturalKnowledgeBase` - Knowledge base

### Utility Functions

All utility functions are located in `src/lib/onchain-*-utils.ts` files, providing core logic for each onchain feature. These utilities handle data structures, calculations, and business logic for onchain operations.

### UI Components

The project includes comprehensive UI components for Web3 interactions:
- Form components with Web3 address validation
- Display components with transaction status
- Navigation components for onchain data
- Loading states for Web3 operations

## 📝 License

This project is licensed under the MIT License.
