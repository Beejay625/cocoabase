import { type Address } from 'viem';

export interface TrainingRecord {
  id: bigint;
  owner: Address;
  trainingType: string;
  completedDate: bigint;
  certificate: string;
  status: 'completed' | 'in-progress' | 'pending';
  txHash: string;
}

export function recordTraining(
  owner: Address,
  trainingType: string,
  certificate: string
): TrainingRecord {
  return {
    id: BigInt(Date.now()),
    owner,
    trainingType,
    completedDate: BigInt(Date.now()),
    certificate,
    status: 'completed',
    txHash: '',
  };
}

export function getCompletedTrainings(
  records: TrainingRecord[]
): TrainingRecord[] {
  return records.filter((r) => r.status === 'completed');
}

export function getTrainingsByType(
  records: TrainingRecord[],
  trainingType: string
): TrainingRecord[] {
  return records.filter((r) => r.trainingType === trainingType);
}
