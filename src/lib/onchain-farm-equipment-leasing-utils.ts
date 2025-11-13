import { type Address } from 'viem';

export interface Lease {
  id: bigint;
  lessor: Address;
  lessee: Address;
  equipmentId: bigint;
  monthlyRate: bigint;
  duration: bigint;
  status: 'active' | 'completed' | 'terminated';
  timestamp: bigint;
}

export function createLease(
  lessor: Address,
  lessee: Address,
  equipmentId: bigint,
  monthlyRate: bigint,
  duration: bigint
): Lease {
  return {
    id: BigInt(Date.now()),
    lessor,
    lessee,
    equipmentId,
    monthlyRate,
    duration,
    status: 'active',
    timestamp: BigInt(Date.now()),
  };
}

export function calculateTotalLeaseValue(
  lease: Lease
): bigint {
  return lease.monthlyRate * lease.duration;
}

export function getActiveLeases(
  leases: Lease[]
): Lease[] {
  return leases.filter((l) => l.status === 'active');
}
