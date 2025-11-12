import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  allocateResource,
  type ResourceAllocation,
} from '@/lib/onchain-farm-resource-allocation-system-utils';

export function useOnchainFarmResourceAllocationSystem() {
  const { address } = useAccount();
  const [allocations, setAllocations] = useState<ResourceAllocation[]>([]);

  const allocate = async (
    resourceType: string,
    quantity: bigint,
    allocatedTo: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const allocation = allocateResource(address, resourceType, quantity, allocatedTo);
    setAllocations([...allocations, allocation]);
  };

  return { allocations, allocate, address };
}
