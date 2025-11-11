import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  recordImpact,
  type ImpactMeasurement,
} from '@/lib/onchain-agricultural-impact-measurement-utils';

export function useOnchainAgriculturalImpactMeasurement() {
  const { address } = useAccount();
  const [measurements, setMeasurements] = useState<ImpactMeasurement[]>([]);

  const record = async (
    plantationId: bigint,
    impactType: ImpactMeasurement['impactType'],
    metric: string,
    value: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const impact = recordImpact(address, plantationId, impactType, metric, value);
    setMeasurements([...measurements, impact]);
  };

  return { measurements, record, address };
}
