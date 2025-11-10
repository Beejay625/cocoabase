import { type Address } from 'viem';

/**
 * Onchain portfolio utilities
 * Portfolio management for multi-token tracking
 */

export interface PortfolioAsset {
  token: Address;
  amount: bigint;
  price: bigint;
}

export interface Portfolio {
  owner: Address;
  assets: PortfolioAsset[];
  totalValue: bigint;
}

export function createPortfolio(owner: Address): Portfolio {
  return {
    owner,
    assets: [],
    totalValue: BigInt(0),
  };
}
