import { type Address } from 'viem';

export interface WaterRight {
  id: bigint;
  owner: Address;
  volume: bigint;
  expiryDate: bigint;
  status: 'active' | 'expired';
}

export function createWaterRight(
  owner: Address,
  volume: bigint,
  expiryDate: bigint
): WaterRight {
  return {
    id: BigInt(Date.now()),
    owner,
    volume,
    expiryDate,
    status: 'active',
  };
}

export function checkExpiry(
  right: WaterRight,
  currentTime: bigint
): boolean {
  return currentTime > right.expiryDate;
}

export function getActiveRights(
  rights: WaterRight[]
): WaterRight[] {
  return rights.filter((r) => r.status === 'active');
}
