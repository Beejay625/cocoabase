import { type Address } from 'viem';

export interface WasteRecord {
  id: bigint;
  owner: Address;
  plantationId: bigint;
  wasteType: 'organic' | 'plastic' | 'chemical' | 'other';
  quantity: bigint;
  disposalMethod: string;
  disposalDate: bigint;
  txHash: string;
}

export function recordWaste(
  owner: Address,
  plantationId: bigint,
  wasteType: WasteRecord['wasteType'],
  quantity: bigint,
  disposalMethod: string
): WasteRecord {
  return {
    id: BigInt(Date.now()),
    owner,
    plantationId,
    wasteType,
    quantity,
    disposalMethod,
    disposalDate: BigInt(Date.now()),
    txHash: '',
  };
}

export function getWasteByType(
  records: WasteRecord[],
  wasteType: WasteRecord['wasteType']
): WasteRecord[] {
  return records.filter((r) => r.wasteType === wasteType);
}

export function getTotalWaste(
  records: WasteRecord[],
  plantationId: bigint
): bigint {
  return records
    .filter((r) => r.plantationId === plantationId)
    .reduce((total, r) => total + r.quantity, BigInt(0));
}

export function getRecentWaste(
  records: WasteRecord[],
  days: number
): WasteRecord[] {
  const cutoff = BigInt(Date.now() - days * 24 * 60 * 60 * 1000);
  return records.filter((r) => r.disposalDate >= cutoff);
}
