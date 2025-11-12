import { type Address } from 'viem';

export interface MarketIntelligence {
  id: bigint;
  provider: Address;
  commodity: string;
  price: bigint;
  trend: 'up' | 'down' | 'stable';
  timestamp: bigint;
  txHash: string;
}

export function createIntelligence(
  provider: Address,
  commodity: string,
  price: bigint,
  trend: 'up' | 'down' | 'stable'
): MarketIntelligence {
  return {
    id: BigInt(Date.now()),
    provider,
    commodity,
    price,
    trend,
    timestamp: BigInt(Date.now()),
    txHash: '',
  };
}
