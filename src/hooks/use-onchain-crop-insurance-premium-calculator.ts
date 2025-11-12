import { useState } from 'react';
import { useAccount } from 'wagmi';
import type { Address } from 'viem';
import {
  calculatePremium,
  getPremiumsByPlantation,
  calculateTotalPremium,
  getRecentCalculations,
  type PremiumCalculation,
} from '@/lib/onchain-crop-insurance-premium-calculator-utils';

export function useOnchainCropInsurancePremiumCalculator() {
  const { address } = useAccount();
  const [calculations, setCalculations] = useState<PremiumCalculation[]>([]);

  const calculate = (
    plantation: Address,
    coverage: bigint,
    rate: number
  ) => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const calculation = calculatePremium(plantation, coverage, rate);
    setCalculations((prev) => [...prev, calculation]);
    console.log('Calculating premium:', { plantation, coverage, rate });
  };

  return {
    calculations,
    calculate,
    getPremiumsByPlantation,
    calculateTotalPremium,
    getRecentCalculations,
    address,
  };
}
