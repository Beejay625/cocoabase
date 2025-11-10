import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createLease,
  type EquipmentLease,
} from '@/lib/onchain-equipment-leasing-utils';

export function useOnchainEquipmentLeasing() {
  const { address } = useAccount();
  const [leases, setLeases] = useState<EquipmentLease[]>([]);

  const createNewLease = async (
    lessee: Address,
    equipmentId: bigint,
    monthlyRent: bigint,
    startDate: bigint,
    endDate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const lease = createLease(
      address,
      lessee,
      equipmentId,
      monthlyRent,
      startDate,
      endDate
    );
    setLeases([...leases, lease]);
  };

  return { leases, createNewLease, address };
}
