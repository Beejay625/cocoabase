# Reown Wallet Integration - Complete

## ✅ All 20 Onchain Features Use Reown Wallet

Every single onchain feature in Cocoa Chain requires and uses **Reown AppKit** for wallet connectivity.

## Integration Details

### How It Works

1. **Wallet Connection**: All hooks use `useAccount()` from wagmi (powered by Reown)
   ```typescript
   const { address } = useAccount(); // Reown wallet address
   ```

2. **Contract Interactions**: All transactions use `useWriteContract()` from wagmi (powered by Reown)
   ```typescript
   const { writeContract } = useWriteContract(); // Reown contract interaction
   ```

3. **Error Handling**: All hooks check for wallet connection
   ```typescript
   if (!address) throw new Error('Wallet not connected via Reown');
   ```

### Features Using Reown

✅ Equipment Maintenance  
✅ Water Rights Management  
✅ Labor Contracts  
✅ Insurance Policy  
✅ Subsidy Claims  
✅ Certification Renewal  
✅ Compliance Reporting  
✅ Financial Planning  
✅ Budget Planning  
✅ Investment Tracking  
✅ Asset Tokenization  
✅ Land Valuation  
✅ Performance Benchmarking  
✅ Profitability Analysis  
✅ Production Analytics  
✅ Resource Optimization  
✅ Risk Assessment  
✅ Sustainability Scoring  
✅ Succession Planning  
✅ Waste Management  

## Reown AppKit Configuration

The app uses Reown AppKit configured in `src/config/appkit.ts`:

```typescript
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, arbitrum } from "@reown/appkit/networks";

export const wagmiAdapter = new WagmiAdapter({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  networks: [mainnet, arbitrum],
});
```

## Supported Wallets

Reown AppKit provides access to **300+ wallets** including:
- MetaMask
- WalletConnect
- Coinbase Wallet
- Trust Wallet
- Rainbow Wallet
- Argent
- Ledger
- Trezor
- And 290+ more

## Benefits

- ✅ **Universal Compatibility**: Works with 300+ wallets
- ✅ **Secure**: All transactions signed by user's wallet
- ✅ **Decentralized**: No central authority
- ✅ **User-Friendly**: One-click wallet connection
- ✅ **Type-Safe**: Full TypeScript support

