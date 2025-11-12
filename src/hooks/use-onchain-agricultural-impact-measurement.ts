import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  createImpactMeasurement,
  getImpactsByType,
  calculateTotalImpact,
  getRecentMeasurements,
  type ImpactMeasurement,
} from '@/lib/onchain-agricultural-impact-measurement-utils';

export function useOnchainAgriculturalImpactMeasurement() {
  const { address } = useAccount();
  const [measurements, setMeasurements] = useState<ImpactMeasurement[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const record = async (
    impactType: 'environmental' | 'social' | 'economic',
    metric: string,
    value: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsRecording(true);
    try {
      const measurement = createImpactMeasurement(address, impactType, metric, value);
      setMeasurements((prev) => [...prev, measurement]);
      console.log('Recording impact:', measurement);
    } finally {
      setIsRecording(false);
    }
  };

  return {
    measurements,
    record,
    getImpactsByType,
    calculateTotalImpact,
    getRecentMeasurements,
    isRecording,
    address,
  };
}
