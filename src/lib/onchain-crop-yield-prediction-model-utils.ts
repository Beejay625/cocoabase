import { type Address } from 'viem';

export interface YieldPrediction {
  id: bigint;
  owner: Address;
  plantationId: bigint;
  predictedYield: bigint;
  confidence: number;
  predictionDate: bigint;
  modelVersion: string;
  txHash: string;
}

export function createYieldPrediction(
  owner: Address,
  plantationId: bigint,
  predictedYield: bigint,
  confidence: number,
  modelVersion: string
): YieldPrediction {
  return {
    id: BigInt(Date.now()),
    owner,
    plantationId,
    predictedYield,
    confidence,
    predictionDate: BigInt(Date.now()),
    modelVersion,
    txHash: '',
  };
}
