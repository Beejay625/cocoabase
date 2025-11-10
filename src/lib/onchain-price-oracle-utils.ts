import { type Address } from 'viem';

export interface PriceOracle {
  id: bigint;
  asset: string;
  price: bigint;
  decimals: number;
  lastUpdated: bigint;
  confidence: number;
}

export function createPriceOracle(
  asset: string,
  price: bigint,
  decimals: number
): PriceOracle {
  return {
    id: BigInt(0),
    asset,
    price,
    decimals,
    lastUpdated: BigInt(Date.now()),
    confidence: 100,
  };
}

