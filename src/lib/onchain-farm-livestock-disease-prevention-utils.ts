import { type Address } from 'viem';

export interface PreventionMeasure {
  id: string;
  livestockId: bigint;
  diseaseType: string;
  preventionMethod: string;
  nextDueDate: bigint;
  applicator: Address;
}

export function createPreventionMeasure(
  address: Address,
  livestockId: bigint,
  diseaseType: string,
  preventionMethod: string,
  nextDueDate: bigint
): PreventionMeasure {
  return {
    id: `${Date.now()}-${Math.random()}`,
    livestockId,
    diseaseType,
    preventionMethod,
    nextDueDate,
    applicator: address,
  };
}


