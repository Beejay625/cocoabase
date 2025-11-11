import { useState } from 'react';
import { useAccount } from 'wagmi';
import {
  calculatePremium,
  type InsurancePremium,
} from '@/lib/onchain-crop-insurance-premium-calculator-utils';

export function useOnchainCropInsurancePremiumCalculator() {
  const { address } = useAccount();
  const [premiums, setPremiums] = useState<InsurancePremium[]>([]);

  const calculate = async (
    plantationId: bigint,
    coverageAmount: bigint,
    premiumRate: bigint
  ): Promise<void> => {
    if (!address) throw new Error('Wallet not connected');
    const premium = calculatePremium(address, plantationId, coverageAmount, premiumRate);
    setPremiums([...premiums, premium]);
  };

  return { premiums, calculate, address };
}
