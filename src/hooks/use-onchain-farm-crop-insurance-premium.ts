import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import type { Address } from 'viem';
import {
  createPremiumCalculation,
  type PremiumCalculation,
} from '@/lib/onchain-farm-crop-insurance-premium-utils';

/**
 * Hook for onchain farm crop insurance premium calculation
 * Uses Reown wallet for all transactions
 */
export function useOnchainFarmCropInsurancePremium() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [calculations, setCalculations] = useState<PremiumCalculation[]>([]);

  const calculatePremium = async (
    plantationId: string,
    coverageAmount: bigint,
    riskFactor: number,
    cropType: string
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const calculation = createPremiumCalculation(address, plantationId, coverageAmount, riskFactor, cropType);
    setCalculations([...calculations, calculation]);
  };

  const updatePremium = async (
    contractAddress: Address,
    calculationId: string,
    newPremium: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected via Reown');
    await writeContract({
      address: contractAddress,
      abi: [],
      functionName: 'updatePremium',
      args: [calculationId, newPremium],
    });
  };

  return { calculations, calculatePremium, updatePremium, address };
}

