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

export function addRevenue(
  revenueShare: RevenueShare,
  amount: bigint
): RevenueShare {
  return {
    ...revenueShare,
    totalRevenue: revenueShare.totalRevenue + amount,
  };
}

export function distributeRevenue(
  revenueShare: RevenueShare,
  shareholder: Address
): bigint {
  const percentage = revenueShare.sharePercentages.get(shareholder) || 0;
  return (revenueShare.totalRevenue * BigInt(Math.floor(percentage * 100))) / BigInt(10000);
}

export function addShareholder(
  revenueShare: RevenueShare,
  shareholder: Address,
  percentage: number
): RevenueShare {
  const newShareholders = new Map(revenueShare.shareholders);
  const newPercentages = new Map(revenueShare.sharePercentages);
  newShareholders.set(shareholder, BigInt(0));
  newPercentages.set(shareholder, percentage);
  return {
    ...revenueShare,
    shareholders: newShareholders,
    sharePercentages: newPercentages,
  };
}
