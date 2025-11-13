import { type Address } from 'viem';

/**
 * Onchain farm crop rotation history utilities
 * Crop rotation history recording and verification
 */

export interface CropRotationHistory {
  id: string;
  fieldId: string;
  recordedBy: Address;
  previousCrop: string;
  currentCrop: string;
  rotationDate: bigint;
  verified: boolean;
  timestamp: bigint;
}

export function createRotationHistory(
  address: Address,
  fieldId: string,
  previousCrop: string,
  currentCrop: string,
  rotationDate: bigint
): CropRotationHistory {
  return {
    id: `${Date.now()}-${Math.random()}`,
    fieldId,
    recordedBy: address,
    previousCrop,
    currentCrop,
    rotationDate,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

