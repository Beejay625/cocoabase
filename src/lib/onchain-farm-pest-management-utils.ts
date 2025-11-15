import { type Address } from 'viem';

export interface PestRecord {
  id: string;
  recordId: bigint;
  plantationId: bigint;
  pestType: string;
  severity: bigint;
  detectionDate: bigint;
  treatmentMethod: string;
  manager: Address;
  treated: boolean;
}

export function createPestRecord(
  address: Address,
  plantationId: bigint,
  pestType: string,
  severity: bigint,
  treatmentMethod: string
): PestRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    recordId: BigInt(0),
    plantationId,
    pestType,
    severity,
    detectionDate: BigInt(Date.now()),
    treatmentMethod,
    manager: address,
    treated: false,
  };
}



