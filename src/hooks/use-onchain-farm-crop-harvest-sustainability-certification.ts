import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createSustainabilityCertification,
  type SustainabilityCertification,
} from '@/lib/onchain-farm-crop-harvest-sustainability-certification-utils';

/**
 * Hook for onchain farm crop harvest sustainability certification
 * Uses blockchain wallet for all web3 transactions
 */
export function useOnchainFarmCropHarvestSustainabilityCertification() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [certifications, setCertifications] = useState<SustainabilityCertification[]>([]);

  const certifySustainability = async (
    harvestId: string,
    certificationType: string,
    certifyingBody: string,
    certificationDate: bigint,
    standards: string[]
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    const certification = createSustainabilityCertification(address, harvestId, certificationType, certifyingBody, certificationDate, standards);
    setCertifications([...certifications, certification]);
  };

  const verifyCertification = async (
    contractAddress: Address,
    certificationId: string
  ): Promise<void> => {
    if (!address) throw new Error('Web3 wallet not connected');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'verifyCertification',
      args: [certificationId],
    });
  };

  return { certifications, certifySustainability, verifyCertification, address };
}

