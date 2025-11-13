import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createCostAllocation,
  getAllocationsByCostCenter,
  calculateTotalByCategory,
  calculateTotalAllocation,
  type CostAllocation,
} from '@/lib/onchain-farm-cost-allocation-system-utils';

export function useOnchainFarmCostAllocationSystem() {
  const { address } = useAccount();
  const [allocations, setAllocations] = useState<CostAllocation[]>([]);

  const allocate = (
    costCenter: string,
    amount: bigint,
    category: string
  ) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const allocation = createCostAllocation(address, costCenter, amount, category);
    setAllocations((prev) => [...prev, allocation]);
    console.log('Allocating cost:', { costCenter, amount, category });
  };

  return {
    allocations,
    allocate,
    getAllocationsByCostCenter,
    calculateTotalByCategory,
    calculateTotalAllocation,
    address,
  };
}
