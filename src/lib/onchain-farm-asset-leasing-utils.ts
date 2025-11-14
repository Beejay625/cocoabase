import { type Address } from 'viem';

export interface Lease {
  id: string;
  leaseId: bigint;
  assetId: bigint;
  lessor: Address;
  lessee: Address;
  monthlyRent: bigint;
  startDate: bigint;
  endDate: bigint;
  active: boolean;
}

export function createLease(
  address: Address,
  assetId: bigint,
  lessee: Address,
  monthlyRent: bigint,
  duration: bigint
): Lease {
  return {
    id: `${Date.now()}-${Math.random()}`,
    leaseId: BigInt(0),
    assetId,
    lessor: address,
    lessee,
    monthlyRent,
    startDate: BigInt(Date.now()),
    endDate: BigInt(Date.now()) + duration,
    active: true,
  };
}
