# 🌱 Cocoa Chain – Onchain Plantation Management Protocol

**Cocoa Chain** is a decentralized, wallet-connected dApp for minting, tracking, and managing onchain cocoa plantations as verifiable digital assets. Built on Next.js with **Reown AppKit** (WalletConnect) integration, every plantation is tokenized, every transaction is onchain, and every harvest is immutable.

## 🎉 40 Onchain Features Total - 20 New Features Added!

Cocoa Chain now includes **40 total onchain features** (20 original + 20 brand new) fully integrated with Reown wallet connectivity. All features require wallet connection and use Reown AppKit for secure, decentralized operations. The **20 new features** include advanced trading, marketplace, and sustainability features. See the [20 New Onchain Features](#-20-new-onchain-features-powered-by-reown-wallet) section below for complete details.

## 🔗 Onchain Architecture

Cocoa Chain leverages blockchain technology to create a transparent, verifiable, and decentralized plantation management system. Each plantation is minted as an onchain asset, with all operations recorded immutably on the blockchain. **Powered by Reown AppKit**, the dApp provides seamless wallet connectivity across 300+ wallets.

### Core Web3 Stack

- **Next.js 16** (App Router) – Modern React framework
- **Reown AppKit** (WalletConnect) – **Primary wallet connection layer** - Multi-wallet support via Reown
- **wagmi + viem** – Ethereum interaction hooks and utilities (integrated with Reown)
- **Zustand** – Decentralized state management
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

## 📜 Smart Contract Deployment

### PlantationNFT Contract

The **PlantationNFT** contract is an ERC-721 NFT contract that tokenizes cocoa plantations as verifiable onchain assets.

#### Contract Address

**Local Hardhat Network:**
- Contract Address: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- Network: Hardhat Local Network
- Chain ID: 1337

#### Deploy Contract

To deploy the contract to a local Hardhat network:

```bash
npm run deploy:hardhat
```

To deploy to Sepolia testnet:

```bash
# Set up your .env.local with:
# SEPOLIA_RPC_URL=your_sepolia_rpc_url
# PRIVATE_KEY=your_private_key
npm run deploy:sepolia
```

#### Contract Operations

The contract supports the following operations:

1. **Mint Plantation NFT**: Mint a new plantation NFT with metadata (location, area, stage, tree count, carbon offset)
2. **Update Stage**: Update the growth stage of a plantation
3. **Update Plantation Data**: Update tree count and carbon offset
4. **Get Plantation Data**: Retrieve plantation information
5. **Transfer NFTs**: Transfer plantation NFTs between addresses

#### Interact with Contract

To perform operations on the deployed contract:

```bash
# Local network
npm run interact:local

# Sepolia testnet
npm run interact:sepolia
```

#### Contract Features

- **ERC-721 Standard**: Full ERC-721 NFT compliance
- **Onchain Metadata**: Plantation data stored onchain (location, area, stage, tree count, carbon offset)
- **IPFS Integration**: Token URIs support IPFS for offchain metadata
- **Ownership Tracking**: Track plantation ownership and counts per address
- **Event Logging**: Emit events for all plantation operations (mint, stage update, data update)
- **Access Control**: Only owners can update their plantation data

#### Contract Functions

- `mintPlantation()`: Mint a new plantation NFT
- `updateStage()`: Update the growth stage of a plantation
- `updatePlantationData()`: Update tree count and carbon offset
- `getPlantationData()`: Get plantation data by token ID
- `totalSupply()`: Get total number of plantations minted
- `balanceOfPlantations()`: Get number of plantations owned by an address

#### Example Usage

```solidity
// Mint a plantation
uint256 tokenId = plantationNFT.mintPlantation(
    ownerAddress,
    "ipfs://Qm...", // token URI
    "Ghana, West Africa", // location
    5000, // area in hectares (scaled by 1000)
    "vegetative", // stage
    1000, // tree count
    25000 // carbon offset in tons (scaled by 1000)
);

// Update stage
plantationNFT.updateStage(tokenId, "flowering");

// Update plantation data
plantationNFT.updatePlantationData(tokenId, 1200, 30000);

// Get plantation data
PlantationData memory data = plantationNFT.getPlantationData(tokenId);
```

## 🌐 Onchain Features

### 🪙 Tokenized Plantation Management

- **NFT Minting**: Mint unique plantation NFTs with onchain metadata (location, area, stage, health scores)
- **Onchain Plantation Registry**: Every plantation exists as a verifiable onchain asset with immutable history
- **Stage Transitions Onchain**: All growth stage changes are recorded as blockchain transactions
- **Plantation Ownership**: Transfer, trade, or stake your plantation NFTs onchain
- **Metadata Storage**: IPFS-backed metadata for plantation details, photos, and documents
- **Onchain Verification**: Verify plantation authenticity and ownership via blockchain explorer
- **Multi-chain Support**: Deploy plantations across multiple EVM-compatible chains
- **Plantation Templates**: Pre-configured NFT templates for quick minting
- **Bulk Minting**: Mint multiple plantations in a single transaction (gas-optimized)

### 📊 Onchain Analytics & Reporting

- **Blockchain Analytics**: Track all onchain transactions, mints, transfers, and stage changes
- **Yield Forecast Onchain**: Predictive analytics stored onchain for transparency
- **Cohort Analysis**: Track NFT cohorts by mint date and growth stage
- **Dashboard Metrics**: Real-time onchain KPIs (total NFTs minted, harvested, active, carbon offsets)
- **Statistics Summary**: Comprehensive onchain statistical overview
- **Carbon Efficiency Metrics**: Onchain carbon offset calculations per NFT and per hectare
- **Forecast Workspace**: Advanced forecasting with onchain data verification
- **Export Analytics**: Export onchain data in CSV, JSON, and Excel formats

### 🌍 Sustainability & Carbon Credits Onchain

- **Carbon Credit NFTs**: Mint carbon offset credits as tradeable NFTs
- **Onchain Carbon Tracking**: Immutable carbon offset records per plantation NFT
- **Tree Count Analytics**: Monitor tree protection metrics stored onchain
- **Environmental Insights**: Geo-insights with onchain verification
- **Carbon Marketplace**: Trade carbon credits onchain via NFT marketplace
- **Sustainability Scorecard**: Onchain sustainability scoring and verification

### 💰 DeFi & Financial Management

- **Onchain Receipts**: Store financial receipts as onchain records (IPFS + blockchain)
- **Receipt NFTs**: Mint receipts as verifiable NFTs for accounting
- **Loan Tracker**: Track cooperative loans with onchain smart contracts
- **Loan Request Workflow**: DeFi loan application and approval via smart contracts
- **Financial Dashboard**: Track expenses, revenue, and profit with onchain transaction history
- **Cost Tracking**: Onchain cost records by category (labor, equipment, fertilizer, etc.)
- **Cost Breakdown**: Visual breakdown with onchain data verification
- **Cost Analysis**: Calculate ROI with onchain financial data
- **Market Prices**: Real-time onchain cocoa commodity prices from DEX aggregators
- **Marketplace Integration**: Connect with DeFi marketplaces for agricultural products
- **Yield Tokenization**: Tokenize harvest yields as ERC-20 tokens

### 🔐 Decentralized Security & Monitoring

- **Wallet-Based Security**: All security tied to your Web3 wallet
- **Onchain Session Management**: Session locking with wallet signature verification
- **Security Events Log**: All security events recorded onchain
- **Security Monitor**: Real-time onchain security monitoring
- **Risk Detection**: Onchain risk assessment and flagging
- **Activity Timeline**: Complete onchain audit trail of all transactions
- **Multi-sig Support**: Support for multi-signature wallets for enhanced security

### 👛 Wallet Integration & Reputation (Powered by Reown AppKit)

- **Reown AppKit Integration**: Primary wallet connection layer using Reown (formerly WalletConnect)
- **300+ Wallet Support**: Connect with MetaMask, WalletConnect, Coinbase Wallet, Trust Wallet, Rainbow Wallet, and 300+ more via Reown
- **Seamless Connectivity**: One-click wallet connection across all supported wallets
- **Multi-Wallet Support**: Connect and manage multiple wallets simultaneously
- **Wallet Performance**: Track plantation counts, harvest conversion, and carbon footprint per wallet address
- **Onchain Reputation**: Reputation scoring based on onchain plantation performance
- **Multi-wallet Dashboard**: View plantations across multiple connected wallets
- **Watchlist Management**: Add wallet addresses to watchlist with onchain labels
- **Wallet Analytics**: Deep analytics on wallet activity and plantation performance
- **ENS Integration**: Support for Ethereum Name Service (ENS) domains
- **Wallet Disconnect**: Secure wallet disconnection with onchain session management
- **All Onchain Features Require Reown Wallet**: Every onchain feature in Cocoa Chain requires a connected wallet via Reown AppKit. All 80+ onchain features use `useAccount` from wagmi (powered by Reown) for wallet authentication and transaction signing. This includes 20 core agricultural features, 20 operational features, 20 additional agricultural features, and 20 latest features - all seamlessly integrated with Reown wallet connectivity

### 🤝 Decentralized Collaboration & DAO

- **DAO Governance**: Propose and vote on plantation management decisions
- **Collaboration Hub**: Add collaborators with onchain role assignments
- **Shared Notes Onchain**: Collaborative notes stored onchain via IPFS
- **Community Share Panel**: Share updates and achievements onchain
- **Farmer Chat Panel**: Decentralized communication via Web3 messaging
- **Help Requests**: Request help from the community with onchain bounties
- **Community Support**: File complaints and track resolution onchain
- **Governance Tokens**: Earn governance tokens for active participation

### 📅 Onchain Operations & Planning

- **Operations Calendar**: Calendar view with onchain event verification
- **Harvest Planner**: Plan harvests with onchain scheduling
- **Harvest Scheduling**: Optimal harvest windows calculated from onchain data
- **Harvest Readiness Check**: Onchain assessment of harvest readiness
- **Harvest Prioritization**: Automatic prioritization using onchain metrics
- **Harvest Efficiency Tracking**: Calculate efficiency with onchain verification
- **Yield Estimation**: Estimate yields using onchain plantation data
- **Resource Allocation**: Allocate resources with onchain records
- **Inventory Panel**: Track equipment and supplies with onchain inventory NFTs
- **Inventory Management**: Complete onchain inventory tracking
- **Equipment Tracker**: Monitor equipment as onchain assets
- **Supply Chain Tracker**: Track supply chain operations onchain (harvest → processing → storage → transport → market)
- **Yield Journal**: Document yields with onchain timestamps
- **Quality Control**: Track quality tests with onchain verification

### 🐛 Pest & Disease Management Onchain

- **Pest/Disease Tracking**: Record incidents with onchain timestamps
- **Treatment Recommendations**: AI-powered recommendations stored onchain
- **Treatment Success Tracking**: Monitor success rates with onchain data
- **Urgent Alert System**: Onchain alerts for critical issues
- **Historical Analysis**: Track patterns using onchain historical data

### 💧 Irrigation Tracker Onchain

- **Irrigation Scheduling**: Optimal schedules calculated from onchain data
- **Water Usage Tracking**: Track consumption with onchain records
- **Soil Moisture Monitoring**: Real-time monitoring with onchain verification
- **Watering Recommendations**: Smart recommendations using onchain weather data

### 📈 Onchain Reporting & Analytics

- **Reporting Dashboard**: Generate reports with onchain data verification
- **Mobile Features**: GPS tracking, offline mode, photo capture, barcode scanning
- **Training Resources**: Educational content with onchain certification NFTs
- **Marketplace**: Buy and sell agricultural products onchain
- **Soil Management**: Track soil tests with onchain records
- **Compliance Tracker**: Monitor compliance with onchain verification
- **Budget Planner**: Create budgets with onchain spending records
- **Labor Management**: Track labor with onchain payment records
- **Worker Management**: Manage workers with onchain profiles
- **Labor Cost Analysis**: Calculate costs using onchain data
- **Maintenance Scheduler**: Schedule maintenance with onchain records
- **Equipment Tracking**: Track equipment as onchain assets
- **Preventive Maintenance**: Schedule maintenance with onchain intervals
- **Maintenance Cost Tracking**: Track costs with onchain verification

### ⚠️ Risk Management Onchain

- **Risk Assessment**: Identify and assess risks with onchain scoring
- **Risk Scoring**: Calculate risk scores using onchain data
- **Risk Mitigation Planning**: Generate mitigation plans with onchain verification
- **Risk Monitoring**: Track risk status with onchain records
- **Risk Exposure**: Calculate exposure using onchain metrics

### 📊 Performance Benchmarking Onchain

- **KPI Dashboard**: Calculate KPIs using onchain data
- **Benchmark Comparison**: Compare performance with onchain benchmarks
- **Performance Trends**: Track trends using onchain historical data
- **Improvement Areas**: Identify areas using onchain analytics

### ⚙️ Smart Contract Automation

- **Automation Rules**: Create automation rules executed via smart contracts
- **Rule Triggers**: Time-based, stage-change, threshold-reached triggers onchain
- **Automation Actions**: Auto-harvest, send alerts, generate reports, backup data onchain
- **Rule Management**: Enable/disable rules with onchain governance
- **Rule Execution**: Automatic execution via smart contracts
- **Gas Optimization**: Optimized smart contract calls for cost efficiency

### 🏛️ Advanced Onchain DeFi Features (Powered by Reown Wallet)

Cocoa Chain now includes 20+ advanced onchain features, all integrated with **Reown AppKit** for seamless wallet connectivity:

#### 🎯 Auction System
- **NFT Auctions**: Create and participate in decentralized auctions for plantation NFTs
- **Bidding Mechanism**: Place bids with onchain verification and automatic refunds
- **Auction Management**: Start, end, and cancel auctions with smart contract execution
- **Reserve Prices**: Set minimum prices with onchain enforcement
- **Time-based Bidding**: Automatic auction expiration and settlement

#### 💰 Bounty System
- **Task Bounties**: Create bounties for agricultural tasks and services
- **Bounty Claims**: Claim bounties with onchain verification
- **Reward Distribution**: Automatic reward distribution via smart contracts
- **Bounty Expiration**: Time-based bounty expiration and cancellation
- **Community Bounties**: Decentralized task marketplace for farmers

#### 🌱 Crowdfunding
- **Project Funding**: Launch crowdfunding campaigns for agricultural projects
- **Contribution Tracking**: Track contributions with onchain records
- **Goal Management**: Set funding goals with automatic status updates
- **Refund Mechanism**: Automatic refunds if goals aren't met
- **Multi-token Support**: Accept contributions in multiple tokens

#### 📈 Derivatives Trading
- **Commodity Derivatives**: Trade derivatives on agricultural commodities
- **Call/Put Options**: Create and exercise call/put options onchain
- **Strike Prices**: Set strike prices with onchain execution
- **Expiry Management**: Automatic expiry and settlement
- **Profit Calculation**: Calculate profits with onchain price feeds

#### 🧩 NFT Fractionalization
- **Shared Ownership**: Fractionalize plantation NFTs for shared ownership
- **Share Trading**: Trade fractional shares onchain
- **Redeem Mechanism**: Redeem NFT with majority share ownership
- **Ownership Tracking**: Track ownership percentages onchain
- **Price per Share**: Set and update share prices dynamically

#### 🗳️ Governance System
- **Proposal Creation**: Create governance proposals with onchain voting
- **Vote Weighting**: Weighted voting based on token holdings
- **Proposal Execution**: Execute passed proposals automatically
- **Vote Tracking**: Track votes with immutable onchain records
- **Quorum Management**: Enforce quorum requirements for proposals

#### 🆔 Decentralized Identity
- **DID Support**: Create decentralized identities (DIDs) for farmers
- **Credential Management**: Issue and verify credentials onchain
- **Reputation System**: Build reputation based on onchain activity
- **Identity Verification**: Verify identities with cryptographic proofs
- **Credential Expiry**: Manage credential expiration dates

#### 💵 Lending Protocol
- **Collateralized Loans**: Create loans with onchain collateral
- **Interest Calculation**: Calculate interest with onchain rates
- **Repayment Tracking**: Track loan repayments automatically
- **Liquidation**: Automatic liquidation for undercollateralized loans
- **Loan Status**: Real-time loan status with onchain updates

#### ⚡ Liquidation System
- **Automatic Liquidation**: Liquidate undercollateralized positions
- **Liquidation Bonus**: Calculate liquidation bonuses onchain
- **Profitability Checks**: Verify liquidation profitability
- **Liquidator Rewards**: Distribute rewards to liquidators
- **Collateral Recovery**: Recover collateral with onchain verification

#### 🔄 Order Matching
- **Buy/Sell Orders**: Create buy and sell orders for tokens
- **Order Matching**: Automatically match compatible orders
- **Order Expiration**: Time-based order expiration
- **Order Cancellation**: Cancel orders with onchain verification
- **Fill Tracking**: Track order fills with immutable records

#### 🌳 Merkle Tree Proofs
- **Merkle Proofs**: Generate and verify Merkle proofs onchain
- **Tree Construction**: Build Merkle trees from address lists
- **Proof Verification**: Verify proofs with cryptographic validation
- **Whitelist Management**: Manage whitelists with Merkle trees
- **Airdrop Support**: Support for airdrops using Merkle proofs

#### 🎨 NFT Marketplace
- **NFT Listings**: List plantation NFTs for sale
- **Offer System**: Make offers on listed NFTs
- **Accept Offers**: Accept offers with onchain execution
- **Marketplace Fees**: Calculate and distribute marketplace fees
- **Listing Expiration**: Time-based listing expiration

#### 📊 Options Trading
- **Options Creation**: Create call/put options onchain
- **Option Exercise**: Exercise options with profit calculation
- **Intrinsic Value**: Calculate intrinsic value of options
- **Expiry Management**: Handle option expiration automatically
- **In-the-Money Detection**: Detect profitable options automatically

#### 💸 Payment Streams
- **Streaming Payments**: Create payment streams for recurring payments
- **Withdraw Mechanism**: Withdraw from streams with automatic calculation
- **Stream Pausing**: Pause and resume payment streams
- **Stream Cancellation**: Cancel streams with onchain verification
- **Amount Tracking**: Track streamed amounts in real-time

#### 📡 Price Feed Oracle
- **Price Updates**: Update prices from oracle feeds
- **Price Changes**: Track price changes with onchain records
- **Stale Detection**: Detect stale prices automatically
- **Price Formatting**: Format prices with decimal precision
- **Multi-asset Support**: Support multiple asset price feeds

#### 🏠 Asset Rental
- **NFT Rental**: Rent plantation NFTs for specified periods
- **Rental Pricing**: Set daily rental prices with onchain enforcement
- **Collateral Management**: Manage rental collateral automatically
- **Rental Activation**: Activate rentals with onchain verification
- **Completion Tracking**: Track rental completion and asset return

#### 🤝 Settlement System
- **Peer-to-Peer Settlement**: Settle transactions between parties
- **Multi-token Settlement**: Settle with multiple tokens
- **Net Amount Calculation**: Calculate net settlement amounts
- **Dispute Resolution**: Handle disputes with onchain records
- **Settlement Execution**: Execute settlements automatically

#### 🔀 Token Swapping
- **Token Swaps**: Swap tokens with onchain execution
- **Slippage Protection**: Protect against slippage with tolerance settings
- **Price Impact**: Calculate price impact of swaps
- **Swap Rates**: Calculate swap rates dynamically
- **Swap Validation**: Validate swaps before execution

#### 🪙 Asset Tokenization
- **Asset Tokenization**: Tokenize real-world assets as NFTs
- **Token Sales**: Sell tokens representing asset ownership
- **Ownership Calculation**: Calculate ownership percentages
- **Asset Redemption**: Redeem tokens for underlying assets
- **Valuation Tracking**: Track asset valuations onchain

#### 🔐 Zero-Knowledge Proofs
- **ZK Proof Generation**: Generate zero-knowledge proofs
- **Proof Verification**: Verify ZK proofs onchain
- **Merkle ZK Proofs**: Create Merkle tree ZK proofs
- **Range Proofs**: Create range proofs for values
- **Privacy Preservation**: Preserve privacy with ZK proofs

### 🚜 Agricultural Onchain Features (Powered by Reown Wallet)

Cocoa Chain includes 20 specialized agricultural onchain features, all integrated with **Reown AppKit** for seamless wallet connectivity. Every feature requires a connected wallet via Reown to execute onchain transactions.

#### 🏞️ Land Registry System
- **Land Registration**: Register land parcels with GPS coordinates and area onchain
- **Ownership Transfer**: Transfer land ownership with onchain verification via Reown wallet
- **Land Verification**: Verify land ownership using wallet address
- **Area Tracking**: Track land area with immutable onchain records
- **Title Management**: Manage land titles with onchain metadata storage

#### 🛡️ Crop Insurance Claims
- **Claim Submission**: Submit crop insurance claims for drought, flood, pest, disease, or weather damage
- **Claim Approval**: Approve or reject claims with onchain verification via Reown wallet
- **Pending Claims**: Track pending claims with onchain status updates
- **Claim History**: View complete claim history with immutable records
- **Automatic Processing**: Automated claim processing with smart contract execution

#### 📦 Supply Chain Tracking
- **Supply Chain Items**: Create supply chain items for harvest, processing, storage, transport, and market stages
- **Stage Advancement**: Advance items through supply chain stages with onchain verification
- **Location Tracking**: Track item locations at each stage with onchain records
- **Stage Filtering**: Filter items by current stage with onchain queries
- **Timestamp Verification**: Verify timestamps for each stage transition onchain

#### 🌿 Carbon Credits Trading
- **Credit Minting**: Mint carbon credits based on plantation carbon offsets
- **Credit Trading**: Trade carbon credits between wallet addresses via Reown
- **Value Calculation**: Calculate carbon credit values with onchain price feeds
- **Total Credits**: Track total carbon credits per wallet address
- **Credit Ownership**: Verify carbon credit ownership with wallet signatures

#### 🌱 Seed Certification
- **Seed Certification**: Certify seeds with certification numbers and validity periods
- **Validity Checking**: Check certification validity with onchain timestamp verification
- **Expiry Monitoring**: Monitor expiring certifications with onchain alerts
- **Certification Tracking**: Track all seed certifications per wallet address
- **Renewal Reminders**: Automatic renewal reminders for expiring certifications

#### 🌾 Harvest Certification
- **Harvest Certification**: Certify harvests with quantity and quality grades
- **Quality Grading**: Assign quality grades with onchain verification
- **Quantity Tracking**: Track total harvest quantities with onchain records
- **Grade Filtering**: Filter harvests by quality grade with onchain queries
- **Certification History**: View complete harvest certification history onchain

#### 🌦️ Weather Derivatives
- **Derivative Creation**: Create weather derivatives for rainfall, temperature, or humidity
- **Threshold Setting**: Set weather thresholds with onchain enforcement
- **Payout Calculation**: Calculate payouts based on actual weather values
- **Expiration Checking**: Check derivative expiration with onchain timestamps
- **Derivative Trading**: Trade weather derivatives via Reown wallet

#### 💹 Price Oracles
- **Price Updates**: Update commodity prices from oracle providers via Reown wallet
- **Latest Prices**: Get latest prices for commodities with onchain queries
- **Price History**: View price history with onchain timestamp records
- **Price Tracking**: Track price changes with immutable onchain records
- **Multi-commodity Support**: Support multiple commodities with separate price feeds

#### 🏛️ Cooperative Governance
- **Proposal Creation**: Create governance proposals with onchain voting via Reown wallet
- **Vote Casting**: Cast votes on proposals with onchain verification
- **Vote Tracking**: Track votes for and against with immutable records
- **Quorum Management**: Enforce quorum requirements for proposal execution
- **Active Proposals**: Filter active proposals with onchain status checks
- **Proposal Execution**: Execute passed proposals automatically with smart contracts

#### 🔧 Equipment Leasing
- **Lease Creation**: Create equipment leases with rental terms via Reown wallet
- **Lease Status**: Track lease status (active, expired, cancelled) with onchain records
- **Rent Calculation**: Calculate total rent based on lease duration
- **Active Lease Checking**: Check if leases are active with onchain timestamps
- **Lease Management**: Manage leases with onchain status updates

#### 👷 Labor Contracts
- **Contract Creation**: Create labor contracts with hourly rates and terms via Reown wallet
- **Wage Calculation**: Calculate wages based on hours worked with onchain records
- **Active Contracts**: Filter active contracts with onchain status checks
- **Contract Management**: Manage contract status with onchain updates
- **Payment Tracking**: Track labor payments with immutable onchain records

#### 💊 Fertilizer Tracking
- **Fertilizer Recording**: Record fertilizer applications with type and quantity
- **Usage Tracking**: Track total fertilizer used per plantation with onchain records
- **Type Filtering**: Filter fertilizer records by type with onchain queries
- **Application History**: View complete fertilizer application history onchain
- **Quantity Analysis**: Analyze fertilizer quantities with onchain calculations

#### 🐛 Pest Control Records
- **Treatment Recording**: Record pest control treatments with pest type and treatment method
- **Type Filtering**: Filter pest records by pest type with onchain queries
- **Recent Treatments**: Get recent treatments within specified days with onchain timestamps
- **Treatment History**: View complete pest control treatment history onchain
- **Effectiveness Tracking**: Track treatment effectiveness with onchain records

#### 💧 Water Rights Management
- **Water Allocation**: Allocate water rights to plantations with onchain records
- **Usage Recording**: Record water usage with onchain verification via Reown wallet
- **Remaining Allocation**: Calculate remaining water allocation with onchain calculations
- **Usage Tracking**: Track water usage per plantation with immutable records
- **Allocation Management**: Manage water allocations with onchain updates

#### 🏘️ Land Lease Agreements
- **Lease Creation**: Create land lease agreements with rental terms via Reown wallet
- **Lease Cancellation**: Cancel leases with onchain verification (lessor only)
- **Duration Calculation**: Calculate lease duration with onchain timestamps
- **Lease Status**: Track lease status (active, expired, cancelled) with onchain records
- **Rent Management**: Manage lease rentals with onchain payment records

#### 📈 Crop Futures Trading
- **Future Creation**: Create crop futures with quantity, price, and delivery date
- **Future Filling**: Fill futures with onchain verification via Reown wallet
- **Value Calculation**: Calculate total future value with onchain calculations
- **Status Tracking**: Track future status (open, filled, expired) with onchain records
- **Delivery Management**: Manage future deliveries with onchain timestamps

#### 💼 Trade Finance
- **Finance Creation**: Create trade finance requests with amount, interest rate, and terms
- **Finance Approval**: Approve trade finance requests via Reown wallet (lender only)
- **Interest Calculation**: Calculate interest with onchain rate calculations
- **Status Tracking**: Track finance status (pending, approved, repaid) with onchain records
- **Repayment Tracking**: Track repayments with immutable onchain records

#### ✅ Quality Certification
- **Quality Certification**: Certify product quality with grades and validity periods
- **Validity Checking**: Check certification validity with onchain timestamp verification
- **Grade Filtering**: Filter certifications by quality grade with onchain queries
- **Certification Tracking**: Track all quality certifications per product with onchain records
- **Expiry Monitoring**: Monitor expiring certifications with onchain alerts

#### 💰 Farm Subsidy Claims
- **Claim Submission**: Submit farm subsidy claims with subsidy type and amount
- **Claim Approval**: Approve subsidy claims with onchain verification via Reown wallet
- **Total Amount Calculation**: Calculate total approved subsidy amounts with onchain calculations
- **Status Tracking**: Track claim status (pending, approved, rejected) with onchain records
- **Claim History**: View complete subsidy claim history with immutable records

#### 📊 Agricultural Data Marketplace
- **Data Listing**: List agricultural data for sale with price and description via Reown wallet
- **Data Purchase**: Purchase data listings with onchain payment verification
- **Listing Cancellation**: Cancel data listings with onchain verification (seller only)
- **Available Listings**: Filter available listings with onchain status checks
- **Marketplace Management**: Manage data marketplace with onchain transaction records

### 🌱 Carbon Calculator Onchain

- **Carbon Offset Calculation**: Calculate offsets with onchain verification
- **Carbon Projections**: Project offsets for 30 days, 90 days, and 1 year onchain
- **Potential Increase**: Calculate potential increase using onchain data
- **Carbon Efficiency**: Calculate efficiency per tree and per hectare onchain
- **Efficiency Scoring**: Calculate scores using onchain metrics
- **Carbon Savings**: Calculate savings with onchain verification
- **Carbon Credit Trading**: Trade carbon credits as NFTs onchain

### 🔗 Supply Chain Management Onchain

- **Supply Chain Stages**: Track stages onchain (harvest → processing → storage → transport → market → delivered)
- **Stage Management**: Advance items through stages with onchain verification
- **Stage Efficiency**: Calculate efficiency using onchain data
- **Supply Chain Metrics**: Track yield at each stage with onchain records
- **Delayed Items**: Identify delays with onchain timestamps
- **Stage Progress**: Calculate progress using onchain data
- **Supply Chain Summary**: Comprehensive summary with onchain verification

### 📈 Advanced Onchain Analytics

- **Efficiency Scores**: Calculate scores using onchain data
- **Productivity Index**: Calculate indices with onchain benchmarks
- **Growth Metrics**: Track growth rates using onchain historical data
- **Compound Growth Rate**: Calculate rates using onchain data
- **Efficiency Trends**: Track trends with onchain verification
- **Efficiency Reports**: Generate reports using onchain data
- **Overall Efficiency**: Calculate overall scores using onchain metrics

### 🎯 Yield Optimization Onchain

- **Yield Analysis**: Analyze yields using onchain data
- **Optimization Tips**: AI-powered tips with onchain verification
- **Tip Prioritization**: Prioritize tips using onchain metrics
- **Implementation Steps**: Track implementation with onchain records
- **ROI Calculation**: Calculate ROI using onchain financial data
- **Estimated Increases**: Estimate increases using onchain analytics
- **Category-Based Tips**: Tips categorized with onchain verification

### 🤖 AI Assistant Onchain

- **Question Answering**: Answer questions using onchain data
- **Context-Aware Suggestions**: Generate suggestions from onchain metrics
- **Insights Generation**: Generate insights from onchain plantation data
- **Suggestion Prioritization**: Prioritize suggestions using onchain analytics
- **Interactive Chat**: Chat interface with onchain data integration

### 💵 Budget & Financial Planning Onchain

- **Budget Creation**: Create budgets with onchain allocation records
- **Budget Tracking**: Track spending against onchain budgets
- **Budget Status**: Monitor status using onchain data
- **Budget Utilization**: Calculate utilization using onchain records
- **Budget Variance**: Calculate variance using onchain data
- **Budget Forecasting**: Forecast spending using onchain trends
- **Budget Summary**: Comprehensive summary with onchain verification

### 💳 Loan Management Onchain

- **Loan Calculator**: Calculate payments using onchain interest rates
- **Payment Schedule**: Generate schedules with onchain verification
- **Loan Progress**: Track progress using onchain records
- **Upcoming Payments**: Identify payments using onchain data
- **Overdue Payments**: Track overdue payments onchain
- **Loan Status**: Monitor status using onchain smart contracts
- **Loan Summary**: Summary statistics with onchain verification
- **DeFi Lending Integration**: Connect with DeFi lending protocols

### 🌾 Seasonal Planning Onchain

- **Current Season Detection**: Detect season using onchain timestamps
- **Seasonal Activities**: Get activities with onchain recommendations
- **Activity Prioritization**: Prioritize activities using onchain data
- **Upcoming Season**: Identify next season using onchain calendar
- **Seasonal Calendar**: View activities with onchain verification
- **Activity Due Dates**: Check due dates using onchain data

### 👥 Farmer Network Onchain

- **Farmer Profiles**: Create profiles with onchain verification
- **Farmer Search**: Search farmers using onchain data
- **Rating System**: Rate farmers with onchain reputation scores
- **Network Connections**: Manage connections with onchain records
- **Farmer Groups**: Join groups with onchain membership NFTs
- **Top Rated Farmers**: Find top farmers using onchain rankings
- **Network Summary**: Overview with onchain statistics

### 🔄 Crop Rotation Management Onchain

- **Rotation Planning**: Plan rotations with onchain verification
- **Rotation Recommendations**: Get recommendations using onchain data
- **Years Since Crop**: Calculate years using onchain timestamps
- **Rotation Benefits**: Calculate benefits using onchain metrics
- **Rotation Due Detection**: Detect due rotations using onchain data
- **Multi-Year Planning**: Generate plans with onchain verification

### 🚜 Equipment Management Onchain

- **Equipment Tracking**: Track equipment as onchain assets (NFTs)
- **Maintenance Scheduling**: Schedule maintenance with onchain records
- **Depreciation Calculation**: Calculate depreciation using onchain data
- **Uptime Monitoring**: Monitor uptime with onchain verification
- **Equipment Categories**: Organize equipment with onchain metadata
- **Equipment Summary**: Summary with onchain statistics

### 🌤️ Weather History & Analytics Onchain

- **Historical Data**: Store historical weather data onchain
- **Weather Trends**: Analyze trends using onchain data
- **Monthly Summaries**: Get summaries with onchain verification
- **Period Comparison**: Compare periods using onchain data
- **Extreme Weather Detection**: Identify extremes with onchain records
- **Rainy Days Tracking**: Track rainy days using onchain data

### 📱 Mobile & Voice Features

- **Device Detection**: Detect mobile devices for Web3 wallet integration
- **Camera Access**: Capture photos for onchain NFT metadata
- **Push Notifications**: Web3 push notifications for onchain events
- **Vibration**: Trigger vibration for onchain alerts
- **Content Sharing**: Share onchain content via native share API
- **Battery Level**: Check battery for mobile Web3 operations
- **Connection Type**: Detect network for onchain transaction optimization
- **Offline Mode**: Queue onchain transactions when offline
- **Voice Recording**: Record voice notes for onchain storage
- **Voice Transcription**: Transcribe audio for onchain notes
- **Voice Note Management**: Organize notes with onchain metadata

### 📷 Barcode & QR Code Onchain

- **Barcode Scanning**: Scan QR codes to access onchain plantations
- **QR Code Generation**: Generate QR codes for onchain assets
- **Barcode Parsing**: Parse barcodes to extract onchain IDs
- **Format Validation**: Validate formats for onchain verification
- **Quick Access**: Quick access to onchain assets via scanning

### 🏆 Achievement System Onchain

- **Achievement Types**: Multiple categories with onchain badges (NFTs)
- **Achievement Rarity**: Common, rare, epic, and legendary onchain achievements
- **Progress Tracking**: Track progress with onchain records
- **Achievement Unlocking**: Automatically unlock achievements via smart contracts
- **Achievement Summary**: Overview with onchain statistics
- **Achievement Filtering**: Filter achievements using onchain data
- **Achievement Trading**: Trade achievement NFTs onchain

### 📄 Document Management Onchain

- **Document Library**: Store documents with IPFS + onchain verification
- **Document Scanner**: Scan documents for onchain storage
- **Document Processing**: Process documents with onchain metadata
- **Document Search**: Search documents using onchain indexes
- **Document Validation**: Validate documents with onchain verification
- **Certification Manager**: Track certifications as onchain NFTs
- **Certification Tracking**: Track status with onchain records
- **Certification Expiry Monitoring**: Monitor expiry using onchain timestamps
- **Certification Badges**: Visual badges with onchain verification
- **Compliance Tracker**: Track compliance with onchain records
- **Compliance Rate Calculation**: Calculate rates using onchain data
- **Compliance Deadlines**: Monitor deadlines with onchain timestamps
- **Compliance Status**: Track status with onchain verification

### 📊 Data Management Onchain

- **Data Export**: Export onchain data in multiple formats
- **Data Import**: Import data with onchain verification
- **Data Management Panel**: Centralized management with onchain sync
- **Backup & Restore**: Backup and restore with onchain verification
- **Data Sync**: Sync data onchain with operation queue
- **Sync Status Monitoring**: Track sync operations onchain
- **Offline Support**: Queue operations for onchain sync when online
- **Online Status Detection**: Detect status for onchain operations

### 🎨 User Experience

- **Dark Theme Support**: Full dark mode with Web3 wallet theme sync
- **Keyboard Shortcuts**: Power user shortcuts for onchain operations
- **Onboarding Tour**: Guided tour for Web3 wallet connection
- **Global Search**: Search across onchain plantations, tasks, and notes
- **Advanced Search**: Multi-field search with onchain operators
- **Advanced Filters**: Multi-criteria filtering with onchain presets
- **Quick Actions**: Quick access to common onchain operations
- **Notification Preferences**: Customize onchain alert settings
- **Settings Panel**: Comprehensive Web3 application settings

### 🔔 Alerts & Notifications Onchain

- **Alert Manager**: Centralized onchain alert management
- **Alert Toaster**: Toast notifications for onchain events
- **Alert Insights**: Actionable insights from onchain alert patterns
- **Task Deadline Alerts**: Automatic alerts for onchain task deadlines
- **Stage Change Notifications**: Notify on onchain stage transitions
- **Weather Alerts**: Proactive weather warnings with onchain verification
- **Notification Center**: Centralized hub with onchain read/unread status
- **Price Alerts**: Market price alerts with onchain thresholds

### 🚀 Latest Onchain Features (Powered by Reown Wallet)

Cocoa Chain now includes 20 additional onchain features, all integrated with **Reown AppKit** for seamless wallet connectivity. Every feature requires a connected wallet via Reown to execute onchain transactions.

#### 🏪 Agricultural Marketplace System
- **Listing Creation**: Create marketplace listings for agricultural products via Reown wallet
- **Product Purchase**: Purchase listings with onchain verification
- **Active Listings**: Filter active listings with onchain status checks
- **Total Value Calculation**: Calculate total marketplace value with onchain processing

#### 🪙 Farm Asset Tokenization
- **Asset Tokenization**: Tokenize farm assets (land, equipment, crop, livestock) via Reown wallet
- **Token Redemption**: Redeem tokens for physical assets with onchain verification
- **Active Assets**: Filter active tokenized assets with onchain status checks
- **Total Value**: Calculate total tokenized value with onchain processing

#### 🔬 Agricultural Research Data Sharing
- **Data Sharing**: Share research data with access levels (public, private, restricted) via Reown wallet
- **Public Data**: Filter public research data with onchain access level checks
- **Research by Type**: Filter research by type with onchain queries
- **Data Integrity**: Verify data integrity using onchain hash verification

#### 💵 Crop Insurance Premium Calculator
- **Premium Calculation**: Calculate insurance premiums based on coverage and rates via Reown wallet
- **Premiums by Plantation**: Get premiums by plantation with onchain filtering
- **Total Premium**: Calculate total premium with onchain processing
- **Recent Calculations**: Get recent premium calculations with onchain timestamp filtering

#### 🛒 Farm Equipment Marketplace
- **Equipment Listing**: List farm equipment for sale with conditions via Reown wallet
- **Equipment Purchase**: Purchase equipment with onchain verification
- **Available Equipment**: Filter available equipment with onchain status checks
- **Equipment by Condition**: Filter equipment by condition (new, used, refurbished) with onchain queries

#### 📈 Agricultural Commodity Exchange
- **Order Creation**: Create buy/sell orders for commodities via Reown wallet
- **Order Filling**: Fill orders with onchain verification
- **Open Orders**: Filter open orders with onchain status checks
- **Orders by Commodity**: Filter orders by commodity type with onchain queries

#### 👔 Farm Labor Marketplace
- **Job Posting**: Post farm labor jobs with wages and duration via Reown wallet
- **Job Filling**: Fill jobs with onchain verification
- **Open Jobs**: Filter open jobs with onchain status checks
- **Wage Calculation**: Calculate total wages with onchain processing

#### 💰 Agricultural Supply Chain Finance
- **Finance Request**: Create supply chain finance requests with collateral via Reown wallet
- **Finance Approval**: Approve finance requests with onchain verification (lender only)
- **Repayment Calculation**: Calculate repayment including interest with onchain processing
- **Pending Requests**: Filter pending finance requests with onchain status checks

#### 🏞️ Farm Land Valuation System
- **Valuation Creation**: Create land valuations with appraiser and factors via Reown wallet
- **Valuations by Land**: Get valuations by land parcel with onchain filtering
- **Recent Valuations**: Get recent valuations with onchain timestamp filtering
- **Average Valuation**: Calculate average valuation with onchain processing

#### 📊 Agricultural Impact Measurement
- **Impact Recording**: Record impact measurements (environmental, social, economic) via Reown wallet
- **Impacts by Type**: Filter impacts by type with onchain queries
- **Total Impact**: Calculate total impact by metric with onchain processing
- **Recent Measurements**: Get recent measurements with onchain timestamp filtering

#### 🛡️ Crop Disease Prevention System
- **Prevention Planning**: Create disease prevention plans with scheduled dates via Reown wallet
- **Prevention Completion**: Complete prevention plans with onchain verification
- **Scheduled Preventions**: Get scheduled preventions with onchain timestamp checks
- **Preventions by Disease**: Filter preventions by disease type with onchain queries

#### 🌿 Farm Sustainability Scoring
- **Score Recording**: Record sustainability scores by category (environmental, social, economic, overall) via Reown wallet
- **Scores by Category**: Filter scores by category with onchain queries
- **Average Score**: Calculate average sustainability score with onchain processing
- **High Scores**: Filter high sustainability scores above minimum threshold with onchain queries

#### 💳 Agricultural Credit Scoring
- **Credit Calculation**: Calculate credit scores with factors via Reown wallet
- **Good Credit**: Filter good credit scores with onchain status checks
- **Recent Scores**: Get recent credit scores with onchain timestamp filtering
- **Average Score**: Calculate average credit score with onchain processing

#### ⚠️ Farm Risk Assessment System
- **Risk Assessment**: Create risk assessments (weather, market, disease, financial) via Reown wallet
- **High Risk**: Filter high/critical risk assessments with onchain level checks
- **Assessments by Type**: Filter assessments by risk type with onchain queries
- **Recent Assessments**: Get recent assessments with onchain timestamp filtering

#### 💲 Agricultural Commodity Pricing
- **Price Updates**: Update commodity prices with market information via Reown wallet
- **Latest Price**: Get latest price for commodity with onchain queries
- **Prices by Market**: Filter prices by market with onchain queries
- **Price History**: Get price history for commodity with onchain timestamp sorting

#### 🔧 Farm Equipment Maintenance Records
- **Maintenance Recording**: Record equipment maintenance with cost and technician via Reown wallet
- **Maintenance by Equipment**: Get maintenance records by equipment with onchain filtering
- **Total Cost**: Calculate total maintenance cost with onchain processing
- **Recent Maintenance**: Get recent maintenance records with onchain timestamp filtering

#### 📄 Agricultural Export Documentation
- **Document Creation**: Create export documents with destination and type via Reown wallet
- **Document Approval**: Approve export documents with onchain verification
- **Pending Documents**: Filter pending documents with onchain status checks
- **Documents by Destination**: Filter documents by destination with onchain queries

#### 💼 Farm Investment Tracking
- **Investment Recording**: Record investments with type, amount, and expected return via Reown wallet
- **Active Investments**: Filter active investments with onchain status checks
- **Total Investment**: Calculate total investment amount with onchain processing
- **Expected Return**: Calculate total expected return with onchain processing

#### 🌦️ Agricultural Weather Risk Insurance
- **Insurance Creation**: Create weather risk insurance policies with coverage via Reown wallet
- **Insurance Claims**: Claim insurance with onchain verification
- **Active Insurance**: Filter active insurance policies with onchain status checks
- **Expiry Checking**: Check insurance expiry with onchain timestamp verification

#### 📈 Farm Production Analytics
- **Metric Recording**: Record production metrics with period information via Reown wallet
- **Metrics by Plantation**: Get metrics by plantation with onchain filtering
- **Metrics by Period**: Filter metrics by period with onchain queries
- **Average Metric**: Calculate average metric values with onchain processing

### 🚀 Additional Latest Onchain Features (Powered by Reown Wallet)

Cocoa Chain now includes 20 more onchain features, all integrated with **Reown AppKit** for seamless wallet connectivity. Every feature requires a connected wallet via Reown to execute onchain transactions.

#### 📊 Agricultural Commodity Futures Trading
- **Future Creation**: Create commodity futures contracts with expiry dates via Reown wallet
- **Future Settlement**: Settle futures contracts with onchain verification
- **Open Futures**: Filter open futures with onchain status checks
- **Expiry Checking**: Check future expiry with onchain timestamp verification

#### 🛡️ Farm Equipment Warranty Tracking
- **Warranty Registration**: Register equipment warranties with providers and end dates via Reown wallet
- **Warranty Claims**: Claim warranties with onchain verification
- **Active Warranties**: Filter active warranties with onchain status checks
- **Expiry Monitoring**: Monitor warranty expiry with onchain timestamp verification

#### 💰 Agricultural Supply Chain Payments
- **Payment Creation**: Create supply chain payments with invoice tracking via Reown wallet
- **Payment Completion**: Complete payments with onchain verification
- **Pending Payments**: Filter pending payments with onchain status checks
- **Total Payments**: Calculate total payments by payee with onchain processing

#### 👷 Farm Labor Productivity Tracking
- **Productivity Recording**: Record worker productivity with output and hours via Reown wallet
- **Productivity Rate**: Calculate productivity rates with onchain processing
- **Worker Filtering**: Filter productivity by worker with onchain queries
- **Total Output**: Calculate total output with onchain processing

#### 📈 Agricultural Market Intelligence
- **Intelligence Creation**: Create market intelligence with price and trend data via Reown wallet
- **Commodity Filtering**: Filter intelligence by commodity with onchain queries
- **Latest Intelligence**: Get latest intelligence with onchain timestamp sorting
- **Trending Commodities**: Get trending commodities with onchain trend analysis

#### 📦 Farm Resource Allocation System
- **Resource Allocation**: Allocate resources to different recipients via Reown wallet
- **Resource Filtering**: Filter allocations by resource type with onchain queries
- **Total Allocation**: Calculate total allocated resources with onchain processing
- **Recipient Filtering**: Filter allocations by recipient with onchain queries

#### 📝 Agricultural Contract Management
- **Contract Creation**: Create contracts with counterparties and end dates via Reown wallet
- **Contract Termination**: Terminate contracts with onchain verification
- **Active Contracts**: Filter active contracts with onchain status checks
- **Expiry Checking**: Check contract expiry with onchain timestamp verification

#### 📊 Farm Performance Benchmarking
- **Benchmark Creation**: Create performance benchmarks with industry averages via Reown wallet
- **Performance Ratio**: Calculate performance ratios with onchain processing
- **Above Average**: Check if performance is above average with onchain comparison
- **Metric Filtering**: Filter benchmarks by metric with onchain queries

#### 💼 Agricultural Trade Settlement
- **Settlement Creation**: Create trade settlements between buyers and sellers via Reown wallet
- **Trade Settlement**: Settle trades with onchain verification
- **Pending Settlements**: Filter pending settlements with onchain status checks
- **Party Filtering**: Filter settlements by party with onchain queries

#### 📉 Farm Asset Depreciation Tracking
- **Depreciation Recording**: Record asset depreciation with original and current values via Reown wallet
- **Depreciation Amount**: Calculate depreciation amounts with onchain processing
- **Depreciation Rate**: Calculate depreciation rates with onchain processing
- **Asset Filtering**: Filter depreciation by asset with onchain queries

#### ✅ Agricultural Quality Control System
- **Quality Checks**: Perform quality checks with scores via Reown wallet
- **Passed Checks**: Filter passed quality checks with onchain status checks
- **Failed Checks**: Filter failed quality checks with onchain status checks
- **Average Score**: Calculate average quality scores with onchain processing

#### 💵 Farm Inventory Valuation
- **Valuation Creation**: Create inventory valuations with quantities and prices via Reown wallet
- **Total Value**: Calculate total inventory value with onchain processing
- **Item Filtering**: Filter valuations by item with onchain queries
- **Valuation Updates**: Update valuations with new prices via Reown wallet

#### 💰 Agricultural Revenue Recognition
- **Revenue Recognition**: Recognize revenue with sources and periods via Reown wallet
- **Period Filtering**: Filter revenue by period with onchain queries
- **Source Filtering**: Filter revenue by source with onchain queries
- **Total Revenue**: Calculate total revenue with onchain processing

#### 💸 Farm Cost Allocation System
- **Cost Allocation**: Allocate costs to different recipients via Reown wallet
- **Cost Type Filtering**: Filter costs by type with onchain queries
- **Allocation Filtering**: Filter costs by allocation target with onchain queries
- **Total Costs**: Calculate total allocated costs with onchain processing

#### 📅 Agricultural Payment Terms Management
- **Terms Creation**: Create payment terms with counterparties and due days via Reown wallet
- **Active Terms**: Filter active terms with onchain status checks
- **Counterparty Filtering**: Filter terms by counterparty with onchain queries
- **Due Date Calculation**: Calculate due dates with onchain processing

#### ⚙️ Farm Equipment Utilization Tracking
- **Utilization Recording**: Record equipment utilization with hours and rates via Reown wallet
- **Equipment Filtering**: Filter utilization by equipment with onchain queries
- **Average Rate**: Calculate average utilization rates with onchain processing
- **Total Hours**: Calculate total hours used with onchain processing

#### 📊 Agricultural Yield Comparison System
- **Comparison Creation**: Create yield comparisons with benchmarks via Reown wallet
- **Yield Difference**: Calculate yield differences with onchain processing
- **Above Benchmark**: Check if yield is above benchmark with onchain comparison
- **Crop Filtering**: Filter comparisons by crop type with onchain queries

#### ⚡ Farm Resource Efficiency Metrics
- **Metric Creation**: Create efficiency metrics with input/output ratios via Reown wallet
- **Resource Filtering**: Filter metrics by resource type with onchain queries
- **Average Efficiency**: Calculate average efficiency with onchain processing
- **Efficiency Threshold**: Check efficiency against thresholds with onchain comparison

#### 📈 Agricultural Market Trend Analysis
- **Trend Analysis**: Create market trend analyses with confidence levels via Reown wallet
- **Commodity Filtering**: Filter analyses by commodity with onchain queries
- **Bullish Trends**: Filter bullish trend analyses with onchain status checks
- **High Confidence**: Filter high confidence analyses with onchain threshold checks

#### 💹 Farm Profitability Analysis
- **Analysis Creation**: Create profitability analyses with revenue and costs via Reown wallet
- **Profitability Check**: Check if farm is profitable with onchain comparison
- **Period Filtering**: Filter analyses by period with onchain queries
- **Average Margin**: Calculate average profit margins with onchain processing

### 🗺️ Geospatial Features Onchain

- **Global Footprint Map**: Interactive map showing all onchain plantations
- **Geo Insights Panel**: Regional insights with onchain verification
- **Location-based Filtering**: Filter plantations using onchain location data
- **Carbon-weighted Markers**: Visualize carbon impact with onchain data

### 🌦️ Weather Integration Onchain

- **Weather Widget**: Real-time weather with onchain verification
- **7-Day Weather Forecast**: Extended forecast with onchain data
- **Weather Impact Assessment**: Assess impact using onchain metrics
- **Weather Score**: Calculate scores using onchain data
- **Weather Recommendations**: Actionable recommendations with onchain verification
- **Weather Alerts**: Alerts with onchain verification
- **Watering Recommendations**: Smart suggestions using onchain data
- **Forecast Analysis**: Analyze forecasts with onchain verification
- **Weather Trends**: Track trends using onchain historical data

### 💹 Market Price Tracking Onchain

- **Market Price Cards**: Display prices with onchain DEX data
- **Price Trend Analysis**: Track trends using onchain price feeds
- **Price Volatility Calculation**: Calculate volatility with onchain data
- **Market Recommendations**: AI-powered insights with onchain verification
- **Revenue Projection**: Calculate projections using onchain prices
- **Best Sell Time Detection**: Identify optimal windows using onchain data
- **Price Alerts**: Set alerts with onchain price thresholds

### 🛒 Marketplace Onchain

- **Buy & Sell Listings**: Create listings as onchain NFTs
- **Seller Ratings**: Rate sellers with onchain reputation scores
- **Listing Management**: Manage listings with onchain verification
- **Search & Filter**: Search listings using onchain data
- **Price Sorting**: Sort listings using onchain prices
- **Rating Sorting**: Sort listings using onchain ratings
- **Location-Based Search**: Find listings using onchain location data
- **Marketplace Summary**: Overview with onchain statistics

### ✅ Quality Control Onchain

- **Quality Assessment**: Comprehensive grading with onchain verification
- **Quality Scoring**: Calculate scores using onchain data
- **Quality Metrics**: Track metrics with onchain records
- **Quality Trends**: Track trends using onchain historical data
- **Quality Comparison**: Compare assessments using onchain data
- **Quality Indicators**: Visual indicators with onchain verification

### 🏅 Certification Management Onchain

- **Certification Types**: Support for multiple certification NFTs
- **Certification Status Tracking**: Monitor status with onchain records
- **Expiry Alerts**: Automatic alerts using onchain timestamps
- **Certification Summary**: Overview with onchain statistics
- **Days Until Expiry**: Calculate days using onchain data

### 🐛 Pest & Disease Management Onchain

- **Pest/Disease Records**: Track incidents with onchain timestamps
- **Severity Assessment**: Classify issues with onchain verification
- **Treatment Status**: Track status using onchain records
- **Treatment Recommendations**: Get recommendations using onchain data
- **Affected Area Tracking**: Monitor areas with onchain records
- **Urgent Alerts**: Automatic alerts with onchain verification
- **Success Rate Tracking**: Calculate rates using onchain data
- **Historical Analysis**: Track patterns using onchain historical data

### 💧 Irrigation Management Onchain

- **Irrigation Methods**: Support for multiple methods with onchain records
- **Soil Moisture Monitoring**: Track moisture with onchain verification
- **Optimal Water Calculation**: Calculate amounts using onchain data
- **Irrigation Scheduling**: Generate schedules with onchain verification
- **Water Usage Tracking**: Track consumption with onchain records
- **Watering Recommendations**: Smart recommendations using onchain data
- **Efficiency Analysis**: Calculate efficiency using onchain metrics
- **Historical Records**: Track history with onchain verification

### 🌍 Soil Health Monitoring Onchain

- **Soil Testing**: Comprehensive tests with onchain verification
- **Soil Health Scoring**: Calculate scores using onchain data
- **Nutrient Assessment**: Assess nutrients with onchain records
- **pH Analysis**: Analyze pH with onchain verification
- **Nutrient Recommendations**: Generate recommendations using onchain data
- **Soil Type Analysis**: Analyze types with onchain verification
- **Trend Comparison**: Compare tests using onchain historical data
- **Soil Type Support**: Support for multiple types with onchain metadata

### 📍 Location & GPS Features Onchain

- **GPS Coordinates**: Track locations with onchain verification
- **Distance Calculation**: Calculate distances using onchain data
- **Location Services**: Get location for onchain plantation minting
- **Location Watching**: Watch changes with onchain updates
- **Bounding Box Calculation**: Calculate boxes using onchain data
- **Nearest Location Finder**: Find nearest plantations using onchain data
- **Radius Search**: Find locations using onchain geospatial queries
- **Coordinate Validation**: Validate coordinates for onchain storage

### 👷 Labor Management Onchain

- **Worker Profiles**: Manage profiles with onchain verification
- **Labor Records**: Track records with onchain timestamps
- **Role-Based Tracking**: Track by role using onchain data
- **Worker Availability**: Manage availability with onchain records
- **Labor Cost Analysis**: Calculate costs using onchain data
- **Worker Utilization**: Calculate utilization using onchain metrics
- **Labor Efficiency**: Compare efficiency using onchain data

### 🔧 Maintenance Management Onchain

- **Equipment Tracking**: Track equipment as onchain assets
- **Maintenance Scheduling**: Schedule maintenance with onchain records
- **Maintenance Status**: Track status using onchain data
- **Due Date Monitoring**: Identify due maintenance using onchain timestamps
- **Maintenance Cost Tracking**: Track costs with onchain verification
- **Equipment Uptime**: Calculate uptime using onchain data
- **Maintenance Summary**: Summary with onchain statistics

## 🔧 Tech Stack

### Frontend & UI
- **Next.js 16** (App Router) – React framework with SSR/SSG
- **Tailwind CSS v4** – Utility-first CSS with custom Cocoa Chain theme

### Web3 & Blockchain
- **Reown AppKit** (WalletConnect) – **Primary wallet connection layer** - Multi-wallet support via Reown
- **wagmi** – React hooks for Ethereum interactions (configured with Reown)
- **viem** – TypeScript Ethereum library
- **TanStack Query** – Web3 data caching and synchronization
- **Reown Wallet Utils** – Custom utilities for Reown wallet integration (`src/lib/reown-wallet-utils.ts`)
- **useReownWallet Hook** – React hook for Reown wallet connection (`src/hooks/use-reown-wallet.ts`)

### State Management
- **Zustand** – Lightweight state management for onchain data
- **Local storage** – Offline-first with onchain sync

### Data Visualization
- **Chart.js + react-chartjs-2** – Analytics visuals for onchain metrics
- **d3-geo + world-atlas + topojson-client** – Geospatial rendering for onchain plantations

### Utilities
- **date-fns** – Timeline formatting and scheduling
- **Local JSON + localStorage** – Prototype data persistence with onchain sync

## 📊 Onchain Analytics Overview

- **Forecast Panel**: Blends yield checkpoints, growth velocities, and cohort metrics from onchain data
- **Global Footprint Map**: Plots every onchain plantation with carbon-weighted markers
- **Wallet Performance**: Aggregates plantation counts, harvest conversion, and carbon footprint per wallet address
- **Collaboration Hub**: Centralizes collaborator insights with onchain role management
- **Activity Timeline**: Time-ordered onchain transactions, stage changes, and yield events

## 🔔 Onchain Alerts

- Task deadlines scanned every five minutes; onchain alerts fire when tasks are due
- Plantation stage changes and wallet activity (connect/disconnect, watchlist updates) publish onchain alerts instantly
- Delivery channels default to in-app + toast notifications, with Web3 push notification support
- Alert preferences and state live in `src/store/alerts.ts` with onchain verification

## 💾 Mock Data & Onchain Sync

- Source plantations live in `src/data/plantations.json` (synced to onchain)
- Finance, support, and loan samples seeded from `src/data/engagement.json` (onchain ready)
- State persisted to `localStorage` via Zustand with onchain sync capability
- Reset behavior: clearing browser storage reverts to seed data, then syncs onchain

## 🛠️ Utility Libraries

The codebase includes comprehensive utility libraries optimized for onchain operations:

### Core Utilities
- **`api-utils.ts`**: HTTP client with Web3 error handling
- **`integration.ts`**: Service layer combining API calls with onchain monitoring
- **`logger.ts`**: Structured logging with onchain event tracking
- **`constants.ts`**: Application-wide constants including chain IDs and contract addresses
- **`cn.ts`**: Tailwind CSS class name utility

### Web3 Utilities
- **`crypto-utils.ts`**: Cryptographic utilities for wallet operations (sha256, base64, random strings)
- **`network-utils.ts`**: Network utilities for Web3 connections
- **`storage-utils.ts`**: LocalStorage wrapper with onchain sync support

### Data Processing
- **`data-pipeline.ts`**: Functional data transformation pipeline for onchain data
- **`array-utils.ts`**: Array manipulation optimized for onchain data structures
- **`object-utils.ts`**: Object manipulation for onchain metadata
- **`transform-utils.ts`**: Data transformation utilities for blockchain data

### Form & Validation
- **`form-utils.ts`**: Form state management with Web3 wallet validation
- **`validation.ts`**: Validation functions including wallet address validation
- **`type-utils.ts`**: Type checking for onchain data types

### Date & Time
- **`date-utils.ts`**: Date manipulation with blockchain timestamp support
- **`time-utils.ts`**: Time formatting for onchain events
- **`timer-utils.ts`**: Timer utilities for onchain transaction timeouts

### Formatting & Display
- **`format-utils.ts`**: Number, currency, percentage, carbon offset formatting for onchain values
- **`number-utils.ts`**: Number manipulation for token amounts
- **`string-utils.ts`**: String manipulation for onchain addresses
- **`color-utils.ts`**: Color manipulation for Web3 themes

### Search & Filtering
- **`search-utils.ts`**: Search and ranking utilities for onchain plantations
- **`filter-utils.ts`**: Array filtering utilities for onchain data
- **`sort-utils.ts`**: Advanced sorting for onchain records

### Storage & Caching
- **`cache-utils.ts`**: Caching utilities for onchain data (Cache, LRUCache, memoize)
- **`queue-utils.ts`**: Queue implementations for onchain transaction queuing

### Performance & Monitoring
- **`performance-utils.ts`**: Performance monitoring for onchain operations
- **`error-handling.ts`**: Centralized error handling for Web3 errors

### File & Export
- **`file-utils.ts`**: File manipulation for IPFS uploads
- **`export-utils.ts`**: Export to CSV, JSON, Excel for onchain data
- **`data-export.ts`**: Data export functionality with onchain verification
- **`exporter.ts`**: Export utilities for blockchain data

### Statistics & Analytics
- **`statistics.ts`**: Statistical calculations for onchain metrics
- **`chart-utils.ts`**: Chart data preparation for onchain visualizations
- **`analytics-utils.ts`**: Advanced analytics utilities for onchain data

### Event Management
- **`event-utils.ts`**: Custom event emitter for onchain events

### Promise Utilities
- **`promise-utils.ts`**: Promise utilities for onchain transaction handling (delay, timeout, retry)

### Regex Utilities
- **`regex-utils.ts`**: Common regex patterns including wallet address validation

### State Management
- **`state-utils.ts`**: State management utilities for onchain state

### Theme & UI
- **`theme-utils.ts`**: Theme management with Web3 wallet theme sync

### Permissions
- **`permissions.ts`**: Role-based access control with onchain verification

### Plantation-Specific
- **`plantation-utils.ts`**: Plantation-specific utilities with onchain NFT support

### Weather & Market
- **`weather-utils.ts`**: Weather utilities with onchain data integration
- **`market-utils.ts`**: Market price utilities with DEX integration
- **`weather-forecast-utils.ts`**: Weather forecast utilities with onchain verification
- **`weather-history-utils.ts`**: Weather history utilities with onchain storage

### Inventory & Reports
- **`inventory-utils.ts`**: Inventory management utilities with onchain NFT tracking
- **`backup-utils.ts`**: Backup and restore utilities with onchain verification
- **`report-utils.ts`**: Report generation utilities for onchain data

### Quality & Certification
- **`quality-utils.ts`**: Quality assessment utilities with onchain verification
- **`certification-utils.ts`**: Certification management utilities with NFT support

### Harvest & Cost Management
- **`harvest-utils.ts`**: Harvest scheduling utilities with onchain records
- **`cost-utils.ts`**: Cost tracking utilities with onchain financial data

### Data Sync
- **`sync-utils.ts`**: Data synchronization utilities for onchain/offline sync

### Pest, Disease & Irrigation
- **`pest-disease-utils.ts`**: Pest and disease management utilities with onchain records
- **`irrigation-utils.ts`**: Irrigation management utilities with onchain verification
- **`soil-utils.ts`**: Soil health utilities with onchain data
- **`location-utils.ts`**: Location and GPS utilities for onchain geospatial data

### Labor & Maintenance
- **`labor-utils.ts`**: Labor management utilities with onchain payment records
- **`maintenance-utils.ts`**: Maintenance management utilities with onchain asset tracking

### Agricultural Onchain Utilities (Powered by Reown)
- **`onchain-land-registry-utils.ts`**: Land registry utilities with ownership verification and area tracking
- **`onchain-crop-insurance-claims-utils.ts`**: Crop insurance claims utilities with claim submission and approval
- **`onchain-supply-chain-tracking-utils.ts`**: Supply chain tracking utilities with stage advancement and filtering
- **`onchain-carbon-credits-trading-utils.ts`**: Carbon credits trading utilities with minting and value calculation
- **`onchain-seed-certification-utils.ts`**: Seed certification utilities with validity checking and expiry monitoring
- **`onchain-harvest-certification-utils.ts`**: Harvest certification utilities with quality grading and quantity tracking
- **`onchain-weather-derivatives-utils.ts`**: Weather derivatives utilities with payout calculation and expiration checking
- **`onchain-price-oracles-utils.ts`**: Price oracle utilities with price updates and history tracking
- **`onchain-cooperative-governance-utils.ts`**: Cooperative governance utilities with proposal creation and voting
- **`onchain-equipment-leasing-utils.ts`**: Equipment leasing utilities with lease management and rent calculation
- **`onchain-labor-contracts-utils.ts`**: Labor contract utilities with wage calculation and active contract filtering
- **`onchain-fertilizer-tracking-utils.ts`**: Fertilizer tracking utilities with usage tracking and type filtering
- **`onchain-pest-control-records-utils.ts`**: Pest control records utilities with treatment tracking and type filtering
- **`onchain-water-rights-utils.ts`**: Water rights utilities with allocation management and usage recording
- **`onchain-land-lease-agreements-utils.ts`**: Land lease agreements utilities with lease cancellation and duration calculation
- **`onchain-crop-futures-utils.ts`**: Crop futures utilities with future filling and value calculation
- **`onchain-trade-finance-utils.ts`**: Trade finance utilities with finance approval and interest calculation
- **`onchain-quality-certification-utils.ts`**: Quality certification utilities with validity checking and grade filtering
- **`onchain-farm-subsidy-claims-utils.ts`**: Farm subsidy claims utilities with claim approval and total amount calculation
- **`onchain-agricultural-data-marketplace-utils.ts`**: Agricultural data marketplace utilities with listing cancellation and available listings filtering

### Additional Agricultural Onchain Utilities (Powered by Reown)
- **`onchain-crop-disease-monitoring-utils.ts`**: Crop disease monitoring utilities with disease treatment and filtering functions
- **`onchain-livestock-tracking-utils.ts`**: Livestock tracking utilities with status updates and filtering functions
- **`onchain-farm-equipment-rental-marketplace-utils.ts`**: Farm equipment rental marketplace utilities with rental management and cost calculation
- **`onchain-agricultural-loan-application-utils.ts`**: Agricultural loan application utilities with loan approval and repayment calculation
- **`onchain-crop-yield-prediction-model-utils.ts`**: Crop yield prediction model utilities with prediction filtering and average calculation
- **`onchain-soil-moisture-monitoring-utils.ts`**: Soil moisture monitoring utilities with moisture reading filtering and average calculation
- **`onchain-pesticide-application-records-utils.ts`**: Pesticide application records utilities with application filtering and total calculation
- **`onchain-harvest-quality-assurance-utils.ts`**: Harvest quality assurance utilities with quality filtering and average calculation
- **`onchain-farm-worker-attendance-utils.ts`**: Farm worker attendance utilities with check-out recording and attendance calculation
- **`onchain-seed-inventory-management-utils.ts`**: Seed inventory management utilities with quantity updates and filtering functions
- **`onchain-water-quality-testing-utils.ts`**: Water quality testing utilities with quality filtering and average calculation
- **`onchain-energy-consumption-tracking-utils.ts`**: Energy consumption tracking utilities with consumption filtering and total calculation
- **`onchain-waste-management-utils.ts`**: Waste management utilities with waste filtering and total calculation
- **`onchain-organic-certification-application-utils.ts`**: Organic certification application utilities with certification approval and filtering
- **`onchain-fair-trade-certification-application-utils.ts`**: Fair trade certification application utilities with certification approval and filtering
- **`onchain-supply-chain-verification-utils.ts`**: Supply chain verification utilities with verification filtering functions
- **`onchain-farm-audit-management-utils.ts`**: Farm audit management utilities with audit completion and filtering functions
- **`onchain-agricultural-insurance-application-utils.ts`**: Agricultural insurance application utilities with insurance approval and filtering
- **`onchain-crop-rotation-history-utils.ts`**: Crop rotation history utilities with rotation history filtering functions
- **`onchain-weather-data-collection-utils.ts`**: Weather data collection utilities with weather data filtering and average calculation

### Latest Onchain Utilities (Powered by Reown)
- **`onchain-agricultural-marketplace-system-utils.ts`**: Agricultural marketplace system utilities with listing management and purchase functions
- **`onchain-farm-asset-tokenization-utils.ts`**: Farm asset tokenization utilities with token redemption and value calculation
- **`onchain-agricultural-research-data-sharing-utils.ts`**: Agricultural research data sharing utilities with data filtering and integrity verification
- **`onchain-crop-insurance-premium-calculator-utils.ts`**: Crop insurance premium calculator utilities with premium calculation and filtering
- **`onchain-farm-equipment-marketplace-utils.ts`**: Farm equipment marketplace utilities with equipment listing and purchase functions
- **`onchain-agricultural-commodity-exchange-utils.ts`**: Agricultural commodity exchange utilities with order creation and filling
- **`onchain-farm-labor-marketplace-utils.ts`**: Farm labor marketplace utilities with job posting and wage calculation
- **`onchain-agricultural-supply-chain-finance-utils.ts`**: Agricultural supply chain finance utilities with finance approval and repayment calculation
- **`onchain-farm-land-valuation-system-utils.ts`**: Farm land valuation system utilities with valuation filtering and average calculation
- **`onchain-agricultural-impact-measurement-utils.ts`**: Agricultural impact measurement utilities with impact filtering and total calculation
- **`onchain-crop-disease-prevention-system-utils.ts`**: Crop disease prevention system utilities with prevention completion and filtering
- **`onchain-farm-sustainability-scoring-utils.ts`**: Farm sustainability scoring utilities with score filtering and average calculation
- **`onchain-agricultural-credit-scoring-utils.ts`**: Agricultural credit scoring utilities with credit score filtering and average calculation
- **`onchain-farm-risk-assessment-system-utils.ts`**: Farm risk assessment system utilities with risk assessment filtering functions
- **`onchain-agricultural-commodity-pricing-utils.ts`**: Agricultural commodity pricing utilities with price query and history functions
- **`onchain-farm-equipment-maintenance-records-utils.ts`**: Farm equipment maintenance records utilities with maintenance filtering and cost calculation
- **`onchain-agricultural-export-documentation-utils.ts`**: Agricultural export documentation utilities with document approval and filtering
- **`onchain-farm-investment-tracking-utils.ts`**: Farm investment tracking utilities with investment filtering and return calculation
- **`onchain-agricultural-weather-risk-insurance-utils.ts`**: Agricultural weather risk insurance utilities with insurance claim and expiry check
- **`onchain-farm-production-analytics-utils.ts`**: Farm production analytics utilities with analytics filtering and average calculation
- **`onchain-agricultural-payment-terms-management-utils.ts`**: Agricultural payment terms management utilities with payment term status and calculation
- **`onchain-farm-labor-productivity-tracking-utils.ts`**: Farm labor productivity tracking utilities with productivity calculation and filtering
- **`onchain-farm-inventory-valuation-utils.ts`**: Farm inventory valuation utilities with inventory value calculation
- **`onchain-farm-asset-depreciation-tracking-utils.ts`**: Farm asset depreciation tracking utilities with depreciation calculation functions
- **`onchain-farm-performance-benchmarking-utils.ts`**: Farm performance benchmarking utilities with performance calculation and target check

### Risk & Performance
- **`risk-utils.ts`**: Risk management utilities with onchain scoring
- **`benchmark-utils.ts`**: Performance benchmarking utilities with onchain metrics

### Automation & Optimization
- **`automation-utils.ts`**: Automation rules utilities with smart contract integration
- **`carbon-calculator.ts`**: Carbon offset calculation utilities with NFT support
- **`supply-chain-utils.ts`**: Supply chain management utilities with onchain tracking
- **`yield-optimizer.ts`**: Yield optimization utilities with onchain data

### Documents & Compliance
- **`document-utils.ts`**: Document management utilities with IPFS integration
- **`compliance-utils.ts`**: Compliance tracking utilities with onchain verification
- **`training-utils.ts`**: Training resources utilities with onchain certification NFTs
- **`marketplace-utils.ts`**: Marketplace utilities with NFT listing support

### AI & Planning
- **`ai-assistant-utils.ts`**: AI assistant utilities with onchain data integration
- **`budget-utils.ts`**: Budget planning utilities with onchain financial records
- **`loan-utils.ts`**: Loan management utilities with DeFi integration
- **`seasonal-utils.ts`**: Seasonal planning utilities with onchain timestamps
- **`farmer-network-utils.ts`**: Farmer network utilities with onchain reputation
- **`expense-utils.ts`**: Expense tracking utilities with onchain records

### Mobile & Voice
- **`mobile-utils.ts`**: Mobile utilities for Web3 wallet integration
- **`voice-utils.ts`**: Voice recording utilities with onchain storage
- **`barcode-utils.ts`**: Barcode scanning utilities for onchain asset access

### Testing
- **`testing-utils.ts`**: Testing utilities including Web3 mocking

## 🎨 UI Components

### Form Components
- **`Input`**: Text input with Web3 address validation
- **`Select`**: Dropdown select with onchain options
- **`Textarea`**: Multi-line text input for onchain notes
- **`Button`**: Button with Web3 transaction states
- **`Checkbox`**: Checkbox input with onchain verification
- **`Radio`**: Radio button input
- **`Switch`**: Toggle switch component
- **`Slider`**: Range slider input
- **`Dropdown`**: Custom dropdown with onchain search

### Display Components
- **`Card`**: Card container with onchain transaction status
- **`Badge`**: Badge component with Web3 status variants
- **`Tag`**: Tag component for onchain labels
- **`Chip`**: Removable chip component
- **`Avatar`**: User avatar with ENS support
- **`Progress`**: Progress bar for onchain transaction progress
- **`ProgressIndicator`**: Animated progress indicator
- **`LoadingSpinner`**: Loading spinner for Web3 operations
- **`SkeletonLoader`**: Skeleton loading state
- **`EmptyState`**: Empty state message

### Navigation Components
- **`Tabs`**: Tab navigation component
- **`Breadcrumb`**: Breadcrumb navigation
- **`Pagination`**: Pagination controls for onchain data
- **`Stepper`**: Step indicator for onchain workflows
- **`Accordion`**: Collapsible accordion sections
- **`Timeline`**: Timeline component for onchain events

### Feedback Components
- **`Alert`**: Alert message component with Web3 error handling
- **`Tooltip`**: Tooltip component
- **`ConfirmationDialog`**: Confirmation modal for onchain transactions
- **`Rating`**: Star rating component

### Layout Components
- **`Divider`**: Divider component
- **`ExpandableSection`**: Collapsible content section
- **`CopyButton`**: Copy to clipboard button for wallet addresses

### Specialized Components
- **`PlantationCard`**: Plantation display card with NFT metadata
- **`PlantationInsights`**: Plantation insights with onchain data
- **`QuickActions`**: Quick action buttons for onchain operations
- **`StatisticsSummary`**: Statistics summary with onchain metrics
- **`DashboardMetrics`**: Dashboard metrics with Web3 data
- **`CohortChart`**: Cohort analysis chart for onchain plantations
- **`AnimatedCounter`**: Animated number counter for onchain values
- **`WeatherWidget`**: Weather display widget with onchain verification
- **`MarketPriceCard`**: Market price display with DEX integration
- **`InventoryStatus`**: Inventory health dashboard with NFT tracking
- **`BackupManager`**: Backup and restore interface with onchain sync
- **`NotificationCenter`**: Centralized notification hub for onchain events
- **`AdvancedSearch`**: Multi-field search with onchain operators
- **`CertificationBadge`**: Visual certification badge with NFT status
- **`QualityIndicator`**: Quality grade indicator with onchain verification
- **`CostBreakdown`**: Visual cost breakdown with onchain data
- **`PestDiseaseAlert`**: Alert component with onchain records
- **`SoilHealthCard`**: Soil health dashboard with onchain data
- **`RiskCard`**: Risk assessment card with onchain scoring
- **`PerformanceDashboard`**: Performance dashboard with onchain KPIs
- **`CarbonProjections`**: Carbon offset projections with NFT support
- **`YieldOptimizerTips`**: Yield optimization tips with onchain data
- **`ComplianceTracker`**: Compliance tracking dashboard with onchain verification
- **`WeatherForecast`**: 7-day weather forecast with onchain data
- **`AIAssistant`**: Interactive AI assistant with onchain data integration
- **`BudgetPlanner`**: Budget planning dashboard with onchain records
- **`LoanCalculator`**: Loan calculator with DeFi integration
- **`SeasonalPlanner`**: Seasonal planning with onchain timestamps

## 🪝 Custom React Hooks

### Form Management
- **`useForm`**: Complete form state management with Web3 validation
- **`useFilters`**: Dynamic filtering system for onchain data

### Data Management
- **`usePagination`**: Pagination logic for onchain records

### Advanced Onchain Features (Powered by Reown)
- **`useOnchainAuction`**: Auction system for NFT trading with Reown wallet integration
- **`useOnchainBounty`**: Bounty system for task rewards with Reown wallet integration
- **`useOnchainCrowdfunding`**: Crowdfunding system for project funding with Reown wallet integration
- **`useOnchainDerivatives`**: Derivatives trading for commodities with Reown wallet integration
- **`useOnchainFractionalization`**: NFT fractionalization for shared ownership with Reown wallet integration
- **`useOnchainGovernance`**: Governance system for proposals and voting with Reown wallet integration
- **`useOnchainIdentity`**: Decentralized identity management with Reown wallet integration
- **`useOnchainLending`**: Lending protocol with collateral management and Reown wallet integration
- **`useOnchainLiquidation`**: Liquidation system for undercollateralized positions with Reown wallet integration
- **`useOnchainMatching`**: Order matching system for token trading with Reown wallet integration
- **`useOnchainMerkle`**: Merkle tree proof generation and verification with Reown wallet integration
- **`useOnchainNFTMarketplace`**: NFT marketplace for listing and trading with Reown wallet integration
- **`useOnchainOptions`**: Options trading for call/put options with Reown wallet integration
- **`useOnchainPaymentStream`**: Payment streaming for recurring payments with Reown wallet integration
- **`useOnchainPriceFeed`**: Price feed oracle for real-time price updates with Reown wallet integration
- **`useOnchainRental`**: Asset rental system for NFT rentals with Reown wallet integration
- **`useOnchainSettlement`**: Settlement system for peer-to-peer transactions with Reown wallet integration
- **`useOnchainSwap`**: Token swapping with slippage protection and Reown wallet integration
- **`useOnchainTokenization`**: Asset tokenization for real-world assets with Reown wallet integration
- **`useOnchainZKProof`**: Zero-knowledge proof generation and verification with Reown wallet integration
- **`useOnchainStakingPool`**: Staking pools for token staking with rewards (Reown wallet)
- **`useOnchainFlashLoan`**: Flash loan protocol for instant borrowing (Reown wallet)
- **`useOnchainLimitOrder`**: Limit order system for token trading (Reown wallet)
- **`useOnchainPortfolio`**: Portfolio management for multi-token tracking (Reown wallet)
- **`useOnchainAirdrop`**: Airdrop distribution system with Merkle proofs (Reown wallet)
- **`useOnchainBatch`**: Batch transaction execution for gas optimization (Reown wallet)
- **`useOnchainProxy`**: Proxy contract management for upgradable contracts (Reown wallet)
- **`useOnchainFactory`**: Factory contract for deploying multiple instances (Reown wallet)
- **`useOnchainEventLog`**: Event logging and filtering system (Reown wallet)
- **`useOnchainMetadata`**: Metadata management for NFTs and tokens (Reown wallet)
- **`useOnchainStorage`**: Storage optimization and slot management (Reown wallet)
- **`useOnchainPermissions`**: Permission management for contract functions (Reown wallet)
- **`useOnchainSnapshot`**: Snapshot voting with balance snapshots (Reown wallet)
- **`useOnchainVerification`**: Credential verification system (Reown wallet)
- **`useOnchainYieldAggregator`**: Yield aggregator for multiple strategies (Reown wallet)
- **`useOnchainStopLoss`**: Stop loss order system for trading (Reown wallet)
- **`useOnchainAnalytics`**: Analytics tracking for contracts (Reown wallet)
- **`useOnchainTimeWeighted`**: Time-weighted position tracking (Reown wallet)
- **`useOnchainLiquidityMining`**: Liquidity mining with reward distribution (Reown wallet)
- **`useOnchainVestingSchedule`**: Vesting schedule management (Reown wallet)
- **`useOnchainBondingCurve`**: Bonding curve for token pricing (Reown wallet)
- **`useOnchainDAOTreasury`**: DAO treasury management (Reown wallet)
- **`useOnchainPriceOracle`**: Price oracle with confidence scores (Reown wallet)
- **`useOnchainCrossChain`**: Cross-chain bridge integration (Reown wallet)
- **`useOnchainAMMPool`**: AMM pool for automated market making (Reown wallet)
- **`useOnchainVotingPower`**: Voting power delegation system (Reown wallet)
- **`useOnchainRewardDistribution`**: Reward distribution system (Reown wallet)
- **`useOnchainGasOptimization`**: Gas optimization utilities (Reown wallet)
- **`useOnchainMultisigWallet`**: Multi-signature wallet management (Reown wallet)
- **`useOnchainAllowlist`**: Allowlist management with Merkle trees (Reown wallet)
- **`useOnchainWhitelist`**: Whitelist management for address access control (Reown wallet)
- **`useOnchainBlacklist`**: Blacklist management for address restrictions (Reown wallet)
- **`useOnchainTokenFreeze`**: Token freeze/unfreeze functionality (Reown wallet)
- **`useOnchainPause`**: Contract pause/unpause mechanism (Reown wallet)
- **`useOnchainEmergencyWithdraw`**: Emergency withdrawal system (Reown wallet)
- **`useOnchainUpgrade`**: Contract upgrade management (Reown wallet)
- **`useOnchainRoleBasedAccess`**: Role-based access control system (Reown wallet)
- **`useOnchainTimelock`**: Timelock for delayed execution (Reown wallet)
- **`useOnchainCircuitBreaker`**: Circuit breaker for transaction limits (Reown wallet)
- **`useOnchainRateLimiter`**: Rate limiting for address actions (Reown wallet)
- **`useOnchainKeeper`**: Automated keeper for periodic execution (Reown wallet)
- **`useOnchainReentrancyGuard`**: Reentrancy protection guard (Reown wallet)
- **`useOnchainSignatureVerification`**: Signature verification system (Reown wallet)
- **`useOnchainNonceManager`**: Nonce management for transactions (Reown wallet)

### Agricultural Onchain Hooks (Powered by Reown)
- **`useOnchainLandRegistry`**: Land registry system for registering and transferring land parcels with Reown wallet integration
- **`useOnchainCropInsuranceClaims`**: Crop insurance claims system for submitting and approving claims with Reown wallet integration
- **`useOnchainSupplyChainTracking`**: Supply chain tracking for monitoring items through harvest, processing, storage, transport, and market stages with Reown wallet integration
- **`useOnchainCarbonCreditsTrading`**: Carbon credits trading system for minting and trading carbon credits with Reown wallet integration
- **`useOnchainSeedCertification`**: Seed certification system for certifying seeds with validity periods and Reown wallet integration
- **`useOnchainHarvestCertification`**: Harvest certification system for certifying harvests with quality grades and Reown wallet integration
- **`useOnchainWeatherDerivatives`**: Weather derivatives system for creating and trading weather-based financial instruments with Reown wallet integration
- **`useOnchainPriceOracles`**: Price oracle system for updating and querying commodity prices with Reown wallet integration
- **`useOnchainCooperativeGovernance`**: Cooperative governance system for creating proposals and voting with Reown wallet integration
- **`useOnchainEquipmentLeasing`**: Equipment leasing system for creating and managing equipment leases with Reown wallet integration
- **`useOnchainLaborContracts`**: Labor contract system for creating and managing labor contracts with Reown wallet integration
- **`useOnchainFertilizerTracking`**: Fertilizer tracking system for recording and tracking fertilizer applications with Reown wallet integration
- **`useOnchainPestControlRecords`**: Pest control records system for recording and tracking pest control treatments with Reown wallet integration
- **`useOnchainWaterRights`**: Water rights management system for allocating and tracking water usage with Reown wallet integration
- **`useOnchainLandLeaseAgreements`**: Land lease agreements system for creating and managing land leases with Reown wallet integration
- **`useOnchainCropFutures`**: Crop futures trading system for creating and filling crop futures with Reown wallet integration
- **`useOnchainTradeFinance`**: Trade finance system for creating and approving trade finance requests with Reown wallet integration
- **`useOnchainQualityCertification`**: Quality certification system for certifying product quality with Reown wallet integration
- **`useOnchainFarmSubsidyClaims`**: Farm subsidy claims system for submitting and approving subsidy claims with Reown wallet integration
- **`useOnchainAgriculturalDataMarketplace`**: Agricultural data marketplace for listing and purchasing agricultural data with Reown wallet integration

### Latest Onchain Hooks (Powered by Reown)
- **`useOnchainAgriculturalMarketplaceSystem`**: Agricultural marketplace system for creating and managing product listings with Reown wallet integration
- **`useOnchainFarmAssetTokenization`**: Farm asset tokenization system for tokenizing and managing farm assets with Reown wallet integration
- **`useOnchainAgriculturalResearchDataSharing`**: Agricultural research data sharing system for sharing and managing research data with Reown wallet integration
- **`useOnchainCropInsurancePremiumCalculator`**: Crop insurance premium calculator for calculating and tracking insurance premiums with Reown wallet integration
- **`useOnchainFarmEquipmentMarketplace`**: Farm equipment marketplace for listing and purchasing equipment with Reown wallet integration
- **`useOnchainAgriculturalCommodityExchange`**: Agricultural commodity exchange for creating and filling commodity orders with Reown wallet integration
- **`useOnchainFarmLaborMarketplace`**: Farm labor marketplace for posting and filling labor jobs with Reown wallet integration
- **`useOnchainAgriculturalSupplyChainFinance`**: Agricultural supply chain finance for creating and managing finance requests with Reown wallet integration
- **`useOnchainFarmLandValuationSystem`**: Farm land valuation system for creating and tracking land valuations with Reown wallet integration
- **`useOnchainAgriculturalImpactMeasurement`**: Agricultural impact measurement system for recording and tracking impact metrics with Reown wallet integration
- **`useOnchainCropDiseasePreventionSystem`**: Crop disease prevention system for creating and managing prevention plans with Reown wallet integration
- **`useOnchainFarmSustainabilityScoring`**: Farm sustainability scoring system for recording and tracking sustainability scores with Reown wallet integration
- **`useOnchainAgriculturalCreditScoring`**: Agricultural credit scoring system for calculating and tracking credit scores with Reown wallet integration
- **`useOnchainFarmRiskAssessmentSystem`**: Farm risk assessment system for creating and managing risk assessments with Reown wallet integration
- **`useOnchainAgriculturalCommodityPricing`**: Agricultural commodity pricing system for updating and tracking commodity prices with Reown wallet integration
- **`useOnchainFarmEquipmentMaintenanceRecords`**: Farm equipment maintenance records system for recording and tracking maintenance with Reown wallet integration
- **`useOnchainAgriculturalExportDocumentation`**: Agricultural export documentation system for creating and managing export documents with Reown wallet integration
- **`useOnchainFarmInvestmentTracking`**: Farm investment tracking system for recording and tracking investments with Reown wallet integration
- **`useOnchainAgriculturalWeatherRiskInsurance`**: Agricultural weather risk insurance system for creating and managing weather insurance policies with Reown wallet integration
- **`useOnchainFarmProductionAnalytics`**: Farm production analytics system for recording and tracking production metrics with Reown wallet integration
- **`useOnchainAgriculturalPaymentTermsManagement`**: Agricultural payment terms management system for creating and managing payment terms with Reown wallet integration
- **`useOnchainFarmLaborProductivityTracking`**: Farm labor productivity tracking system for recording and tracking worker productivity with Reown wallet integration
- **`useOnchainFarmInventoryValuation`**: Farm inventory valuation system for recording and tracking inventory items with Reown wallet integration
- **`useOnchainFarmAssetDepreciationTracking`**: Farm asset depreciation tracking system for recording and tracking asset depreciation with Reown wallet integration
- **`useOnchainFarmPerformanceBenchmarking`**: Farm performance benchmarking system for creating and tracking performance benchmarks with Reown wallet integration

### General Hooks (from `hooks.ts`)
- **`usePrevious`**: Get previous value
- **`useDebounce`**: Debounce value changes for onchain queries
- **`useThrottle`**: Throttle value changes for Web3 calls
- **`useLocalStorage`**: LocalStorage hook with onchain sync
- **`useSessionStorage`**: SessionStorage hook
- **`useClickOutside`**: Detect clicks outside element
- **`useKeyPress`**: Listen for key presses
- **`useMediaQuery`**: React to media query changes
- **`useWindowSize`**: Track window dimensions
- **`useToggle`**: Toggle boolean state
- **`useCounter`**: Counter with increment/decrement
- **`useAsync`**: Handle async operations (Web3 transactions)
- **`useInterval`**: Set up intervals for onchain polling
- **`useTimeout`**: Set up timeouts
- **`useMount`**: Run on mount
- **`useUnmount`**: Run on unmount
- **`useUpdateEffect`**: Skip first render effect
- **`useIsMounted`**: Check if component is mounted
- **`useMemoizedCallback`**: Memoized callback hook

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/            # React components
│   ├── ui/               # Base UI components
│   └── ...              # Feature components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries (onchain optimized)
├── store/                # Zustand state management (with onchain sync)
├── data/                 # Mock data files (onchain ready)
└── types/                # TypeScript type definitions (Web3 types)
```

## 🚀 Scripts

- `npm run dev` – Start the local dev server with Web3 support
- `npm run build` – Build for production with onchain optimizations
- `npm run start` – Run the compiled dApp
- `npm run lint` – Run ESLint checks

## 🆕 20 New Onchain Features (Reown Wallet Integrated)

### 🗳️ Onchain Voting System
- **Token-Weighted Voting**: Vote on proposals with token-weighted voting power
- **Proposal Management**: Create and manage governance proposals onchain
- **Vote Tracking**: Track votes and outcomes in real-time
- **Quorum Calculation**: Automatic quorum threshold calculation
- **Reown Integration**: All voting operations require Reown wallet connection via `useAccount` and `useWriteContract`

### 🎁 Onchain Rewards System
- **Reward Distribution**: Distribute rewards based on onchain actions
- **Reward Tiers**: Multi-tier reward system with multipliers
- **Points System**: Earn points for various onchain activities
- **Claim Rewards**: Claim accumulated rewards via Reown wallet
- **Reward Analytics**: Track reward history and statistics

### 💧 Onchain Liquidity Pools
- **LP Token Management**: Add and remove liquidity from pools
- **Swap Calculations**: Calculate swap outputs with fee consideration
- **Pool APY**: Calculate annual percentage yield for liquidity pools
- **Liquidity Shares**: Track your share of pool liquidity
- **Reown Wallet**: All liquidity operations require wallet connection

### 🔮 Onchain Oracle Integration
- **Price Feeds**: Get real-time prices from onchain oracles
- **Price Validation**: Validate oracle prices for freshness
- **TWAP Calculation**: Calculate time-weighted average prices
- **Price Deviation**: Monitor price deviations across oracles
- **Oracle Verification**: Verify oracle data integrity

### 🛡️ Onchain Insurance
- **Policy Management**: Purchase and manage insurance policies
- **Claim Processing**: File and process insurance claims
- **Coverage Calculation**: Calculate coverage amounts and premiums
- **Policy Status**: Track policy status and expiration
- **Reown Wallet**: Insurance operations require wallet connection

### 🔒 Onchain Escrow
- **Secure Payments**: Create escrow contracts for secure payments
- **Escrow Status**: Track escrow status (active, expired, completed)
- **Release Management**: Release or refund escrow funds
- **Dispute Handling**: Handle escrow disputes
- **Reown Integration**: All escrow operations via Reown wallet

### ⚖️ Onchain Dispute Resolution
- **Dispute Filing**: File disputes for escrow transactions
- **Arbitration**: Select and manage arbitrators
- **Resolution Tracking**: Track dispute resolution status
- **Arbitration Fees**: Calculate and pay arbitration fees
- **Reown Wallet**: Dispute operations require wallet connection

### ⏰ Onchain Time-locked Transfers
- **Time-locked Assets**: Lock assets for specified time periods
- **Unlock Management**: Manage unlock times and release conditions
- **Status Tracking**: Track lock status (locked, unlocked, released)
- **Time Calculations**: Calculate time until unlock
- **Reown Integration**: Time-lock operations via Reown wallet

### 👥 Onchain Multi-signature Wallets
- **Multi-sig Support**: Create and manage multi-signature wallets
- **Transaction Approvals**: Approve transactions with multiple signatures
- **Threshold Management**: Set approval thresholds
- **Owner Management**: Manage wallet owners
- **Reown Wallet**: Multi-sig operations require wallet connection

### 📅 Onchain Vesting
- **Vesting Schedules**: Create token vesting schedules
- **Cliff Periods**: Set cliff periods for vesting
- **Release Management**: Release vested tokens
- **Progress Tracking**: Track vesting progress
- **Reown Integration**: Vesting operations via Reown wallet

### 🌾 Onchain Yield Staking
- **Staking Pools**: Stake tokens in yield staking pools
- **Reward Calculation**: Calculate staking rewards
- **APR Calculation**: Calculate annual percentage rate
- **ROI Tracking**: Track return on investment
- **Reown Wallet**: Yield staking requires wallet connection

### 🎰 Onchain Lottery System
- **Lottery Creation**: Create lotteries with customizable parameters
- **Ticket Purchase**: Purchase lottery tickets
- **Winner Selection**: Draw winners from ticket pool
- **Odds Calculation**: Calculate winning odds
- **Reown Integration**: Lottery operations via Reown wallet

### 🤝 Onchain Referral Program
- **Referral Links**: Generate referral links
- **Multi-level Rewards**: Multi-level referral reward system
- **Referral Tracking**: Track referrals and rewards
- **Statistics**: View referral statistics
- **Reown Wallet**: Referral operations require wallet connection

### 🏆 Onchain Milestone Rewards
- **Milestone Creation**: Create milestones with targets
- **Progress Tracking**: Track progress toward milestones
- **Reward Distribution**: Distribute rewards when milestones are reached
- **Completion Tracking**: Track milestone completion
- **Reown Integration**: Milestone operations via Reown wallet

### 💎 Onchain Collateralization
- **Collateral Management**: Deposit and manage collateral
- **Loan Calculation**: Calculate maximum loan amounts
- **Liquidation Threshold**: Monitor liquidation thresholds
- **Collateral Ratio**: Calculate collateral ratios
- **Reown Wallet**: Collateral operations require wallet connection

### 🔄 Onchain AMM Integration
- **Automated Market Maker**: Integrate with AMM protocols
- **Swap Calculations**: Calculate swap amounts and slippage
- **Liquidity Management**: Add and remove liquidity
- **Price Impact**: Calculate price impact of swaps
- **Reown Integration**: AMM operations via Reown wallet

### 📊 Onchain Prediction Markets
- **Market Creation**: Create prediction markets
- **Prediction Placement**: Place predictions on market outcomes
- **Odds Calculation**: Calculate prediction odds
- **Payout Calculation**: Calculate payouts for winners
- **Reown Wallet**: Prediction market operations require wallet connection

### 🧩 Onchain Fractional Ownership
- **Fractional NFTs**: Create fractional ownership of NFTs
- **Share Management**: Buy and sell fractional shares
- **Ownership Tracking**: Track ownership percentages
- **Redeem NFTs**: Redeem NFTs with sufficient shares
- **Reown Integration**: Fractional ownership via Reown wallet

### 👑 Onchain Royalty Distribution
- **Royalty Setting**: Set royalty percentages for NFTs
- **Royalty Calculation**: Calculate royalty amounts
- **Distribution**: Distribute royalties to recipients
- **Royalty Tracking**: Track royalty payments
- **Reown Wallet**: Royalty operations require wallet connection

### 📝 Onchain Audit Trail
- **Event Logging**: Log all onchain events
- **Audit Logs**: Maintain comprehensive audit logs
- **Event Filtering**: Filter audit logs by various criteria
- **Statistics**: Calculate audit statistics
- **Verification**: Verify audit log integrity
- **Reown Integration**: Audit logging via Reown wallet

### 📊 Onchain Options Trading
- **Options Contracts**: Create call and put options
- **Premium Calculation**: Calculate option premiums using Black-Scholes
- **In-the-Money Detection**: Detect if options are in the money
- **Expiry Management**: Manage option expiration
- **Reown Integration**: Options trading via Reown wallet

### 🏠 Onchain Rental System
- **Asset Rental**: Rent NFTs and assets onchain
- **Rental Cost Calculation**: Calculate rental costs per day
- **Rental Status Tracking**: Track active rentals
- **Duration Management**: Manage rental durations
- **Reown Wallet**: Rental operations require wallet connection

### 🔨 Onchain Auction System
- **Auction Creation**: Create auctions for NFTs and assets
- **Bid Management**: Place and manage bids
- **Auction End Detection**: Detect when auctions end
- **Reserve Price Management**: Set and manage reserve prices
- **Reown Integration**: Auction operations via Reown wallet

### 💸 Onchain Payment Streaming
- **Payment Streams**: Create streaming payments
- **Stream Calculation**: Calculate streamed amounts over time
- **Stream Cancellation**: Cancel payment streams
- **Subscription Management**: Manage recurring payments
- **Reown Wallet**: Payment stream operations require wallet connection

### 🪙 Onchain Asset Tokenization
- **Asset Tokenization**: Tokenize real-world assets
- **Token Value Calculation**: Calculate token values
- **Ownership Percentage**: Calculate ownership percentages
- **Token Supply Management**: Manage token supplies
- **Reown Integration**: Tokenization via Reown wallet

### 🤝 Onchain Settlement System
- **Settlement Creation**: Create peer-to-peer settlements
- **Settlement Fees**: Calculate settlement fees
- **Settlement Status**: Track settlement status
- **Dispute Handling**: Handle settlement disputes
- **Reown Wallet**: Settlement operations require wallet connection

### 🌳 Onchain Merkle Trees
- **Merkle Proof Generation**: Generate Merkle proofs
- **Proof Verification**: Verify Merkle proofs
- **Merkle Root Generation**: Generate Merkle roots
- **Airdrop Claims**: Claim airdrops with Merkle proofs
- **Reown Integration**: Merkle operations via Reown wallet

### 🔐 Onchain Zero-Knowledge Proofs
- **ZK Proof Generation**: Generate zero-knowledge proofs
- **Proof Verification**: Verify ZK proofs onchain
- **Privacy Preservation**: Preserve privacy with ZK proofs
- **Public Input Management**: Manage public inputs
- **Reown Wallet**: ZK proof operations require wallet connection

### 🆔 Onchain Identity Management
- **Identity Creation**: Create decentralized identities
- **Credential Management**: Manage identity credentials
- **Reputation Scoring**: Calculate reputation scores
- **Identity Verification**: Verify identities onchain
- **Reown Integration**: Identity management via Reown wallet

### 📋 Onchain Order Matching
- **Order Creation**: Create trading orders
- **Order Matching**: Match compatible orders
- **Match Price Calculation**: Calculate match prices
- **Order Fulfillment**: Fulfill matched orders
- **Reown Wallet**: Order matching requires wallet connection

### 💧 Onchain Liquidation System
- **Liquidation Detection**: Detect liquidatable positions
- **Liquidation Bonus**: Calculate liquidation bonuses
- **Collateral Ratio Monitoring**: Monitor collateral ratios
- **Liquidator Rewards**: Calculate liquidator rewards
- **Reown Integration**: Liquidation operations via Reown wallet

### 🌾 Onchain Farm Yield Prediction
- **Yield Prediction**: Predict harvest yields with confidence scores
- **Actual Yield Recording**: Record actual yields for accuracy tracking
- **Prediction Accuracy**: Calculate prediction accuracy metrics
- **Reown Wallet**: All yield prediction operations require wallet connection

### 🌦️ Onchain Farm Weather Insurance
- **Policy Purchase**: Purchase weather insurance policies for plantations
- **Claim Filing**: File insurance claims for weather-related damages
- **Coverage Management**: Manage insurance coverage amounts and premiums
- **Reown Integration**: Weather insurance operations via Reown wallet

### 🌱 Onchain Farm Soil Carbon Sequestration
- **Sequestration Recording**: Record carbon sequestration in soil
- **Verification**: Verify carbon sequestration claims onchain
- **Method Tracking**: Track different sequestration methods
- **Reown Wallet**: Carbon sequestration operations require wallet connection

### 💧 Onchain Farm Water Rights Trading
- **Water Rights Trading**: Create and execute water rights trades
- **Trade Management**: Manage water rights transfers between farmers
- **Price Calculation**: Calculate water rights trading prices
- **Reown Integration**: Water rights trading via Reown wallet

### 🦋 Onchain Farm Biodiversity Credits
- **Credit Minting**: Mint biodiversity credits based on species diversity
- **Credit Trading**: Trade biodiversity credits onchain
- **Habitat Tracking**: Track habitat areas and species counts
- **Reown Wallet**: Biodiversity credit operations require wallet connection

### 🌍 Onchain Farm Carbon Offset Marketplace
- **Offset Listing**: List carbon offsets for sale
- **Offset Purchase**: Purchase carbon offsets from farmers
- **Price Management**: Set and manage carbon offset prices per ton
- **Reown Integration**: Carbon offset marketplace operations via Reown wallet

### ⚡ Onchain Farm Renewable Energy Trading
- **Energy Listing**: List renewable energy for sale
- **Energy Purchase**: Purchase renewable energy from farms
- **Energy Types**: Support solar, wind, and biomass energy trading
- **Reown Wallet**: Renewable energy trading requires wallet connection

### 📊 Onchain Farm Data Monetization
- **Data Listing**: List farm data for monetization
- **Data Access Purchase**: Purchase access to farm data
- **Data Hash Verification**: Verify data authenticity via hashes
- **Reown Integration**: Data monetization operations via Reown wallet

### 🛡️ Onchain Farm Insurance Pool
- **Pool Creation**: Create insurance pools for risk sharing
- **Pool Membership**: Join insurance pools with contributions
- **Coverage Types**: Support various insurance coverage types
- **Reown Wallet**: Insurance pool operations require wallet connection

### 🗳️ Onchain Farm Cooperative Voting
- **Proposal Creation**: Create governance proposals for cooperatives
- **Voting**: Cast votes on proposals with wallet signatures
- **Vote Counting**: Track yes/no votes onchain
- **Reown Integration**: Cooperative voting operations via Reown wallet

### 🏢 Onchain Farm Asset Leasing
- **Lease Creation**: Create asset lease agreements
- **Lease Execution**: Execute lease agreements onchain
- **Rent Management**: Manage monthly rental payments
- **Reown Wallet**: Asset leasing operations require wallet connection

### 💰 Onchain Farm Labor Payment Escrow
- **Escrow Creation**: Create escrow payments for labor
- **Payment Release**: Release escrow payments upon work completion
- **Work Description**: Track work descriptions for each escrow
- **Reown Integration**: Labor payment escrow operations via Reown wallet

### 🔄 Onchain Farm Supply Chain Payments
- **Payment Initiation**: Initiate supply chain payments
- **Payment Confirmation**: Confirm payment receipt onchain
- **Order Linking**: Link payments to specific orders
- **Reown Wallet**: Supply chain payment operations require wallet connection

### ✅ Onchain Farm Quality Assurance
- **Quality Checks**: Perform quality checks on farm products
- **Quality Certification**: Certify product quality onchain
- **Score Tracking**: Track quality scores and inspector notes
- **Reown Integration**: Quality assurance operations via Reown wallet

### 📦 Onchain Farm Export Certification
- **Certification Application**: Apply for export certifications
- **Certification Approval**: Approve export certifications onchain
- **Standards Compliance**: Track compliance with export standards
- **Reown Wallet**: Export certification operations require wallet connection

### 🗺️ Onchain Farm Land Registry
- **Land Registration**: Register land parcels onchain
- **Ownership Transfer**: Transfer land ownership onchain
- **Legal Documentation**: Store legal document hashes
- **Reown Integration**: Land registry operations via Reown wallet

### 🔧 Onchain Farm Equipment Sharing
- **Equipment Sharing**: Share equipment between farmers
- **Sharing Confirmation**: Confirm equipment sharing agreements
- **Fee Management**: Manage sharing fees and durations
- **Reown Wallet**: Equipment sharing operations require wallet connection

### 🌰 Onchain Farm Seed Exchange
- **Seed Listing**: List seeds for sale on the exchange
- **Seed Purchase**: Purchase seeds from other farmers
- **Certification Tracking**: Track seed certifications
- **Reown Integration**: Seed exchange operations via Reown wallet

### 📈 Onchain Farm Harvest Futures
- **Futures Creation**: Create futures contracts for harvest yields
- **Futures Settlement**: Settle futures contracts with actual yields
- **Price Locking**: Lock in harvest prices in advance
- **Reown Wallet**: Harvest futures operations require wallet connection

### 🌿 Onchain Farm Sustainability Rewards
- **Reward Claiming**: Claim sustainability rewards based on scores
- **Reward Distribution**: Distribute rewards onchain
- **Score Tracking**: Track sustainability scores per plantation
- **Reown Integration**: Sustainability reward operations via Reown wallet

### 🐛 Onchain Farm Pest Monitoring
- **Pest Sighting**: Record pest sightings with location and severity
- **Treatment Reporting**: Report pest treatment methods
- **Monitoring History**: Maintain pest monitoring history
- **Reown Wallet**: Pest monitoring operations require wallet connection

### 💧 Onchain Farm Irrigation Automation
- **Irrigation Scheduling**: Schedule automated irrigation
- **Irrigation Execution**: Execute irrigation schedules onchain
- **Water Management**: Track water amounts and frequency
- **Reown Integration**: Irrigation automation operations via Reown wallet

### 🌾 Onchain Farm Fertilizer Tracking
- **Application Recording**: Record fertilizer applications
- **Application Verification**: Verify fertilizer applications onchain
- **Type Tracking**: Track different fertilizer types and amounts
- **Reown Wallet**: Fertilizer tracking operations require wallet connection

### 🔄 Onchain Farm Crop Rotation Planning
- **Rotation Plan Creation**: Create crop rotation plans
- **Rotation Execution**: Execute crop rotations onchain
- **Multi-Crop Support**: Support multiple crops in rotation cycles
- **Reown Integration**: Crop rotation planning operations via Reown wallet

### 🐄 Onchain Farm Livestock Tracking
- **Livestock Recording**: Record livestock with birth dates and species
- **Health Status Updates**: Update livestock health status onchain
- **Animal Identification**: Track individual animals by ID
- **Reown Wallet**: Livestock tracking operations require wallet connection

### 🧪 Onchain Farm Soil Testing
- **Soil Test Recording**: Record soil tests with pH, nitrogen, phosphorus, and potassium levels
- **Test Verification**: Verify soil test results onchain
- **Nutrient Tracking**: Track soil nutrient levels over time
- **Reown Integration**: Soil testing operations via Reown wallet

### 🦠 Onchain Farm Crop Disease Tracking
- **Disease Recording**: Record crop diseases with type, severity, and affected area
- **Treatment Recording**: Record disease treatment methods
- **Disease History**: Maintain disease tracking history
- **Reown Wallet**: Disease tracking operations require wallet connection

### ⚠️ Onchain Farm Weather Alert System
- **Alert Creation**: Create weather alerts with type, severity, and forecast
- **Alert Acknowledgment**: Acknowledge weather alerts onchain
- **Severity Levels**: Track alert severity levels
- **Reown Integration**: Weather alert operations via Reown wallet

### 👥 Onchain Farm Labor Scheduling
- **Labor Scheduling**: Schedule labor tasks with workers, times, and wages
- **Task Completion**: Mark tasks as completed onchain
- **Wage Management**: Track wages per scheduled task
- **Reown Wallet**: Labor scheduling operations require wallet connection

### 🔧 Onchain Farm Equipment Maintenance Tracking
- **Maintenance Recording**: Record equipment maintenance with type and cost
- **Maintenance Completion**: Mark maintenance as completed
- **Next Maintenance Dates**: Track next scheduled maintenance dates
- **Reown Integration**: Equipment maintenance operations via Reown wallet

### 📦 Onchain Farm Inventory Management
- **Inventory Items**: Add inventory items with name, category, quantity, and price
- **Quantity Updates**: Update inventory quantities onchain
- **Category Management**: Organize inventory by categories
- **Reown Wallet**: Inventory management operations require wallet connection

### 👀 Onchain Farm Crop Monitoring
- **Crop Monitoring**: Monitor crops with growth stage, health score, and notes
- **Monitoring Updates**: Update crop monitoring records
- **Health Scoring**: Track crop health scores over time
- **Reown Integration**: Crop monitoring operations via Reown wallet

### 💵 Onchain Farm Subsidy Application
- **Application Submission**: Apply for subsidies with type, amount, and justification
- **Application Approval**: Approve subsidy applications onchain
- **Status Tracking**: Track application status (pending, approved, rejected)
- **Reown Wallet**: Subsidy application operations require wallet connection

### 📜 Onchain Farm Certification Management
- **Certification Creation**: Create certifications with type, standard, and expiry
- **Certification Renewal**: Renew certifications with new expiry dates
- **Standard Tracking**: Track certification standards
- **Reown Integration**: Certification management operations via Reown wallet

### 📊 Onchain Farm Financial Reporting
- **Report Generation**: Generate financial reports with revenue, expenses, and profit
- **Report Verification**: Verify financial reports onchain
- **Period Tracking**: Track financial reports by period
- **Reown Wallet**: Financial reporting operations require wallet connection

### 🛒 Onchain Farm Supply Ordering
- **Order Creation**: Create supply orders with supplier, items, quantity, and price
- **Delivery Confirmation**: Confirm order delivery onchain
- **Price Calculation**: Calculate total order prices automatically
- **Reown Integration**: Supply ordering operations via Reown wallet

### 🗺️ Onchain Farm Field Mapping
- **Field Mapping**: Map fields with coordinates, area, and soil type
- **Map Updates**: Update field map coordinates onchain
- **Soil Type Tracking**: Track soil types per field
- **Reown Wallet**: Field mapping operations require wallet connection

### 📋 Onchain Farm Resource Allocation
- **Resource Allocation**: Allocate resources to plantations with type and amount
- **Allocation Updates**: Update resource allocations onchain
- **Resource Types**: Support various resource types
- **Reown Integration**: Resource allocation operations via Reown wallet

### 🌾 Onchain Farm Crop Harvest Tracking
- **Harvest Recording**: Record harvests with crop type, yield, date, and quality
- **Harvest Verification**: Verify harvest records onchain
- **Quality Tracking**: Track harvest quality grades
- **Reown Wallet**: Harvest tracking operations require wallet connection

### 💧 Onchain Farm Water Quality Monitoring
- **Water Quality Testing**: Test water quality with pH, dissolved oxygen, turbidity, and contaminants
- **Test Verification**: Verify water quality tests onchain
- **Contaminant Tracking**: Track water contaminants
- **Reown Integration**: Water quality monitoring operations via Reown wallet

### ⚡ Onchain Farm Energy Consumption Tracking
- **Consumption Recording**: Record energy consumption with type, amount, cost, and period
- **Consumption Verification**: Verify energy consumption records onchain
- **Cost Tracking**: Track energy costs over time
- **Reown Wallet**: Energy consumption tracking operations require wallet connection

### 💧 Onchain Farm Irrigation Scheduling
- **Schedule Creation**: Create irrigation schedules with start time, duration, and water amount
- **Schedule Execution**: Execute irrigation schedules onchain
- **Water Management**: Track water amounts per schedule
- **Reown Integration**: Irrigation scheduling operations via Reown wallet

### 🧪 Onchain Farm Pesticide Tracking
- **Application Recording**: Record pesticide applications with type, amount, and date
- **Application Verification**: Verify pesticide applications onchain
- **Type Tracking**: Track different pesticide types
- **Reown Wallet**: Pesticide tracking operations require wallet connection

### 🌱 Onchain Farm Seed Certification
- **Seed Certification**: Certify seeds with type, standard, and expiry date
- **Certification Verification**: Verify seed certifications onchain
- **Standard Tracking**: Track certification standards
- **Reown Integration**: Seed certification operations via Reown wallet

### ⭐ Onchain Farm Harvest Quality Grading
- **Quality Grading**: Grade harvests with quality scores and inspector notes
- **Grade Verification**: Verify quality grades onchain
- **Score Tracking**: Track quality scores per harvest
- **Reown Wallet**: Quality grading operations require wallet connection

### 👥 Onchain Farm Labor Attendance
- **Attendance Recording**: Record labor attendance with check-in and check-out times
- **Attendance Verification**: Verify attendance records onchain
- **Time Tracking**: Track work hours per day
- **Reown Integration**: Labor attendance operations via Reown wallet

### 🔧 Onchain Farm Equipment Rental
- **Equipment Rental**: Rent equipment with start/end dates and daily rates
- **Equipment Return**: Return rented equipment onchain
- **Rate Management**: Track daily rental rates
- **Reown Wallet**: Equipment rental operations require wallet connection

### 📊 Onchain Farm Crop Yield Analysis
- **Yield Analysis**: Analyze crop yields comparing actual vs expected
- **Report Generation**: Generate yield analysis reports onchain
- **Factor Tracking**: Track factors affecting yield
- **Reown Integration**: Yield analysis operations via Reown wallet

### 🌿 Onchain Farm Organic Certification
- **Certification Application**: Apply for organic certification with cert body and standards
- **Certification Approval**: Approve organic certifications onchain
- **Standard Compliance**: Track compliance with organic standards
- **Reown Wallet**: Organic certification operations require wallet connection

### 🔗 Onchain Farm Supply Chain Traceability
- **Movement Recording**: Record product movements through supply chain
- **Chain Verification**: Verify complete supply chain onchain
- **Location Tracking**: Track product locations
- **Reown Integration**: Supply chain traceability operations via Reown wallet

### 🌤️ Onchain Farm Weather Data Collection
- **Data Recording**: Record weather data with temperature, humidity, rainfall, and wind speed
- **Data Verification**: Verify weather data records onchain
- **Historical Tracking**: Maintain weather data history
- **Reown Wallet**: Weather data collection operations require wallet connection

### 📦 Onchain Farm Crop Storage Management
- **Storage Recording**: Record crop storage with location, quantity, and conditions
- **Crop Retrieval**: Retrieve crops from storage onchain
- **Quantity Tracking**: Track remaining quantities in storage
- **Reown Integration**: Storage management operations via Reown wallet

### 💰 Onchain Farm Labor Wage Management
- **Wage Recording**: Record wages with amount, period, and payment date
- **Payment Processing**: Process wage payments onchain
- **Period Tracking**: Track wage periods
- **Reown Wallet**: Wage management operations require wallet connection

### 🛡️ Onchain Farm Crop Disease Prevention
- **Prevention Planning**: Create disease prevention plans with methods and schedules
- **Prevention Execution**: Execute prevention methods onchain
- **Method Tracking**: Track prevention methods used
- **Reown Integration**: Disease prevention operations via Reown wallet

### 🌾 Onchain Farm Soil Nutrient Management
- **Nutrient Planning**: Create nutrient management plans with NPK values
- **Nutrient Application**: Apply nutrients according to plan onchain
- **Nutrient Tracking**: Track nitrogen, phosphorus, and potassium levels
- **Reown Wallet**: Nutrient management operations require wallet connection

### 🔄 Onchain Farm Crop Rotation History
- **Rotation Recording**: Record crop rotations with previous and current crops
- **Rotation Verification**: Verify rotation history onchain
- **History Tracking**: Maintain complete rotation history
- **Reown Integration**: Rotation history operations via Reown wallet

### 🐄 Onchain Farm Livestock Health Monitoring
- **Health Check Recording**: Record livestock health checks with status, temperature, and weight
- **Status Updates**: Update health status onchain
- **Health Tracking**: Track health metrics over time
- **Reown Wallet**: Livestock health monitoring operations require wallet connection

### 💰 Onchain Farm Carbon Credit Trading
- **Credit Trading**: Create and execute carbon credit trades
- **Price Management**: Set prices per credit
- **Trade Execution**: Execute trades onchain
- **Reown Integration**: Carbon credit trading via Reown wallet

### 🌍 Onchain Farm Fair Trade Certification
- **Certification Application**: Apply for fair trade certification
- **Certification Approval**: Approve fair trade certifications onchain
- **Standard Compliance**: Track compliance with fair trade standards
- **Reown Wallet**: Fair trade certification operations require wallet connection

### 💵 Onchain Farm Agricultural Loan
- **Loan Application**: Apply for agricultural loans with amount, interest rate, and purpose
- **Loan Approval**: Approve loan applications onchain
- **Loan Management**: Track loan status and disbursement
- **Reown Integration**: Agricultural loan operations via Reown wallet

### 🛡️ Onchain Farm Crop Insurance Claims
- **Claim Filing**: File insurance claims with damage amount, type, and description
- **Claim Processing**: Process insurance claims onchain
- **Status Tracking**: Track claim status (pending, approved, rejected, paid)
- **Reown Wallet**: Insurance claim operations require wallet connection

### 📜 Onchain Farm Harvest Certification
- **Harvest Certification**: Certify harvests with type, standards, and date
- **Certification Verification**: Verify harvest certifications onchain
- **Standard Tracking**: Track certification standards per harvest
- **Reown Integration**: Harvest certification operations via Reown wallet

### 🌱 Onchain Farm Soil Conservation
- **Conservation Planning**: Create soil conservation plans with methods and targets
- **Progress Recording**: Record conservation progress onchain
- **Erosion Tracking**: Track erosion reduction targets
- **Reown Wallet**: Soil conservation operations require wallet connection

### 💧 Onchain Farm Water Conservation Tracking
- **Conservation Recording**: Record water conservation methods and savings
- **Conservation Verification**: Verify conservation records onchain
- **Savings Tracking**: Track water saved per method
- **Reown Integration**: Water conservation tracking via Reown wallet

### 🦋 Onchain Farm Biodiversity Monitoring
- **Biodiversity Recording**: Record biodiversity observations with species type and count
- **Record Verification**: Verify biodiversity records onchain
- **Habitat Tracking**: Track habitat areas and species counts
- **Reown Wallet**: Biodiversity monitoring operations require wallet connection

### 🦠 Onchain Farm Crop Disease Resistance
- **Resistance Recording**: Record crop disease resistance levels
- **Resistance Verification**: Verify resistance records onchain
- **Level Tracking**: Track resistance levels per crop variety
- **Reown Integration**: Disease resistance operations via Reown wallet

### 🔬 Onchain Farm Agricultural Research
- **Research Projects**: Create agricultural research projects with budget and area
- **Findings Recording**: Record research findings onchain
- **Project Management**: Track research projects and budgets
- **Reown Wallet**: Agricultural research operations require wallet connection

### 🌾 Onchain Farm Crop Variety Testing
- **Variety Testing**: Test crop varieties with yield and quality results
- **Test Verification**: Verify variety test results onchain
- **Result Tracking**: Track yield and quality scores per variety
- **Reown Integration**: Variety testing operations via Reown wallet

### 🐄 Onchain Farm Livestock Breeding
- **Breeding Recording**: Record livestock breeding with sire and dam IDs
- **Birth Recording**: Record births from breeding onchain
- **Breeding Tracking**: Track breeding dates and expected births
- **Reown Wallet**: Livestock breeding operations require wallet connection

### 🌸 Onchain Farm Crop Pollination Tracking
- **Pollination Recording**: Record crop pollination with pollinator type and success rate
- **Pollination Verification**: Verify pollination records onchain
- **Success Tracking**: Track pollination success rates
- **Reown Integration**: Pollination tracking operations via Reown wallet

### 📚 Onchain Farm Agricultural Extension
- **Service Requests**: Request agricultural extension services
- **Service Completion**: Complete extension services onchain
- **Outcome Tracking**: Track service outcomes and results
- **Reown Wallet**: Extension service operations require wallet connection

### 🌾 Onchain Farm Crop Maturity Tracking
- **Maturity Recording**: Record crop maturity stages and percentages
- **Maturity Updates**: Update maturity levels onchain
- **Harvest Prediction**: Track expected harvest dates based on maturity
- **Reown Integration**: Maturity tracking operations via Reown wallet

### 💉 Onchain Farm Livestock Vaccination
- **Vaccination Recording**: Record livestock vaccinations with type and dates
- **Vaccination Verification**: Verify vaccination records onchain
- **Schedule Tracking**: Track next vaccination due dates
- **Reown Wallet**: Vaccination operations require wallet connection

### 📈 Onchain Farm Crop Harvest Forecasting
- **Forecast Creation**: Create harvest forecasts with predicted yields and confidence
- **Forecast Updates**: Update forecasts onchain
- **Factor Tracking**: Track factors affecting forecasts
- **Reown Integration**: Harvest forecasting operations via Reown wallet

### 🤝 Onchain Farm Agricultural Cooperative
- **Cooperative Creation**: Create agricultural cooperatives with membership fees
- **Membership Management**: Join cooperatives onchain
- **Member Tracking**: Track cooperative membership counts
- **Reown Wallet**: Cooperative operations require wallet connection

### 📦 Onchain Farm Crop Storage Facility
- **Facility Creation**: Create storage facilities with capacity and location
- **Capacity Management**: Update facility capacity onchain
- **Usage Tracking**: Track current usage vs capacity
- **Reown Integration**: Storage facility operations via Reown wallet

### 🎓 Onchain Farm Labor Training
- **Training Recording**: Record labor training with type, date, and certification
- **Training Verification**: Verify training records onchain
- **Certification Tracking**: Track training certifications
- **Reown Wallet**: Labor training operations require wallet connection

### 🧬 Onchain Farm Crop Genetic Tracking
- **Genetic Recording**: Record crop genetics with markers and traits
- **Genetic Verification**: Verify genetic records onchain
- **Trait Tracking**: Track genetic traits per crop variety
- **Reown Integration**: Genetic tracking operations via Reown wallet

### 🌾 Onchain Farm Livestock Feed Management
- **Feeding Recording**: Record livestock feeding with type, amount, and date
- **Feeding Verification**: Verify feeding records onchain
- **Feed Type Tracking**: Track different feed types
- **Reown Wallet**: Feed management operations require wallet connection

### 📸 Onchain Farm Crop Photography
- **Photo Recording**: Record crop photos with hash, date, and description
- **Photo Verification**: Verify photo records onchain
- **Photo Hash Storage**: Store photo hashes for verification
- **Reown Integration**: Crop photography operations via Reown wallet

### 💧 Onchain Farm Water Source Management
- **Source Registration**: Register water sources with type, location, and capacity
- **Quality Updates**: Update water source quality onchain
- **Source Tracking**: Track water sources and their quality
- **Reown Wallet**: Water source management operations require wallet connection

### 🚚 Onchain Farm Crop Harvest Logistics
- **Logistics Creation**: Create harvest logistics with transport method and destination
- **Delivery Confirmation**: Confirm delivery onchain
- **Transport Tracking**: Track transport methods and destinations
- **Reown Integration**: Harvest logistics operations via Reown wallet

### 💧 Onchain Farm Soil Moisture Sensing
- **Moisture Recording**: Record soil moisture with level, depth, and location
- **Reading Verification**: Verify moisture readings onchain
- **Sensor Tracking**: Track sensor locations and readings
- **Reown Wallet**: Soil moisture sensing operations require wallet connection

### 💰 Onchain Farm Crop Insurance Premium
- **Premium Calculation**: Calculate insurance premiums based on coverage and risk
- **Premium Updates**: Update premium calculations onchain
- **Risk Factor Tracking**: Track risk factors affecting premiums
- **Reown Integration**: Premium calculation operations via Reown wallet

### 🥛 Onchain Farm Livestock Milking
- **Milking Recording**: Record milking with amount, time, and quality
- **Milking Verification**: Verify milking records onchain
- **Quality Tracking**: Track milk quality grades
- **Reown Wallet**: Milking operations require wallet connection

### 🌾 Onchain Farm Crop Fertilizer Schedule
- **Schedule Creation**: Create fertilizer schedules with type, date, and amount
- **Schedule Execution**: Execute fertilizer schedules onchain
- **Frequency Tracking**: Track application frequency
- **Reown Integration**: Fertilizer scheduling operations via Reown wallet

### 💊 Onchain Farm Livestock Medication
- **Medication Recording**: Record livestock medication with type, dosage, and veterinarian
- **Medication Verification**: Verify medication records onchain
- **Dosage Tracking**: Track medication dosages and administration dates
- **Reown Wallet**: Medication operations require wallet connection

### 🐛 Onchain Farm Crop Pest Control Schedule
- **Schedule Creation**: Create pest control schedules with treatment type and target pest
- **Treatment Execution**: Execute pest control treatments onchain
- **Pest Tracking**: Track target pests and treatment types
- **Reown Integration**: Pest control scheduling operations via Reown wallet

### ⚖️ Onchain Farm Livestock Weight Tracking
- **Weight Recording**: Record livestock weight with measurement method and date
- **Weight Verification**: Verify weight records onchain
- **Weight History**: Track weight changes over time
- **Reown Wallet**: Weight tracking operations require wallet connection

### 🌱 Onchain Farm Crop Seedling Management
- **Seedling Recording**: Record seedlings with count, planting date, and seed source
- **Count Updates**: Update seedling counts onchain
- **Source Tracking**: Track seed sources for seedlings
- **Reown Integration**: Seedling management operations via Reown wallet

### 💰 Onchain Farm Livestock Sales
- **Sale Recording**: Record livestock sales with buyer, price, and date
- **Sale Confirmation**: Confirm sales onchain
- **Price Tracking**: Track sale prices per animal
- **Reown Wallet**: Livestock sales operations require wallet connection

### 🚛 Onchain Farm Crop Harvest Transport
- **Transport Creation**: Create transport records with vehicle type, driver, and destination
- **Transport Completion**: Mark transport as completed onchain
- **Driver Tracking**: Track drivers and vehicle types
- **Reown Integration**: Harvest transport operations via Reown wallet

### 🌍 Onchain Farm Soil Compaction Monitoring
- **Compaction Recording**: Record soil compaction with level, depth, and location
- **Reading Verification**: Verify compaction readings onchain
- **Location Tracking**: Track compaction measurement locations
- **Reown Wallet**: Compaction monitoring operations require wallet connection

### 🏭 Onchain Farm Crop Harvest Processing
- **Processing Recording**: Record harvest processing with type, input/output amounts
- **Processing Verification**: Verify processing records onchain
- **Efficiency Tracking**: Track processing efficiency (input vs output)
- **Reown Integration**: Harvest processing operations via Reown wallet

### 🌿 Onchain Farm Livestock Grazing
- **Grazing Recording**: Record livestock grazing with pasture, date, and duration
- **Grazing Verification**: Verify grazing records onchain
- **Pasture Tracking**: Track pasture usage and grazing duration
- **Reown Wallet**: Grazing operations require wallet connection

### 📦 Onchain Farm Crop Harvest Packaging
- **Packaging Recording**: Record harvest packaging with type, quantity, and label
- **Packaging Verification**: Verify packaging records onchain
- **Label Tracking**: Track packaging labels and quantities
- **Reown Integration**: Harvest packaging operations via Reown wallet

### 📊 Onchain Farm Crop Harvest Distribution
- **Distribution Creation**: Create harvest distributions with recipients and amounts
- **Distribution Confirmation**: Confirm distributions on blockchain
- **Recipient Tracking**: Track distribution recipients and amounts
- **Web3 Integration**: Distribution operations via blockchain wallet

### 🐄 Onchain Farm Livestock Production Tracking
- **Production Recording**: Record livestock production with product type and quantity
- **Production Verification**: Verify production records on blockchain
- **Product Tracking**: Track different product types per animal
- **Web3 Wallet**: Production tracking operations require blockchain wallet connection

### 🔗 Onchain Farm Crop Harvest Traceability
- **Traceability Links**: Create traceability links between locations
- **Location Tracking**: Track harvest movement through supply chain
- **Transfer Verification**: Verify transfers on blockchain
- **Web3 System**: Traceability operations via blockchain wallet

### 🏥 Onchain Farm Livestock Health Records
- **Health Recording**: Record livestock health status with veterinarian information
- **Health Updates**: Update health records on blockchain
- **Status Tracking**: Track health status changes over time
- **Web3 Feature**: Health record operations require blockchain wallet

### 🔐 Onchain Farm Crop Harvest Authentication
- **Authentication Creation**: Create harvest authentication with methods and authenticators
- **Authentication Verification**: Verify authentication records on blockchain
- **Method Tracking**: Track different authentication methods
- **Web3 System**: Authentication operations via blockchain wallet

### 🧬 Onchain Farm Livestock Breeding Program
- **Program Creation**: Create breeding programs with objectives and parent animals
- **Program Updates**: Update breeding program objectives on blockchain
- **Objective Tracking**: Track breeding program objectives
- **Web3 Feature**: Breeding program operations require blockchain wallet

### ✅ Onchain Farm Crop Harvest Compliance
- **Compliance Recording**: Record compliance with standards and audit information
- **Compliance Verification**: Verify compliance records on blockchain
- **Standard Tracking**: Track compliance with different standards
- **Web3 System**: Compliance operations via blockchain wallet

### 💉 Onchain Farm Livestock Vaccination Schedule
- **Schedule Creation**: Create vaccination schedules with dates and veterinarians
- **Vaccination Recording**: Record completed vaccinations on blockchain
- **Schedule Tracking**: Track vaccination schedules per animal
- **Web3 Feature**: Vaccination operations require blockchain wallet

### 🌍 Onchain Farm Crop Harvest Origin Verification
- **Origin Verification**: Verify harvest origin with location and method
- **Verification Confirmation**: Confirm origin verifications on blockchain
- **Location Tracking**: Track verified origin locations
- **Web3 System**: Origin verification operations via blockchain wallet

### 🥗 Onchain Farm Livestock Feed Quality
- **Quality Testing**: Test feed quality with test types and results
- **Quality Approval**: Approve feed quality tests on blockchain
- **Test Tracking**: Track feed quality tests per batch
- **Web3 Feature**: Feed quality operations require blockchain wallet

### 🌱 Onchain Farm Crop Harvest Sustainability Metrics
- **Metrics Recording**: Record sustainability metrics including water usage and carbon footprint
- **Metrics Updates**: Update sustainability metrics on blockchain
- **Score Tracking**: Track biodiversity and sustainability scores
- **Web3 System**: Sustainability metrics operations via blockchain wallet

### 🐾 Onchain Farm Livestock Welfare Monitoring
- **Welfare Assessment**: Assess livestock welfare with scores and criteria
- **Score Updates**: Update welfare scores on blockchain
- **Criteria Tracking**: Track welfare assessment criteria
- **Web3 Feature**: Welfare monitoring operations require blockchain wallet

### 🔄 Onchain Farm Crop Harvest Chain of Custody
- **Custody Transfer**: Transfer custody between parties on blockchain
- **Transfer Verification**: Verify custody transfers
- **Party Tracking**: Track custody transfers between parties
- **Web3 System**: Chain of custody operations via blockchain wallet

### 📈 Onchain Farm Livestock Performance Tracking
- **Performance Recording**: Record livestock performance metrics
- **Performance Updates**: Update performance records on blockchain
- **Metric Tracking**: Track different performance metrics
- **Web3 Feature**: Performance tracking operations require blockchain wallet

### 📜 Onchain Farm Crop Harvest Batch Certification
- **Batch Certification**: Certify harvest batches with certifying bodies
- **Certification Verification**: Verify batch certifications on blockchain
- **Certificate Tracking**: Track certification numbers and types
- **Web3 System**: Batch certification operations via blockchain wallet

### 📋 Onchain Farm Livestock Inventory Management
- **Inventory Recording**: Record livestock inventory with location and status
- **Inventory Updates**: Update inventory records on blockchain
- **Status Tracking**: Track inventory status changes
- **Web3 Feature**: Inventory management operations require blockchain wallet

### ⛓️ Onchain Farm Crop Harvest Blockchain Verification
- **Blockchain Verification**: Verify harvests on blockchain with verification hashes
- **Verification Confirmation**: Confirm blockchain verifications
- **Hash Tracking**: Track verification hashes per harvest
- **Web3 System**: Blockchain verification operations via blockchain wallet

### 📝 Onchain Farm Livestock Blockchain Registry
- **Animal Registration**: Register livestock on blockchain registry
- **Registry Updates**: Update registry entries on blockchain
- **Registration Tracking**: Track registration types and data
- **Web3 Feature**: Blockchain registry operations require blockchain wallet

### 🔗 Onchain Farm Crop Harvest Supply Chain
- **Supply Chain Links**: Create supply chain links between suppliers and receivers
- **Link Verification**: Verify supply chain links on blockchain
- **Transfer Tracking**: Track product transfers through supply chain
- **Web3 Feature**: Supply chain operations require blockchain wallet

### 🐣 Onchain Farm Livestock Birth Records
- **Birth Recording**: Record livestock births with parent information
- **Birth Verification**: Verify birth records on blockchain
- **Weight Tracking**: Track birth weights and parent IDs
- **Web3 System**: Birth record operations via blockchain wallet

### 💰 Onchain Farm Crop Harvest Pricing
- **Price Setting**: Set harvest prices with currency and market information
- **Price Updates**: Update prices on blockchain
- **Market Tracking**: Track prices across different markets
- **Web3 Feature**: Pricing operations require blockchain wallet

### 🏥 Onchain Farm Livestock Medical History
- **Medical Records**: Record livestock medical history with conditions and treatments
- **Record Updates**: Update medical records on blockchain
- **Treatment Tracking**: Track treatments and veterinarians
- **Web3 System**: Medical history operations via blockchain wallet

### 🚚 Onchain Farm Crop Harvest Transport Logistics
- **Logistics Creation**: Create transport logistics with vehicle and driver information
- **Transport Completion**: Mark transport as completed on blockchain
- **Route Tracking**: Track origin and destination routes
- **Web3 Feature**: Transport logistics operations require blockchain wallet

### 🧬 Onchain Farm Livestock Pedigree Tracking
- **Pedigree Recording**: Record livestock pedigrees with lineage information
- **Pedigree Updates**: Update pedigree records on blockchain
- **Lineage Tracking**: Track generations and breeding lines
- **Web3 System**: Pedigree tracking operations via blockchain wallet

### ⭐ Onchain Farm Crop Harvest Quality Grading
- **Quality Grading**: Grade harvests with quality criteria and grader information
- **Grade Updates**: Update quality grades on blockchain
- **Criteria Tracking**: Track grading criteria per harvest
- **Web3 Feature**: Quality grading operations require blockchain wallet

### 🥗 Onchain Farm Livestock Feed Consumption
- **Consumption Recording**: Record feed consumption with type and amount
- **Consumption Updates**: Update consumption records on blockchain
- **Feed Tracking**: Track feed types and consumption amounts
- **Web3 System**: Feed consumption operations via blockchain wallet

### 🛒 Onchain Farm Crop Harvest Marketplace
- **Marketplace Listings**: Create marketplace listings with prices and descriptions
- **Purchase Processing**: Process purchases on blockchain
- **Listing Tracking**: Track marketplace listings and sales
- **Web3 Feature**: Marketplace operations require blockchain wallet

### 🔨 Onchain Farm Livestock Auction
- **Auction Creation**: Create livestock auctions with starting bids and dates
- **Bid Placement**: Place bids on auctions via blockchain
- **Auction Tracking**: Track auction bids and end dates
- **Web3 System**: Auction operations via blockchain wallet

### 📄 Onchain Farm Crop Harvest Contract Management
- **Contract Creation**: Create harvest contracts with buyers and sellers
- **Contract Execution**: Execute contracts on blockchain
- **Terms Tracking**: Track contract terms and parties
- **Web3 Feature**: Contract management operations require blockchain wallet

### 🛡️ Onchain Farm Livestock Insurance
- **Policy Creation**: Create insurance policies with coverage and premiums
- **Claim Filing**: File insurance claims on blockchain
- **Policy Tracking**: Track insurance policies and claims
- **Web3 System**: Insurance operations via blockchain wallet

### 📋 Onchain Farm Crop Harvest Export Documentation
- **Document Creation**: Create export documents with destination and authority information
- **Document Verification**: Verify export documents on blockchain
- **Document Tracking**: Track export document numbers and types
- **Web3 Feature**: Export documentation operations require blockchain wallet

### 🥛 Onchain Farm Livestock Milk Production
- **Production Recording**: Record milk production with quantity and quality grades
- **Production Updates**: Update production records on blockchain
- **Quality Tracking**: Track milk quality grades and production times
- **Web3 System**: Milk production operations via blockchain wallet

### 🌿 Onchain Farm Crop Harvest Sustainability Certification
- **Certification Creation**: Create sustainability certifications with standards
- **Certification Verification**: Verify certifications on blockchain
- **Standard Tracking**: Track certification standards and bodies
- **Web3 Feature**: Sustainability certification operations require blockchain wallet

### 🔄 Onchain Farm Livestock Reproduction Tracking
- **Reproduction Tracking**: Track livestock reproduction with mating and calving dates
- **Tracking Updates**: Update reproduction tracking on blockchain
- **Breeding Tracking**: Track breeding methods and parent animals
- **Web3 System**: Reproduction tracking operations via blockchain wallet

### 📊 Onchain Farm Crop Harvest Blockchain Ledger
- **Ledger Entries**: Create blockchain ledger entries for transactions
- **Entry Verification**: Verify ledger entries on blockchain
- **Transaction Tracking**: Track transaction types and amounts
- **Web3 Feature**: Blockchain ledger operations require blockchain wallet

### 🆔 Onchain Farm Livestock Blockchain Identity
- **Identity Creation**: Create blockchain identities with identity hashes
- **Identity Updates**: Update identity metadata on blockchain
- **Identity Tracking**: Track identity hashes and metadata
- **Web3 System**: Blockchain identity operations via blockchain wallet

### ⚡ Onchain Farm Crop Harvest Smart Contract
- **Contract Records**: Create smart contract records with deployment information
- **Contract Execution**: Execute smart contract functions on blockchain
- **Contract Tracking**: Track contract addresses and types
- **Web3 Feature**: Smart contract operations require blockchain wallet

### 📦 Onchain Farm Crop Harvest Inventory
- **Inventory Recording**: Record harvest inventory with quantity and location
- **Inventory Updates**: Update inventory records on blockchain
- **Status Tracking**: Track inventory status and locations
- **Web3 Feature**: Inventory operations require blockchain wallet

### 📍 Onchain Farm Livestock Location Tracking
- **Location Recording**: Record livestock locations with GPS coordinates
- **Location Updates**: Update location records on blockchain
- **Location Type Tracking**: Track different location types
- **Web3 System**: Location tracking operations via blockchain wallet

### 💳 Onchain Farm Crop Harvest Payment Processing
- **Payment Processing**: Process payments between parties on blockchain
- **Payment Confirmation**: Confirm payments on blockchain
- **Payment Method Tracking**: Track different payment methods
- **Web3 Feature**: Payment processing operations require blockchain wallet

### 🌡️ Onchain Farm Livestock Temperature Monitoring
- **Temperature Recording**: Record livestock temperature readings
- **Reading Verification**: Verify temperature readings on blockchain
- **Measurement Tracking**: Track measurement methods and dates
- **Web3 System**: Temperature monitoring operations via blockchain wallet

### ⏰ Onchain Farm Crop Harvest Blockchain Timestamp
- **Timestamp Creation**: Create blockchain timestamps for harvest events
- **Timestamp Verification**: Verify timestamps on blockchain
- **Event Tracking**: Track event types and data
- **Web3 Feature**: Timestamp operations require blockchain wallet

### 🚨 Onchain Farm Livestock Health Alerts
- **Alert Creation**: Create health alerts with severity levels
- **Alert Acknowledgment**: Acknowledge alerts on blockchain
- **Alert Type Tracking**: Track different alert types
- **Web3 System**: Health alert operations via blockchain wallet

### 📜 Onchain Farm Crop Harvest Blockchain Notarization
- **Notarization Creation**: Create blockchain notarizations for documents
- **Notarization Verification**: Verify notarizations on blockchain
- **Document Tracking**: Track document hashes and notaries
- **Web3 Feature**: Notarization operations require blockchain wallet

### 🧬 Onchain Farm Livestock Breeding History
- **Breeding Recording**: Record breeding history with success status
- **Breeding Updates**: Update breeding records on blockchain
- **Method Tracking**: Track breeding methods and mates
- **Web3 System**: Breeding history operations via blockchain wallet

### 🔒 Onchain Farm Crop Harvest Blockchain Escrow
- **Escrow Creation**: Create escrow accounts for harvest transactions
- **Escrow Release**: Release escrow funds on blockchain
- **Escrow Tracking**: Track escrow amounts and release dates
- **Web3 Feature**: Escrow operations require blockchain wallet

### 💉 Onchain Farm Livestock Vaccination Records
- **Vaccination Recording**: Record vaccinations with batch numbers
- **Vaccination Verification**: Verify vaccination records on blockchain
- **Veterinarian Tracking**: Track veterinarians and vaccine types
- **Web3 System**: Vaccination record operations via blockchain wallet

### 🤝 Onchain Farm Crop Harvest Blockchain Consensus
- **Consensus Creation**: Create consensus proposals for harvest decisions
- **Voting**: Vote on consensus proposals via blockchain
- **Proposal Tracking**: Track proposals and voting results
- **Web3 Feature**: Consensus operations require blockchain wallet

### 📈 Onchain Farm Livestock Growth Tracking
- **Growth Recording**: Record livestock growth with weight and height
- **Growth Updates**: Update growth records on blockchain
- **Measurement Tracking**: Track measurement methods and dates
- **Web3 System**: Growth tracking operations via blockchain wallet

### ⚖️ Onchain Farm Crop Harvest Blockchain Arbitration
- **Arbitration Creation**: Create arbitration cases for disputes
- **Arbitration Resolution**: Resolve arbitrations on blockchain
- **Dispute Tracking**: Track disputes and arbitrators
- **Web3 Feature**: Arbitration operations require blockchain wallet

### 💀 Onchain Farm Livestock Mortality Tracking
- **Mortality Recording**: Record livestock mortality with cause of death
- **Mortality Verification**: Verify mortality records on blockchain
- **Disposal Tracking**: Track disposal methods and dates
- **Web3 System**: Mortality tracking operations via blockchain wallet

### 🔮 Onchain Farm Crop Harvest Blockchain Oracle
- **Oracle Data Submission**: Submit oracle data for harvest information
- **Oracle Verification**: Verify oracle data on blockchain
- **Source Tracking**: Track oracle sources and data types
- **Web3 Feature**: Oracle operations require blockchain wallet

### 🪙 Onchain Farm Livestock Blockchain Tokenization
- **Tokenization Creation**: Create tokens for livestock assets
- **Token Transfer**: Transfer tokens on blockchain
- **Token Tracking**: Track token symbols and amounts
- **Web3 System**: Tokenization operations via blockchain wallet

### 🖼️ Onchain Farm Crop Harvest Blockchain NFT
- **NFT Minting**: Mint NFTs for harvest assets
- **NFT Transfer**: Transfer NFTs on blockchain
- **Metadata Tracking**: Track NFT metadata and token URIs
- **Web3 Feature**: NFT operations require blockchain wallet

### 💎 Onchain Farm Livestock Blockchain Staking
- **Staking Creation**: Create staking records for livestock assets
- **Unstaking**: Unstake assets on blockchain
- **Staking Period Tracking**: Track staking periods and amounts
- **Web3 System**: Staking operations via blockchain wallet

### 🗳️ Onchain Farm Crop Harvest Blockchain Governance
- **Proposal Creation**: Create governance proposals for harvest decisions
- **Voting**: Vote on proposals via blockchain
- **Voting Period Tracking**: Track voting periods and results
- **Web3 Feature**: Governance operations require blockchain wallet

### 🎁 Onchain Farm Livestock Blockchain Rewards
- **Reward Creation**: Create reward records for livestock achievements
- **Reward Claiming**: Claim rewards on blockchain
- **Reward Type Tracking**: Track reward types and amounts
- **Web3 System**: Reward operations via blockchain wallet

## 🚀 160+ New Onchain Features (Powered by Blockchain & Web3)

Cocoa Chain now includes **160+ onchain features** fully integrated with blockchain wallet connectivity. All features require a connected web3 wallet for secure, decentralized operations on the blockchain.

### 🔧 Onchain Farm Equipment Maintenance
- **Maintenance Scheduling**: Schedule equipment maintenance with dates and costs
- **Maintenance Completion**: Mark maintenance tasks as completed onchain
- **Equipment Tracking**: Track maintenance records by equipment ID and type
- **Cost Management**: Record and track maintenance costs per equipment
- **Reown Wallet**: All maintenance operations require wallet connection via Reown

### 💧 Onchain Farm Water Rights Management
- **Water Right Issuance**: Issue water rights with allocation amounts and validity periods
- **Water Usage Recording**: Record water usage against allocated rights
- **Usage Tracking**: Track remaining water allocation per right
- **Source Management**: Track water sources (well, river, reservoir, etc.)
- **Reown Integration**: Water rights management via Reown wallet

### 👷 Onchain Farm Labor Contract Management
- **Contract Creation**: Create labor contracts with workers, wages, and terms
- **Payment Recording**: Record payments made to workers onchain
- **Contract Tracking**: Track contracts by employer and worker
- **Role Management**: Assign roles and terms to labor contracts
- **Reown Wallet**: Labor contract operations require wallet connection

### 🛡️ Onchain Farm Insurance Policy Management
- **Policy Creation**: Create insurance policies with coverage amounts and premiums
- **Claim Filing**: File insurance claims with amounts and reasons
- **Coverage Management**: Manage policy coverage types and periods
- **Claims Tracking**: Track claim counts per policy
- **Reown Integration**: Insurance policy operations via Reown wallet

### 💰 Onchain Farm Subsidy Claims
- **Claim Submission**: Submit subsidy claims with amounts and reasons
- **Claim Approval**: Approve subsidy claims (owner-only function)
- **Payment Tracking**: Mark claims as paid after processing
- **Subsidy Types**: Support various subsidy types (crop, equipment, infrastructure)
- **Reown Wallet**: Subsidy claim operations require wallet connection

### 🏅 Onchain Farm Certification Renewal
- **Certification Issuance**: Issue certifications with validity periods
- **Renewal Processing**: Renew certifications with new validity periods
- **Renewal Tracking**: Track renewal counts per certification
- **Certification Types**: Support organic, fair trade, and other certification types
- **Reown Integration**: Certification operations via Reown wallet

### 📋 Onchain Farm Compliance Reporting
- **Report Submission**: Submit compliance reports with data and types
- **Report Verification**: Verify compliance reports (owner-only function)
- **Report Tracking**: Track reports by reporter and verification status
- **Data Storage**: Store compliance data onchain for transparency
- **Reown Wallet**: Compliance reporting requires wallet connection

### 💼 Onchain Farm Financial Planning
- **Plan Creation**: Create financial plans with budgets and periods
- **Budget Item Management**: Add budget items to financial plans
- **Budget Allocation**: Track allocated vs total budget
- **Plan Types**: Support various financial plan types
- **Reown Integration**: Financial planning operations via Reown wallet

### 💵 Onchain Farm Budget Planning
- **Budget Creation**: Create budgets with total amounts and periods
- **Expense Recording**: Record expenses against budgets
- **Spending Tracking**: Track spent vs allocated amounts
- **Budget Periods**: Manage budget periods with start and end dates
- **Reown Wallet**: Budget planning operations require wallet connection

### 📈 Onchain Farm Investment Tracking
- **Investment Recording**: Record investments with amounts and expected returns
- **Return Tracking**: Record actual returns on investments
- **Investment Types**: Track different investment types
- **Performance Analysis**: Compare expected vs actual returns
- **Reown Integration**: Investment tracking via Reown wallet

### 🪙 Onchain Farm Asset Tokenization
- **Asset Tokenization**: Tokenize farm assets as ERC-721 NFTs
- **Asset Valuation**: Record asset values during tokenization
- **Metadata Storage**: Store asset metadata onchain
- **Ownership Tracking**: Track tokenized assets by owner
- **Reown Wallet**: Asset tokenization requires wallet connection

### 🏞️ Onchain Farm Land Valuation
- **Valuation Creation**: Create land valuations with methods and values
- **Valuation Verification**: Verify valuations (owner-only function)
- **Appraiser Tracking**: Track appraiser addresses for each valuation
- **Valuation Methods**: Support multiple valuation methods
- **Reown Integration**: Land valuation operations via Reown wallet

### 📊 Onchain Farm Performance Benchmarking
- **Benchmark Creation**: Create performance benchmarks with target values
- **Benchmark Updates**: Update benchmarks with actual values
- **Performance Comparison**: Compare actual vs benchmark values
- **Metric Types**: Support various performance metric types
- **Reown Wallet**: Performance benchmarking requires wallet connection

### 💹 Onchain Farm Profitability Analysis
- **Report Creation**: Create profitability reports with revenue and costs
- **Profit Calculation**: Automatically calculate profit and profit margins
- **Period Analysis**: Analyze profitability over specific periods
- **Financial Metrics**: Track revenue, costs, profit, and margins
- **Reown Integration**: Profitability analysis via Reown wallet

### 📈 Onchain Farm Production Analytics
- **Production Recording**: Record production data with yields and areas
- **Efficiency Calculation**: Automatically calculate production efficiency
- **Crop Tracking**: Track production by crop type
- **Yield Analysis**: Analyze yields per area unit
- **Reown Wallet**: Production analytics require wallet connection

### ⚙️ Onchain Farm Resource Optimization
- **Optimization Plan Creation**: Create resource optimization plans
- **Usage Comparison**: Compare current vs optimal resource usage
- **Savings Calculation**: Calculate potential savings from optimization
- **Plan Implementation**: Mark optimization plans as implemented
- **Reown Integration**: Resource optimization via Reown wallet

### ⚠️ Onchain Farm Risk Assessment
- **Assessment Creation**: Create risk assessments with levels and descriptions
- **Risk Mitigation**: Record mitigation strategies for identified risks
- **Risk Level Tracking**: Track risk levels on 1-10 scale
- **Mitigation Status**: Mark risks as mitigated
- **Reown Wallet**: Risk assessment operations require wallet connection

### 🌿 Onchain Farm Sustainability Scoring
- **Score Creation**: Create sustainability scores (environmental, social, economic)
- **Overall Score Calculation**: Automatically calculate overall sustainability score
- **Score Verification**: Verify sustainability scores (owner-only function)
- **Multi-Dimensional Scoring**: Track environmental, social, and economic dimensions
- **Reown Integration**: Sustainability scoring via Reown wallet

### 👨‍👩‍👧‍👦 Onchain Farm Succession Planning
- **Plan Creation**: Create succession plans with successors and transfer dates
- **Plan Approval**: Approve succession plans by successors
- **Plan Execution**: Execute succession plans after approval and date
- **Transfer Management**: Manage farm ownership transfers
- **Reown Wallet**: Succession planning requires wallet connection

### ♻️ Onchain Farm Waste Management
- **Waste Recording**: Record waste with types, amounts, and disposal methods
- **Recycling Tracking**: Mark waste as recycled with recycling values
- **Waste Types**: Track various waste types (organic, plastic, chemical, etc.)
- **Recycling Value**: Record recycling value for recycled waste
- **Reown Integration**: Waste management operations via Reown wallet

**All 20 original onchain features are fully integrated with Reown AppKit and require wallet connection for all operations. Each feature includes smart contracts deployed onchain and React hooks for seamless frontend integration.**

## 🚀 20 Additional New Onchain Features (Powered by Reown Wallet)

Cocoa Chain now includes **20 additional brand new onchain features** for advanced trading, marketplace operations, and sustainability initiatives. All features are fully integrated with **Reown AppKit** and require wallet connection via Reown.

### 📊 Crop Yield Prediction
- **Prediction Creation**: Create yield predictions with confidence scores via Reown wallet
- **Prediction Verification**: Verify predictions against actual yields with onchain accuracy calculation
- **Crop Type Tracking**: Track predictions by crop type with onchain filtering
- **Confidence Scoring**: Record prediction confidence levels with onchain verification
- **Reown Integration**: All prediction operations require Reown wallet connection

### 🌦️ Weather Insurance
- **Policy Creation**: Create weather insurance policies with coverage amounts via Reown wallet
- **Claim Filing**: File insurance claims with onchain verification
- **Weather Conditions**: Track covered weather conditions with onchain storage
- **Coverage Management**: Manage policy coverage periods and amounts
- **Reown Wallet**: Insurance operations require wallet connection

### 🌱 Soil Carbon Sequestration
- **Sequestration Recording**: Record carbon sequestration amounts with soil type via Reown wallet
- **Credit Calculation**: Automatically calculate carbon credits earned (1 credit per ton)
- **Verification System**: Verify sequestration records (owner-only function)
- **Soil Type Tracking**: Track sequestration by soil type with onchain queries
- **Reown Integration**: Carbon tracking via Reown wallet

### 💧 Water Rights Trading
- **Right Listing**: List water rights for sale with amounts and prices via Reown wallet
- **Right Purchase**: Purchase water rights with onchain payment processing
- **Marketplace**: Decentralized marketplace for water rights trading
- **Ownership Transfer**: Automatic ownership transfer on purchase
- **Reown Wallet**: Trading operations require wallet connection

### 🦋 Biodiversity Credits
- **Credit Issuance**: Issue biodiversity credits with amounts and types via Reown wallet
- **Credit Verification**: Verify credits and assign values (owner-only function)
- **Credit Types**: Track various biodiversity types (flora, fauna, ecosystem)
- **Value Assignment**: Assign monetary values to verified credits
- **Reown Integration**: Credit operations via Reown wallet

### ⚡ Renewable Energy Trading
- **Energy Listing**: List renewable energy for sale with amounts and prices via Reown wallet
- **Energy Purchase**: Purchase renewable energy with onchain payment processing
- **Energy Types**: Support solar, wind, hydro, and other renewable sources
- **Marketplace**: Decentralized marketplace for renewable energy trading
- **Reown Wallet**: Trading operations require wallet connection

### 📊 Data Monetization
- **Data Listing**: List farm data for sale with types and prices via Reown wallet
- **Data Purchase**: Purchase farm data with onchain payment processing
- **Data Types**: Support various data types (yield, weather, soil, etc.)
- **Metadata Storage**: Store data metadata onchain for transparency
- **Reown Integration**: Data monetization via Reown wallet

### 🌍 Carbon Offset Marketplace
- **Offset Listing**: List carbon offsets for sale with amounts and prices via Reown wallet
- **Offset Purchase**: Purchase carbon offsets with onchain payment processing
- **Offset Verification**: Verify offsets (owner-only function)
- **Price Per Ton**: Set and track prices per ton of carbon
- **Reown Wallet**: Marketplace operations require wallet connection

### 🛡️ Insurance Pool
- **Pool Membership**: Join insurance pool with contributions via Reown wallet
- **Claim Filing**: File insurance claims with amounts and onchain verification
- **Claim Approval**: Approve claims (owner-only function)
- **Claim Payment**: Process claim payments with onchain fund management
- **Reown Integration**: Pool operations via Reown wallet

### 🗳️ Cooperative Voting
- **Proposal Creation**: Create proposals with descriptions and voting periods via Reown wallet
- **Voting**: Cast votes (yes/no) on proposals with onchain verification
- **Vote Counting**: Automatic vote counting with onchain tallies
- **Proposal Execution**: Execute approved proposals automatically
- **Reown Wallet**: Voting operations require wallet connection

### 🏢 Asset Leasing
- **Lease Creation**: Create asset leases with terms and rent via Reown wallet
- **Rent Payment**: Pay monthly rent with onchain payment processing
- **Lease Management**: Track active leases with start and end dates
- **Lease Termination**: Terminate leases with onchain status updates
- **Reown Integration**: Leasing operations via Reown wallet

### 💼 Labor Payment Escrow
- **Escrow Creation**: Create escrow payments with amounts and release dates via Reown wallet
- **Payment Release**: Release payments automatically on release date
- **Dispute Handling**: File disputes with onchain dispute resolution
- **Dispute Resolution**: Resolve disputes (owner-only function)
- **Reown Wallet**: Escrow operations require wallet connection

### 💰 Supply Chain Payments
- **Payment Creation**: Create supply chain payments with invoices via Reown wallet
- **Payment Processing**: Process payments with onchain verification
- **Invoice Tracking**: Track payments by invoice ID with onchain queries
- **Due Date Management**: Manage payment due dates with onchain timestamps
- **Reown Integration**: Payment operations via Reown wallet

### ✅ Quality Assurance
- **Quality Checks**: Perform quality checks with scores and standards via Reown wallet
- **Score Threshold**: Automatic pass/fail based on 80+ score threshold
- **Certification Issuance**: Issue quality certifications for passed checks
- **Standards Tracking**: Track quality standards with onchain storage
- **Reown Wallet**: Quality assurance requires wallet connection

### 🗺️ Land Registry
- **Parcel Registration**: Register land parcels with areas and coordinates via Reown wallet
- **Parcel Verification**: Verify land parcels (owner-only function)
- **Ownership Transfer**: Transfer land parcel ownership with onchain updates
- **Coordinate Storage**: Store GPS coordinates onchain for verification
- **Reown Integration**: Registry operations via Reown wallet

### 📦 Export Certification
- **Certificate Issuance**: Issue export certificates with validity periods via Reown wallet
- **Certificate Validation**: Validate certificates with onchain expiry checks
- **Destination Tracking**: Track export destinations with onchain storage
- **Certificate Revocation**: Revoke certificates (owner-only function)
- **Reown Wallet**: Certification operations require wallet connection

### 🔧 Equipment Sharing
- **Equipment Sharing**: Share equipment with borrowers and deposits via Reown wallet
- **Equipment Return**: Return shared equipment with automatic deposit refund
- **Deposit Management**: Manage security deposits with onchain escrow
- **Sharing Periods**: Track sharing periods with start and end dates
- **Reown Integration**: Sharing operations via Reown wallet

### 📈 Harvest Futures
- **Futures Creation**: Create futures contracts with expected yields and prices via Reown wallet
- **Harvest Delivery**: Deliver harvest with actual yields and onchain verification
- **Contract Settlement**: Settle futures contracts with onchain payment processing
- **Delivery Dates**: Manage delivery dates with onchain timestamps
- **Reown Wallet**: Futures operations require wallet connection

### 🌾 Seed Exchange
- **Seed Listing**: List seeds for sale with types, quantities, and prices via Reown wallet
- **Seed Purchase**: Purchase seeds with onchain payment processing
- **Quality Tracking**: Track seed quality with onchain storage
- **Marketplace**: Decentralized marketplace for seed trading
- **Reown Integration**: Exchange operations via Reown wallet

### 🌿 Sustainability Rewards
- **Action Recording**: Record sustainability actions with points via Reown wallet
- **Point System**: Earn points for sustainability actions (100 points = 1 reward unit)
- **Reward Claiming**: Claim rewards based on accumulated points
- **Action Verification**: Verify actions (owner-only function)
- **Reown Wallet**: Rewards operations require wallet connection

**All 20 additional new onchain features are fully integrated with Reown AppKit and require wallet connection for all operations. Each feature includes smart contracts deployed onchain and React hooks for seamless frontend integration.**

## 🌾 Additional Onchain Features (Powered by Reown Wallet)

Cocoa Chain includes additional onchain features for comprehensive farm management, all integrated with **Reown AppKit** and requiring wallet connection via Reown.

### 🔄 Crop Rotation Optimization
- **Rotation Planning**: Create crop rotation plans with sequences and periods via Reown wallet
- **Plan Activation**: Activate rotation plans with onchain verification
- **Sequence Management**: Manage crop sequences and rotation periods
- **Reown Integration**: All rotation operations require Reown wallet connection

### 🐛 Pest Management
- **Pest Recording**: Record pest detections with types and severity via Reown wallet
- **Treatment Tracking**: Track treatment methods with onchain records
- **Treatment Completion**: Mark pests as treated with onchain verification
- **Reown Wallet**: Pest management operations require wallet connection

### 💧 Irrigation Management
- **Schedule Creation**: Create irrigation schedules with amounts and frequency via Reown wallet
- **Irrigation Completion**: Complete irrigation tasks with onchain timestamps
- **Water Tracking**: Track water usage and next irrigation dates
- **Reown Integration**: Irrigation operations via Reown wallet

### 🧪 Soil Testing
- **Test Recording**: Record soil tests with pH and nutrient levels via Reown wallet
- **Test Verification**: Verify soil tests (owner-only function)
- **Nutrient Tracking**: Track nitrogen, phosphorus, and potassium levels
- **Reown Wallet**: Soil testing requires wallet connection

### 📅 Harvest Scheduling
- **Schedule Creation**: Schedule harvests with dates and expected yields via Reown wallet
- **Harvest Completion**: Complete harvests with actual yields and onchain verification
- **Yield Comparison**: Compare expected vs actual yields
- **Reown Integration**: Harvest scheduling via Reown wallet

### 🐄 Livestock Health
- **Health Records**: Create livestock health records with status and veterinarian info via Reown wallet
- **Vaccination Tracking**: Record vaccinations with onchain verification
- **Health Monitoring**: Monitor livestock health status
- **Reown Wallet**: Livestock health operations require wallet connection

### 🌿 Fertilizer Application
- **Application Recording**: Record fertilizer applications with types and amounts via Reown wallet
- **Organic Tracking**: Track organic vs synthetic fertilizers
- **Application History**: Maintain application history with onchain records
- **Reown Integration**: Fertilizer operations via Reown wallet

### 🌤️ Weather Monitoring
- **Weather Recording**: Record weather data (temperature, humidity, rainfall) via Reown wallet
- **Data Tracking**: Track weather patterns with onchain timestamps
- **Historical Data**: Maintain historical weather records
- **Reown Wallet**: Weather monitoring requires wallet connection

### 🦠 Crop Disease Tracking
- **Disease Recording**: Record crop diseases with types and severity via Reown wallet
- **Treatment Tracking**: Track disease treatments with onchain records
- **Resolution Tracking**: Mark diseases as resolved with onchain verification
- **Reown Integration**: Disease tracking via Reown wallet

### 📦 Inventory Management
- **Item Management**: Add inventory items with categories and quantities via Reown wallet
- **Quantity Updates**: Update inventory quantities with onchain verification
- **Price Tracking**: Track unit prices for inventory items
- **Reown Wallet**: Inventory operations require wallet connection

### 🗺️ Field Mapping
- **Field Mapping**: Create field maps with GPS coordinates via Reown wallet
- **Area Tracking**: Track field areas in hectares with onchain storage
- **Field Types**: Categorize fields by type with onchain records
- **Reown Integration**: Field mapping via Reown wallet

### 👀 Crop Monitoring
- **Growth Monitoring**: Monitor crop growth stages and health scores via Reown wallet
- **Observation Recording**: Record observations with onchain timestamps
- **Health Tracking**: Track crop health scores over time
- **Reown Wallet**: Crop monitoring requires wallet connection

### 👷 Labor Scheduling
- **Task Scheduling**: Schedule labor tasks with workers and dates via Reown wallet
- **Task Completion**: Mark tasks as completed with onchain verification
- **Hour Tracking**: Track labor hours with onchain records
- **Reown Integration**: Labor scheduling via Reown wallet

### 🔧 Equipment Tracking
- **Usage Recording**: Record equipment usage with hours and purposes via Reown wallet
- **Usage History**: Maintain equipment usage history with onchain records
- **Operator Tracking**: Track equipment operators with onchain verification
- **Reown Wallet**: Equipment tracking requires wallet connection

### 🏪 Crop Storage
- **Storage Recording**: Record crop storage with types and quantities via Reown wallet
- **Expiry Tracking**: Track storage expiry dates with onchain timestamps
- **Storage Types**: Categorize storage by type with onchain records
- **Reown Integration**: Storage operations via Reown wallet

### 📦 Supply Chain Tracking
- **Location Recording**: Record product locations in supply chain via Reown wallet
- **Handler Tracking**: Track handlers at each location with onchain records
- **Chain of Custody**: Maintain chain of custody with onchain verification
- **Reown Wallet**: Supply chain tracking requires wallet connection

### 🌱 Organic Certification
- **Certification Issuance**: Issue organic certifications with validity periods via Reown wallet
- **Certification Revocation**: Revoke certifications (owner-only function)
- **Validity Tracking**: Track certification validity with onchain timestamps
- **Reown Integration**: Certification operations via Reown wallet

### 💰 Market Price Tracking
- **Price Recording**: Record market prices for commodities via Reown wallet
- **Price History**: Maintain price history with onchain timestamps
- **Commodity Tracking**: Track prices by commodity type
- **Reown Wallet**: Price tracking requires wallet connection

### ♻️ Compost Management
- **Batch Creation**: Create compost batches with quantities and maturity dates via Reown wallet
- **Maturity Tracking**: Track compost maturity with onchain timestamps
- **Readiness Marking**: Mark compost as ready when mature
- **Reown Integration**: Compost management via Reown wallet

### 🌾 Seed Management
- **Batch Management**: Add seed batches with types and quantities via Reown wallet
- **Quality Tracking**: Track seed quality and germination rates
- **Inventory Management**: Manage seed inventory with onchain records
- **Reown Wallet**: Seed management requires wallet connection

**All additional onchain features are fully integrated with Reown AppKit and require wallet connection for all operations.**

## 🌾 More Onchain Features (Powered by Reown Wallet)

Cocoa Chain includes additional comprehensive onchain features for detailed farm operations, all integrated with **Reown AppKit** and requiring wallet connection via Reown.

### 🌾 Crop Harvest Quality
- **Quality Grading**: Grade harvests with quality scores via Reown wallet
- **Grade Verification**: Verify quality grades (owner-only function)
- **Score Tracking**: Track quality scores with onchain records
- **Reown Integration**: Quality grading requires Reown wallet connection

### 🐄 Livestock Breeding
- **Breeding Records**: Record livestock breeding with sire and dam IDs via Reown wallet
- **Success Tracking**: Mark breeding as successful with offspring tracking
- **Breeding History**: Maintain breeding history with onchain records
- **Reown Wallet**: Breeding operations require wallet connection

### 🌸 Crop Pollination
- **Pollination Recording**: Record pollination activities with pollinator types via Reown wallet
- **Natural Tracking**: Track natural vs artificial pollination
- **Pollination History**: Maintain pollination records with onchain timestamps
- **Reown Integration**: Pollination tracking via Reown wallet

### 💧 Water Quality
- **Quality Testing**: Test water quality with pH and turbidity levels via Reown wallet
- **Safety Assessment**: Automatic safety assessment based on quality parameters
- **Test History**: Maintain water quality test history
- **Reown Wallet**: Water quality testing requires wallet connection

### 📊 Crop Maturity
- **Maturity Tracking**: Track crop maturity stages via Reown wallet
- **Harvest Readiness**: Mark crops as harvest-ready with onchain verification
- **Stage Monitoring**: Monitor maturity stages over time
- **Reown Integration**: Maturity tracking via Reown wallet

### 🍽️ Livestock Feeding
- **Feeding Records**: Record livestock feeding with feed types and quantities via Reown wallet
- **Feeding Schedule**: Track feeding schedules with onchain timestamps
- **Feed Tracking**: Monitor feed consumption patterns
- **Reown Wallet**: Feeding operations require wallet connection

### ✂️ Crop Pruning
- **Pruning Records**: Record crop pruning activities with tree counts via Reown wallet
- **Pruning Types**: Track different pruning types with onchain records
- **Pruning History**: Maintain pruning history with onchain timestamps
- **Reown Integration**: Pruning operations via Reown wallet

### 🥛 Livestock Milking
- **Milking Records**: Record milking activities with quantities and quality via Reown wallet
- **Quality Tracking**: Track milk quality with onchain records
- **Production Monitoring**: Monitor milk production over time
- **Reown Wallet**: Milking operations require wallet connection

### 🌿 Crop Weeding
- **Weeding Records**: Record weeding activities with area covered via Reown wallet
- **Method Tracking**: Track weeding methods with onchain records
- **Weeding History**: Maintain weeding history with onchain timestamps
- **Reown Integration**: Weeding operations via Reown wallet

### 💉 Livestock Vaccination
- **Vaccination Records**: Record vaccinations with types and validity periods via Reown wallet
- **Due Date Tracking**: Track next vaccination due dates
- **Vaccination History**: Maintain vaccination history with onchain records
- **Reown Wallet**: Vaccination operations require wallet connection

### 🌱 Crop Transplanting
- **Transplant Records**: Record crop transplanting with source and target locations via Reown wallet
- **Plant Tracking**: Track transplanted plants with onchain records
- **Transplant History**: Maintain transplant history with onchain timestamps
- **Reown Integration**: Transplanting operations via Reown wallet

### ⚖️ Livestock Weight
- **Weight Records**: Record livestock weight measurements via Reown wallet
- **Weight Tracking**: Track weight changes over time
- **Growth Monitoring**: Monitor livestock growth patterns
- **Reown Wallet**: Weight tracking requires wallet connection

### 🌳 Crop Thinning
- **Thinning Records**: Record crop thinning activities with plant counts via Reown wallet
- **Reason Tracking**: Track thinning reasons with onchain records
- **Thinning History**: Maintain thinning history with onchain timestamps
- **Reown Integration**: Thinning operations via Reown wallet

### 🚚 Livestock Movement
- **Movement Records**: Record livestock movements between locations via Reown wallet
- **Location Tracking**: Track movement from and to locations
- **Movement History**: Maintain movement history with onchain records
- **Reown Wallet**: Movement tracking requires wallet connection

### 🔗 Crop Grafting
- **Grafting Records**: Record crop grafting activities with rootstock and scion types via Reown wallet
- **Graft Tracking**: Track number of grafts performed
- **Grafting History**: Maintain grafting history with onchain timestamps
- **Reown Integration**: Grafting operations via Reown wallet

### 🐄 Livestock Slaughter
- **Slaughter Records**: Record livestock slaughter with methods via Reown wallet
- **Certification**: Certify slaughter records (owner-only function)
- **Slaughter History**: Maintain slaughter history with onchain records
- **Reown Wallet**: Slaughter operations require wallet connection

### 🌱 Crop Seedling
- **Seedling Records**: Record seedling planting with types and counts via Reown wallet
- **Planting Tracking**: Track seedling planting dates
- **Seedling History**: Maintain seedling history with onchain timestamps
- **Reown Integration**: Seedling operations via Reown wallet

### 🚧 Livestock Quarantine
- **Quarantine Records**: Record livestock quarantine periods with reasons via Reown wallet
- **Release Tracking**: Release livestock from quarantine with onchain verification
- **Quarantine History**: Maintain quarantine history with onchain records
- **Reown Wallet**: Quarantine operations require wallet connection

### 🍂 Crop Mulching
- **Mulching Records**: Record crop mulching activities with types and areas via Reown wallet
- **Mulch Tracking**: Track mulch types and coverage areas
- **Mulching History**: Maintain mulching history with onchain timestamps
- **Reown Integration**: Mulching operations via Reown wallet

### 🏷️ Livestock Identification
- **Identification Records**: Record livestock identification with tag numbers via Reown wallet
- **Tag Tracking**: Track identification tags and types
- **Identification History**: Maintain identification history with onchain records
- **Reown Wallet**: Identification operations require wallet connection

**All onchain features are fully integrated with Reown AppKit and require wallet connection for all operations.**

### 📦 Importing Onchain Features

All 20 onchain features can be imported from centralized index files:

```typescript
// Import all hooks
import {
  useOnchainFarmEquipmentMaintenance,
  useOnchainFarmWaterRights,
  useOnchainFarmLaborContracts,
  // ... all 20 hooks
} from '@/hooks';

// Import all utilities
import {
  createMaintenanceRecord,
  createWaterRight,
  createLaborContract,
  // ... all utility functions
} from '@/lib/onchain-farm-features-index';
```

### 🔧 Smart Contracts

All 20 smart contracts are located in the `contracts/` directory:
- `FarmEquipmentMaintenance.sol`
- `FarmWaterRights.sol`
- `FarmLaborContracts.sol`
- `FarmInsurancePolicy.sol`
- `FarmSubsidyClaims.sol`
- `FarmCertificationRenewal.sol`
- `FarmComplianceReporting.sol`
- `FarmFinancialPlanning.sol`
- `FarmBudgetPlanning.sol`
- `FarmInvestmentTracking.sol`
- `FarmAssetTokenization.sol`
- `FarmLandValuation.sol`
- `FarmPerformanceBenchmarking.sol`
- `FarmProfitabilityAnalysis.sol`
- `FarmProductionAnalytics.sol`
- `FarmResourceOptimization.sol`
- `FarmRiskAssessment.sol`
- `FarmSustainabilityScoring.sol`
- `FarmSuccessionPlanning.sol`
- `FarmWasteManagement.sol`

### ✅ Reown Wallet Integration

Every single feature hook uses Reown wallet integration:

```typescript
import { useAccount, useWriteContract } from 'wagmi'; // Reown integrated

export function useOnchainFeature() {
  const { address } = useAccount(); // Reown wallet address
  const { writeContract } = useWriteContract(); // Reown contract interaction
  
  // All operations require wallet connection
  if (!address) throw new Error('Wallet not connected via Reown');
  
  // All transactions go through Reown
  await writeContract({ /* ... */ });
}
```

## 🔗 Connect Your Wallet with Reown

Cocoa Chain uses **Reown AppKit** (formerly WalletConnect) as the primary wallet connection layer. All onchain features require a connected wallet via Reown.

### Supported Wallets (via Reown AppKit)

Reown AppKit provides access to **300+ wallets** including:

- **MetaMask** - Desktop and mobile
- **WalletConnect** - Universal wallet connector
- **Coinbase Wallet** - Coinbase's official wallet
- **Trust Wallet** - Mobile-first wallet
- **Rainbow Wallet** - Beautiful Ethereum wallet
- **Argent** - Smart contract wallet
- **Ledger** - Hardware wallet support
- **Trezor** - Hardware wallet support
- **And 290+ more wallets** - Full list at [reown.com](https://reown.com/)

### Reown Wallet Integration

The dApp includes dedicated Reown wallet utilities:

- **`useAccount` hook** - Get connected wallet address from Reown
- **`useWriteContract` hook** - Write contracts via Reown wallet
- **All hooks use Reown** - Every onchain feature hook integrates with Reown
- **Session management** - Automatic Reown session handling
- **Multi-wallet support** - Connect and manage multiple wallets via Reown
- **Chain switching** - Seamless chain switching with Reown

### Reown Integration in All Hooks

Every onchain feature hook uses Reown wallet integration:

```typescript
import { useAccount, useWriteContract } from 'wagmi'; // Reown integrated via wagmi

export function useOnchainFeature() {
  const { address } = useAccount(); // Reown wallet address
  const { writeContract } = useWriteContract(); // Reown contract interaction
  
  const execute = async () => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({ /* ... */ }); // Transaction via Reown
  };
}
```

All 20+ onchain features require Reown wallet connection for security and decentralization.

## 🌐 Onchain Benefits

- **Immutable Records**: All plantation data is stored onchain, ensuring transparency and verifiability
- **True Ownership**: Your plantations are NFTs owned by your wallet address
- **Decentralized**: No single point of failure, fully decentralized architecture
- **Transparent**: All transactions are publicly verifiable on the blockchain
- **Interoperable**: Works with any EVM-compatible blockchain
- **Tradeable**: Plantation NFTs can be traded on NFT marketplaces
- **Composable**: Integrates with other DeFi protocols and dApps

## 📝 License

MIT License – Build onchain, build decentralized, build the future of agriculture.

---

**Built with ❤️ for the Web3 agricultural community**
