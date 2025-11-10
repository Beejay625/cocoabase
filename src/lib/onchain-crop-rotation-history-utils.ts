import { type Address } from 'viem';

export interface CropRotationHistory {
  id: bigint;
  owner: Address;
  plantationId: bigint;
  previousCrop: string;
  currentCrop: string;
  rotationDate: bigint;
  rotationReason: string;
  txHash: string;
}

export function recordRotationHistory(
  owner: Address,
  plantationId: bigint,
  previousCrop: string,
  currentCrop: string,
  rotationReason: string
): CropRotationHistory {
  return {
    id: BigInt(Date.now()),
    owner,
    plantationId,
    previousCrop,
    currentCrop,
    rotationDate: BigInt(Date.now()),
    rotationReason,
    txHash: '',
  };
}
