import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  allocateCost,
  type CostAllocation,
} from '@/lib/onchain-farm-cost-allocation-system-utils';

export function useOnchainFarmCostAllocationSystem() {
  const { address } = useAccount();
  const [allocations, setAllocations] = useState<CostAllocation[]>([]);

  const allocate = async (
    costType: string,
    amount: bigint,
    allocatedTo: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const allocation = allocateCost(address, costType, amount, allocatedTo);
    setAllocations([...allocations, allocation]);
  };

  return { allocations, allocate, address };
}
