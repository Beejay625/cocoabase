import { type Address } from 'viem';

export interface RevenueShare {
  id: bigint;
  token: Address;
  totalRevenue: bigint;
  shareholders: Map<Address, bigint>;
  sharePercentages: Map<Address, number>;
}

export function createRevenueShare(
  token: Address
): RevenueShare {
  return {
    id: BigInt(0),
    token,
    totalRevenue: BigInt(0),
    shareholders: new Map(),
    sharePercentages: new Map(),
  };
}

