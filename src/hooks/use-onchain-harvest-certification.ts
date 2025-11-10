import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  certifyHarvest,
  type HarvestCertification,
} from '@/lib/onchain-harvest-certification-utils';

export function useOnchainHarvestCertification() {
  const { address } = useAccount();
  const [certifications, setCertifications] = useState<HarvestCertification[]>([]);

  const certifyNewHarvest = async (
    plantationId: bigint,
    quantity: bigint,
    qualityGrade: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const cert = certifyHarvest(address, plantationId, quantity, qualityGrade);
    setCertifications([...certifications, cert]);
  };

  return { certifications, certifyNewHarvest, address };
}
