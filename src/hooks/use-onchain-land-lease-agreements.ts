import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createLandLease,
  type LandLeaseAgreement,
} from '@/lib/onchain-land-lease-agreements-utils';

export function useOnchainLandLeaseAgreements() {
  const { address } = useAccount();
  const [leases, setLeases] = useState<LandLeaseAgreement[]>([]);

  const createLease = async (
    lessee: Address,
    landParcelId: bigint,
    monthlyRent: bigint,
    startDate: bigint,
    endDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const lease = createLandLease(
      address,
      lessee,
      landParcelId,
      monthlyRent,
      startDate,
      endDate
    );
    setLeases([...leases, lease]);
  };

  return { leases, createLease, address };
}
