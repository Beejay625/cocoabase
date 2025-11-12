import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  performQualityCheck,
  type QualityCheck,
} from '@/lib/onchain-agricultural-quality-control-system-utils';

export function useOnchainAgriculturalQualityControlSystem() {
  const { address } = useAccount();
  const [checks, setChecks] = useState<QualityCheck[]>([]);

  const perform = async (
    productId: bigint,
    qualityScore: number
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const check = performQualityCheck(address, productId, qualityScore);
    setChecks([...checks, check]);
  };

  return { checks, perform, address };
}
