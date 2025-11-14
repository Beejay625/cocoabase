import { type Address } from 'viem';

export interface VaccinationRecord {
  id: string;
  recordId: bigint;
  livestockId: bigint;
  vaccineType: string;
  vaccinationDate: bigint;
  nextDueDate: bigint;
  vaccinator: Address;
}

export function createVaccinationRecord(
  address: Address,
  livestockId: bigint,
  vaccineType: string,
  validityPeriod: bigint
): VaccinationRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    recordId: BigInt(0),
    livestockId,
    vaccineType,
    vaccinationDate: BigInt(Date.now()),
    nextDueDate: BigInt(Date.now()) + validityPeriod,
    vaccinator: address,
  };
}
