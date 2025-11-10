# 🌱 Cocoa Chain – Onchain Plantation Management Protocol

**Cocoa Chain** is a decentralized, wallet-connected dApp for minting, tracking, and managing onchain cocoa plantations as verifiable digital assets. Built on Next.js with **Reown AppKit** (WalletConnect) integration, every plantation is tokenized, every transaction is onchain, and every harvest is immutable.

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
