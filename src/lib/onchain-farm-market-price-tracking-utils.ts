import { type Address } from 'viem';

/**
 * Onchain farm market price tracking utilities
 * Market price recording and updates
 */

export interface PriceRecord {
  id: string;
  commodity: string;
  recordedBy: Address;
  price: bigint;
  market: string;
  date: bigint;
  timestamp: bigint;
}

export function createPriceRecord(
  address: Address,
  commodity: string,
  price: bigint,
  market: string,
  date: bigint
): PriceRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    commodity,
    recordedBy: address,
    price,
    market,
    date,
    timestamp: BigInt(Date.now()),
  };
}

