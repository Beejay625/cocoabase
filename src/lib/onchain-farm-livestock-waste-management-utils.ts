import { type Address } from 'viem';

export interface WasteProcessing {
  id: string;
  livestockId: bigint;
  processingMethod: string;
  wasteAmount: bigint;
  processor: Address;
}

export function createWasteProcessing(
  address: Address,
  livestockId: bigint,
  processingMethod: string,
  wasteAmount: bigint
): WasteProcessing {
  return {
    id: `${Date.now()}-${Math.random()}`,
    livestockId,
    processingMethod,
    wasteAmount,
    processor: address,
  };
}
