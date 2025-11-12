import { type Address } from 'viem';

export interface CostAllocation {
  id: bigint;
  owner: Address;
  costType: string;
  amount: bigint;
  allocatedTo: string;
  allocationDate: bigint;
  txHash: string;
}

export function allocateCost(
  owner: Address,
  costType: string,
  amount: bigint,
  allocatedTo: string
): CostAllocation {
  return {
    id: BigInt(Date.now()),
    owner,
    costType,
    amount,
    allocatedTo,
    allocationDate: BigInt(Date.now()),
    txHash: '',
  };
}

export function getTotalCostByType(
  allocations: CostAllocation[],
  costType: string
): bigint {
  return allocations
    .filter((a) => a.costType === costType)
    .reduce((total, a) => total + a.amount, BigInt(0));
}

export function getCostsByAllocation(
  allocations: CostAllocation[],
  allocatedTo: string
): CostAllocation[] {
  return allocations.filter((a) => a.allocatedTo === allocatedTo);
}

export function getTotalAllocatedCosts(
  allocations: CostAllocation[]
): bigint {
  return allocations.reduce((total, a) => total + a.amount, BigInt(0));
}
