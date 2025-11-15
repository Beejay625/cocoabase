import { type Address } from 'viem';

export interface GrowthStage {
  id: string;
  plantationId: bigint;
  cropType: string;
  stageName: string;
  stageNumber: bigint;
  expectedEndDate: bigint;
  tracker: Address;
}

export function createGrowthStage(
  address: Address,
  plantationId: bigint,
  cropType: string,
  stageName: string,
  stageNumber: bigint,
  expectedEndDate: bigint
): GrowthStage {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    cropType,
    stageName,
    stageNumber,
    expectedEndDate,
    tracker: address,
  };
}


