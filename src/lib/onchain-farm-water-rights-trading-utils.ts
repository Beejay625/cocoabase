import { type Address } from 'viem';

/**
 * Onchain farm water rights trading utilities
 * Water rights trading and transfer management
 */

export interface WaterRightsTrade {
  id: string;
  waterRightsId: string;
  seller: Address;
  buyer: Address;
  amount: bigint;
  price: bigint;
  status: 'pending' | 'executed' | 'cancelled';
  timestamp: bigint;
}

export function createWaterRightsTrade(
  seller: Address,
  waterRightsId: string,
  amount: bigint,
  price: bigint,
  buyer: Address
): WaterRightsTrade {
  return {
    id: `${Date.now()}-${Math.random()}`,
    waterRightsId,
    seller,
    buyer,
    amount,
    price,
    status: 'pending',
    timestamp: BigInt(Date.now()),
  };
}

