import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  recordTraining,
  type TrainingRecord,
} from '@/lib/onchain-training-records-system-utils';

export function useOnchainTrainingRecordsSystem() {
  const { address } = useAccount();
  const [records, setRecords] = useState<TrainingRecord[]>([]);

  const record = async (
    trainingType: string,
    certificate: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const training = recordTraining(address, trainingType, certificate);
    setRecords([...records, training]);
  };

  return { records, record, address };
}
