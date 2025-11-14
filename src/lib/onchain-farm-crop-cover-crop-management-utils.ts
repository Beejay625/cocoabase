import { type Address } from 'viem';

export interface CoverCropSystem {
  id: string;
  fieldId: bigint;
  coverCropType: string;
  terminationDate: bigint;
  manager: Address;
}

export function createCoverCropSystem(
  address: Address,
  fieldId: bigint,
  coverCropType: string,
  terminationDate: bigint
): CoverCropSystem {
  return {
    id: `${Date.now()}-${Math.random()}`,
    fieldId,
    coverCropType,
    terminationDate,
    manager: address,
  };
}

