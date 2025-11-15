import { type Address } from 'viem';

export interface HealthRecord {
  id: string;
  recordId: bigint;
  livestockId: bigint;
  healthStatus: string;
  checkDate: bigint;
  veterinarian: string;
  recorder: Address;
  vaccinated: boolean;
}

export function createHealthRecord(
  address: Address,
  livestockId: bigint,
  healthStatus: string,
  veterinarian: string
): HealthRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    recordId: BigInt(0),
    livestockId,
    healthStatus,
    checkDate: BigInt(Date.now()),
    veterinarian,
    recorder: address,
    vaccinated: false,
  };
}



