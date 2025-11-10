import { type Address } from 'viem';

export interface LandLeaseAgreement {
  id: bigint;
  lessor: Address;
  lessee: Address;
  landParcelId: bigint;
  monthlyRent: bigint;
  startDate: bigint;
  endDate: bigint;
  status: 'active' | 'expired' | 'cancelled';
  txHash: string;
}

export function createLandLease(
  lessor: Address,
  lessee: Address,
  landParcelId: bigint,
  monthlyRent: bigint,
  startDate: bigint,
  endDate: bigint
): LandLeaseAgreement {
  return {
    id: BigInt(Date.now()),
    lessor,
    lessee,
    landParcelId,
    monthlyRent,
    startDate,
    endDate,
    status: 'active',
    txHash: '',
  };
}

export function cancelLease(
  lease: LandLeaseAgreement,
  canceller: Address
): LandLeaseAgreement | null {
  if (lease.lessor.toLowerCase() !== canceller.toLowerCase()) return null;
  return {
    ...lease,
    status: 'cancelled',
  };
}

export function getLeaseDuration(lease: LandLeaseAgreement): bigint {
  return lease.endDate - lease.startDate;
}
