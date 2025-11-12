import { type Address } from 'viem';

export interface ResourceAllocation {
  id: bigint;
  owner: Address;
  resourceType: string;
  quantity: bigint;
  allocatedTo: string;
  allocationDate: bigint;
  txHash: string;
}

export function allocateResource(
  owner: Address,
  resourceType: string,
  quantity: bigint,
  allocatedTo: string
): ResourceAllocation {
  return {
    id: BigInt(Date.now()),
    owner,
    resourceType,
    quantity,
    allocatedTo,
    allocationDate: BigInt(Date.now()),
    txHash: '',
  };
}
