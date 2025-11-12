import { useState } from 'react';
import { useAccount } from 'wagmi';
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
    plantationId: bigint,
    coverage: bigint,
    rate: number
  ): PremiumCalculation => {
    if (!address) throw new Error('Wallet not connected via Reown');
    const calculation = calculatePremium(plantationId, coverage, rate);
    setCalculations((prev) => [...prev, calculation]);
    console.log('Calculating premium:', calculation);
    return calculation;
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
