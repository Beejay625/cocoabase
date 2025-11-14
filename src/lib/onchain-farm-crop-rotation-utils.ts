import { type Address } from 'viem';

/**
 * Onchain farm crop rotation utilities
 * Crop rotation planning
 */

export interface RotationPlan {
  id: string;
  planId: bigint;
  farmer: Address;
  fieldId: bigint;
  currentCrop: string;
  nextCrop: string;
  rotationDate: bigint;
  cycleLength: bigint;
  isActive: boolean;
  creationDate: bigint;
}

export interface RotationHistory {
  id: string;
  historyId: bigint;
  planId: bigint;
  crop: string;
  plantingDate: bigint;
  harvestDate: bigint;
  yield: bigint;
  isCompleted: boolean;
}

export function createRotationPlan(
  address: Address,
  fieldId: bigint,
  currentCrop: string,
  nextCrop: string,
  rotationDate: bigint,
  cycleLength: bigint
): RotationPlan {
  return {
    id: `${Date.now()}-${Math.random()}`,
    planId: BigInt(0),
    farmer: address,
    fieldId,
    currentCrop,
    nextCrop,
    rotationDate,
    cycleLength,
    isActive: true,
    creationDate: BigInt(Date.now()),
  };
}

export function createRotationHistory(
  planId: bigint,
  crop: string,
  plantingDate: bigint,
  yield: bigint
): RotationHistory {
  return {
    id: `${Date.now()}-${Math.random()}`,
    historyId: BigInt(0),
    planId,
    crop,
    plantingDate,
    harvestDate: BigInt(0),
    yield,
    isCompleted: false,
  };
}

