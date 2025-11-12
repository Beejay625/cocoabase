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

  const record = (
    impactType: 'environmental' | 'social' | 'economic',
    metric: string,
    value: bigint
  ) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const measurement = createImpactMeasurement(address, impactType, metric, value);
    setMeasurements((prev) => [...prev, measurement]);
    console.log('Recording impact:', { impactType, metric, value });
  };

  return {
    measurements,
    record,
    getImpactsByType,
    calculateTotalImpact,
    getRecentMeasurements,
    address,
  };
}
