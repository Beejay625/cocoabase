import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createLease,
  type Lease,
} from '@/lib/onchain-farm-equipment-leasing-utils';

export function useOnchainFarmEquipmentLeasing() {
  const { address } = useAccount();
  const [leases, setLeases] = useState<Lease[]>([]);

  const create = async (
    lessee: Address,
    equipmentId: bigint,
    monthlyRate: bigint,
    duration: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const lease = createLease(address, lessee, equipmentId, monthlyRate, duration);
    setLeases([...leases, lease]);
  };

  return { leases, create, address };
}
