import { type Address } from 'viem';

/**
 * Onchain Crop Rotation Planner utilities
 * Plan and track crop rotations onchain with Reown wallet integration
 */

export interface CropRotationPlan {
  id: bigint;
  farmer: Address;
  fieldId: string;
  currentCrop: string;
  previousCrops: string[];
  nextCrop: string;
  rotationDate: bigint;
  status: 'planned' | 'active' | 'completed';
  createdAt: bigint;
}

export function createCropRotationPlan(
  farmer: Address,
  fieldId: string,
  currentCrop: string,
  previousCrops: string[],
  nextCrop: string,
  rotationDate: bigint
): CropRotationPlan {
  const now = BigInt(Date.now());
  return {
    id: BigInt(0),
    farmer,
    fieldId,
    currentCrop,
    previousCrops,
    nextCrop,
    rotationDate,
    status: 'planned',
    createdAt: now,
  };
}

export function activateRotationPlan(plan: CropRotationPlan): CropRotationPlan {
  return {
    ...plan,
    status: 'active',
  };
}

export function completeRotationPlan(plan: CropRotationPlan): CropRotationPlan {
  return {
    ...plan,
    status: 'completed',
    previousCrops: [...plan.previousCrops, plan.currentCrop],
    currentCrop: plan.nextCrop,
  };
}

export function calculateRotationBenefits(
  previousCrop: string,
  nextCrop: string
): number {
  // Simple benefit calculation based on crop compatibility
  const compatiblePairs: Record<string, string[]> = {
    'corn': ['soybeans', 'wheat'],
    'soybeans': ['corn', 'wheat'],
    'wheat': ['corn', 'soybeans'],
  };
  
  return compatiblePairs[previousCrop]?.includes(nextCrop) ? 85 : 50;
}



