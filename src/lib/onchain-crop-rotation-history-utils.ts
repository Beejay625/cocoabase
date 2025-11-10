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

export function getRotationHistoryByPlantation(
  history: CropRotationHistory[],
  plantationId: bigint
): CropRotationHistory[] {
  return history
    .filter((h) => h.plantationId === plantationId)
    .sort((a, b) => (a.rotationDate > b.rotationDate ? -1 : 1));
}

export function getRecentRotations(
  history: CropRotationHistory[],
  days: number
): CropRotationHistory[] {
  const cutoff = BigInt(Date.now() - days * 24 * 60 * 60 * 1000);
  return history.filter((h) => h.rotationDate >= cutoff);
}

export function getRotationsByCrop(
  history: CropRotationHistory[],
  crop: string
): CropRotationHistory[] {
  return history.filter((h) => h.currentCrop === crop || h.previousCrop === crop);
}
