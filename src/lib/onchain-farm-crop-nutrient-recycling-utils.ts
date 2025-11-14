import { type Address } from 'viem';

export interface RecyclingActivity {
  id: string;
  fieldId: bigint;
  recyclingMethod: string;
  nutrientRecovered: bigint;
  implementer: Address;
}

export function createRecyclingActivity(
  address: Address,
  fieldId: bigint,
  recyclingMethod: string,
  nutrientRecovered: bigint
): RecyclingActivity {
  return {
    id: `${Date.now()}-${Math.random()}`,
    fieldId,
    recyclingMethod,
    nutrientRecovered,
    implementer: address,
  };
}

