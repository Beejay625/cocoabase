import { type Address } from 'viem';

/**
 * Onchain farm labor training utilities
 * Training record creation and verification
 */

export interface TrainingRecord {
  id: string;
  employer: Address;
  worker: Address;
  trainingType: string;
  trainingDate: bigint;
  certification: string;
  verified: boolean;
  timestamp: bigint;
}

export function createTrainingRecord(
  employer: Address,
  worker: Address,
  trainingType: string,
  trainingDate: bigint,
  certification: string
): TrainingRecord {
  return {
    id: `${Date.now()}-${Math.random()}`,
    employer,
    worker,
    trainingType,
    trainingDate,
    certification,
    verified: false,
    timestamp: BigInt(Date.now()),
  };
}

