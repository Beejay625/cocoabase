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

export function addAsset(
  portfolio: Portfolio,
  token: Address,
  amount: bigint,
  price: bigint
): Portfolio {
  const asset: PortfolioAsset = { token, amount, price };
  return {
    ...portfolio,
    assets: [...portfolio.assets, asset],
    totalValue: portfolio.totalValue + (amount * price),
  };
}

export function calculatePortfolioValue(portfolio: Portfolio): bigint {
  return portfolio.assets.reduce((total, asset) => 
    total + (asset.amount * asset.price), BigInt(0)
  );
}
