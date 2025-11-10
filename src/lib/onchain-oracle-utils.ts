import { type Address } from 'viem';

/**
 * Onchain oracle utilities
 * Price feeds, data oracles, and external data
 */

export interface PriceFeed {
  token: Address;
  price: bigint;
  decimals: number;
  updatedAt: number;
}

/**
 * Get price from oracle
 */
export function getOraclePrice(feed: PriceFeed): bigint {
  return feed.price;
}

/**
 * Check if price feed is stale
 */
export function isPriceFeedStale(feed: PriceFeed, maxAge: number = 3600000): boolean {
  return Date.now() - feed.updatedAt > maxAge;
}

/**
 * Format oracle price
 */
export function formatOraclePrice(feed: PriceFeed): string {
  const divisor = BigInt(10 ** feed.decimals);
  const whole = feed.price / divisor;
  const fraction = feed.price % divisor;
  return `${whole.toString()}.${fraction.toString().padStart(feed.decimals, '0').slice(0, 4)}`;
}
