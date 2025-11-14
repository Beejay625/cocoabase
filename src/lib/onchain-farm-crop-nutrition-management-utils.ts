import { type Address } from 'viem';

export interface NutritionPlan {
  id: string;
  plantationId: bigint;
  cropType: string;
  nitrogenLevel: bigint;
  phosphorusLevel: bigint;
  potassiumLevel: bigint;
  micronutrients: bigint[];
  owner: Address;
}

export function createNutritionPlan(
  address: Address,
  plantationId: bigint,
  cropType: string,
  nitrogenLevel: bigint,
  phosphorusLevel: bigint,
  potassiumLevel: bigint,
  micronutrients: bigint[]
): NutritionPlan {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    cropType,
    nitrogenLevel,
    phosphorusLevel,
    potassiumLevel,
    micronutrients,
    owner: address,
  };
}

