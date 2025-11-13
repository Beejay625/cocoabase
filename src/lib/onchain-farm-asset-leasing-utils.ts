import { type Address } from 'viem';

/**
 * Onchain farm asset leasing utilities
 * Asset lease creation and management
 */

export interface AssetLease {
  id: string;
  assetId: string;
  lessor: Address;
  lessee: Address;
  monthlyRent: bigint;
  duration: number;
  startDate: bigint;
  endDate: bigint;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
}

export function createLease(
  lessor: Address,
  assetId: string,
  lessee: Address,
  monthlyRent: bigint,
  duration: number
): AssetLease {
  const startDate = BigInt(Date.now());
  const endDate = BigInt(Date.now() + duration * 30 * 24 * 60 * 60 * 1000);
  return {
    id: `${Date.now()}-${Math.random()}`,
    assetId,
    lessor,
    lessee,
    monthlyRent,
    duration,
    startDate,
    endDate,
    status: 'pending',
  };
}

