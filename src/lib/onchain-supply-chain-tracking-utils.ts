import { type Address } from 'viem';

export interface SupplyChainItem {
  id: bigint;
  owner: Address;
  plantationId: bigint;
  stage: 'harvest' | 'processing' | 'storage' | 'transport' | 'market';
  location: string;
  timestamp: bigint;
  txHash: string;
}

export function createSupplyChainItem(
  owner: Address,
  plantationId: bigint,
  stage: SupplyChainItem['stage'],
  location: string
): SupplyChainItem {
  return {
    id: BigInt(Date.now()),
    owner,
    plantationId,
    stage,
    location,
    timestamp: BigInt(Date.now()),
    txHash: '',
  };
}

export function advanceStage(
  item: SupplyChainItem,
  newStage: SupplyChainItem['stage'],
  newLocation: string
): SupplyChainItem {
  return {
    ...item,
    stage: newStage,
    location: newLocation,
    timestamp: BigInt(Date.now()),
  };
}
