import { type Address } from 'viem';

/**
 * Onchain oracle integration utilities
 * Price feeds and external data oracles
 */

export interface OraclePrice {
  token: Address;
  price: bigint;
  decimals: number;
  timestamp: bigint;
  source: string;
}

export interface OracleFeed {
  address: Address;
  token: Address;
  latestRound: bigint;
  decimals: number;
}

export function getOraclePrice(
  feed: OracleFeed,
  roundId: bigint
): Promise<OraclePrice> {
  return Promise.resolve({
    token: feed.token,
    price: BigInt(0),
    decimals: feed.decimals,
    timestamp: BigInt(Date.now()),
    source: 'chainlink',
  });
}

export function calculatePriceImpact(
  currentPrice: bigint,
  newPrice: bigint
): number {
  if (currentPrice === BigInt(0)) return 0;
  const diff = Number(newPrice - currentPrice);
  return (diff / Number(currentPrice)) * 100;
}

export function validateOraclePrice(
  price: OraclePrice,
  maxAge: number = 3600
): boolean {
  const age = Date.now() - Number(price.timestamp);
  return age < maxAge * 1000 && price.price > BigInt(0);
}

export function getTWAP(
  prices: OraclePrice[],
  window: number
): bigint {
  if (prices.length === 0) return BigInt(0);
  const sum = prices.reduce((acc, p) => acc + p.price, BigInt(0));
  return sum / BigInt(prices.length);
}

export function calculateOracleDeviation(
  price1: bigint,
  price2: bigint
): number {
  if (price1 === BigInt(0)) return 0;
  return Math.abs(Number(price1 - price2) / Number(price1)) * 100;
}
