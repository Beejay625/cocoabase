import { type Address } from 'viem';

/**
 * Onchain farm crop variety utilities
 * Crop variety management
 */

export interface CropVariety {
  id: string;
  varietyId: bigint;
  farmer: Address;
  varietyName: string;
  cropType: string;
  characteristics: string;
  yield: bigint;
  resistance: bigint;
  quality: bigint;
  isActive: boolean;
  registrationDate: bigint;
}

export function createCropVariety(
  address: Address,
  varietyName: string,
  cropType: string,
  characteristics: string,
  yield: bigint,
  resistance: bigint,
  quality: bigint
): CropVariety {
  return {
    id: `${Date.now()}-${Math.random()}`,
    varietyId: BigInt(0),
    farmer: address,
    varietyName,
    cropType,
    characteristics,
    yield,
    resistance,
    quality,
    isActive: true,
    registrationDate: BigInt(Date.now()),
  };
}

