import { type Address } from 'viem';

export interface Portfolio {
  owner: Address;
  tokens: Map<Address, bigint>;
  totalValue: bigint;
  lastUpdated: bigint;
}

export interface PortfolioAsset {
  token: Address;
  amount: bigint;
  value: bigint;
  percentage: number;
}

export function createPortfolio(owner: Address): Portfolio {
  return {
    owner,
    tokens: new Map(),
    totalValue: BigInt(0),
    lastUpdated: BigInt(Date.now()),
  };
}

export function addAsset(
  portfolio: Portfolio,
  token: Address,
  amount: bigint,
  price: bigint
): Portfolio {
  const newTokens = new Map(portfolio.tokens);
  const existing = newTokens.get(token) || BigInt(0);
  newTokens.set(token, existing + amount);
  const assetValue = amount * price;
  return {
    ...portfolio,
    tokens: newTokens,
    totalValue: portfolio.totalValue + assetValue,
    lastUpdated: BigInt(Date.now()),
  };
}

export function calculatePortfolioValue(
  portfolio: Portfolio,
  prices: Map<Address, bigint>
): bigint {
  let total = BigInt(0);
  for (const [token, amount] of portfolio.tokens) {
    const price = prices.get(token) || BigInt(0);
    total += amount * price;
  }
  return total;
}

