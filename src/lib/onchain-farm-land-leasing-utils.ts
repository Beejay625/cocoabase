import { type Address } from 'viem';

/**
 * Onchain farm land leasing utilities
 * Land leasing agreements
 */

export interface LeaseAgreement {
  id: string;
  leaseId: bigint;
  landowner: Address;
  tenant: Address;
  landId: bigint;
  leaseStartDate: bigint;
  leaseEndDate: bigint;
  monthlyRent: bigint;
  deposit: bigint;
  isActive: boolean;
  depositReturned: boolean;
}

export function createLeaseAgreement(
  landowner: Address,
  tenant: Address,
  landId: bigint,
  leaseStartDate: bigint,
  leaseEndDate: bigint,
  monthlyRent: bigint,
  deposit: bigint
): LeaseAgreement {
  return {
    id: `${Date.now()}-${Math.random()}`,
    leaseId: BigInt(0),
    landowner,
    tenant,
    landId,
    leaseStartDate,
    leaseEndDate,
    monthlyRent,
    deposit,
    isActive: true,
    depositReturned: false,
  };
}

