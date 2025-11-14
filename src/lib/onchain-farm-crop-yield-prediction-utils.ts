import { type Address } from 'viem';

export interface YieldPrediction {
  id: string;
  plantationId: bigint;
  predictedYield: bigint;
  confidence: bigint;
  predictionDate: bigint;
  cropType: string;
  predictor: Address;
  verified: boolean;
  actualYield?: bigint;
}

export function createYieldPrediction(
  address: Address,
  plantationId: bigint,
  predictedYield: bigint,
  confidence: bigint,
  cropType: string
): YieldPrediction {
  return {
    id: `${Date.now()}-${Math.random()}`,
    plantationId,
    predictedYield,
    confidence,
    predictionDate: BigInt(Date.now()),
    cropType,
    predictor: address,
    verified: false,
  };
}

