import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createDiseaseWarning,
  escalateWarning,
  isCriticalWarning,
  type DiseaseWarning,
} from '@/lib/onchain-crop-disease-early-warning-utils';

/**
 * Hook for onchain crop disease early warning operations
 * Requires Reown wallet connection via useAccount
 */
export function useOnchainCropDiseaseEarlyWarning() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [warnings, setWarnings] = useState<DiseaseWarning[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const createWarning = async (
    fieldId: string,
    cropType: string,
    diseaseType: string,
    riskLevel: DiseaseWarning['riskLevel'],
    symptoms: string[],
    recommendedAction: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    setIsCreating(true);
    try {
      const warning = createDiseaseWarning(
        address,
        fieldId,
        cropType,
        diseaseType,
        riskLevel,
        symptoms,
        recommendedAction
      );
      setWarnings((prev) => [...prev, warning]);
      await writeContract({
        address: '0x0000000000000000000000000000000000000000' as Address,
        abi: [],
        functionName: 'createDiseaseWarning',
        args: [fieldId, cropType, diseaseType, riskLevel, symptoms, recommendedAction],
      });
    } finally {
      setIsCreating(false);
    }
  };

  return {
    warnings,
    createWarning,
    escalateWarning,
    isCriticalWarning,
    isCreating,
    address,
  };
}



